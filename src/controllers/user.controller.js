import db from '../lib/db.js';
import { ApiResponse } from '../lib/ApiResponse.js';
import htmlToPdf from './offerletter.controller.js';

const UserController = {};

// Get user profile
UserController.getUserProfile = async (req, res) => {
  try {
    const user = await db.user.findUnique({ where: { id: req.user_id} });
    // req.user_id
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

UserController.checkUser = async (req, res) => {
  var user = await db.user.findUnique({ where: { id: req.user_id } });
  if (user) {
    res.status(200).json(new ApiResponse({ success: true }));
  } else {
    const token = req.cookies?.access_token || req.headers.authorization?.split(" ")[1];
    const response = await fetch("https://auth.rdv-iitd.org/api/user/profile/", {
      method: "GET",
      headers: {
        Cookie: `access_token=${token}; domain=.rdv-iitd.org; path=/`,
      },
    });
    if (response.status !== 200) {
      res.status(401).json(new ApiResponse({ success: false }));
      return;
    }
    user = await db.user.findUnique({ where: { email: (await response.json())['email'] } });
    if (user) {
      await db.user.update({ where: { id: user.id }, data: { id: req.user_id } });
      res.status(200).json(new ApiResponse({ success: true }));
    } else {
      res.status(401).json(new ApiResponse({ success: false }));
    }
  }
};

UserController.getAllUsers = async (req, res) => {
  try {
    // Fetch users with user_credit > 0 from related UserTask, sorted by updatedAt
    const users = await db.user.findMany({
      where: {
        userTasks: {
          some: {
            user_credit: { gt: 0 }, // Only include users with credit greater than 0
          },
        },
      },
      orderBy: {
        updatedAt: 'desc', // Sort by the most recent update
      },
      take: 20, // Limit the results to 20 users
      include: {
        userTasks: {
          select: {
            user_credit: true,
          },
        },
      },
    });

    // Transform the data to include only the desired fields
    const transformedUsers = users.map(user => ({
      name: user.name,
      ca_id: user.ca_id,
      user_credit: user.userTasks[0]?.user_credit || 0,
    }));
    transformedUsers.sort((a, b) => b.user_credit - a.user_credit);
    res.status(200).json(new ApiResponse(200, transformedUsers, "Users fetched successfully"));
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json(new ApiResponse(500, null, "Server error"));
  }
};

UserController.checkUserTask = async (req, res) => {
  const {task_id} = req.body;
  try {
    const userTask = await db.userTask.findUnique({
      where: {
        user_id: req.user_id,
      },
    });
    // console.log("userTask", userTask);
    // console.log("task_id", task_id);
    if (userTask && userTask.tasks && userTask.tasks[task_id]) {
      res.status(201).json(new ApiResponse(201, userTask, "User has submitted"));
    } else {
      res.status(404).json(new ApiResponse(404, null, "NO SUBMISSION"));
    }
  } catch (error) {
    // console.error("Error fetching user task:", error);
    res.status(500).json(new ApiResponse(500, null, "Server error"));
  }
}

UserController.getOfferLetter = async (req, res) => {
  try {
    const user = await db.user.findUnique({ where: { id: req.user_id } });
    if (user) {
      const buffer = await htmlToPdf(`<!doctypehtml><html lang=en><meta charset=UTF-8><meta content="width=device-width,initial-scale=1"name=viewport><style>*{margin:0;padding:0}header img{width:100%}main{padding:45px 50px;font-family:Arial,sans-serif}main p{margin-bottom:20px;line-height:1.5;text-align:justify}table{width:100%}tr{display:flex;justify-content:space-between}td{padding:0 20px}td img{height:130px}footer img{width:100%;margin-top:10px}</style><title>Offer Letter</title><header><img alt=cover src=https://rdv-public.s3.ap-south-1.amazonaws.com/cap/cover.png></header><main><p>07 September, 2024<p>Dear ${user.name}<p>We are absolutely thrilled to extend to you an offer to become a Campus Ambassador for Rendezvous '24, IIT Delhi - taking place in October 2024! As a member of our team, you will be at the forefront of promoting our festival on your campus and igniting excitement among your peers. The duration of the Internship is from 05 September 2024 to 15 October 2024. This is an incredible opportunity for you to showcase your leadership and management skills, while also gaining valuable experience in event planning and networking.<p>While the internship will be work from home, you will still be a pivotal part of Team Rendezvous '24. Also, the fun and excitement won't be any less! Throughout the duration of the internship, you will have access to a plethora of incentives, including but not limited to exclusive goodies, merchandise, online courses, and VIP concert passes- all based on performance. We are confident that you will bring exceptional value to our team and will not only grow as an individual but also help Rendezvous '24 reach new heights.<p>We are committed to providing a supportive and stimulating environment for our ambassadors. We can't wait to have you join our team and are excited to embark on this journey with you. Get ready for an unforgettable experience!<p>Regards,<br>Team Rendezvous '24<br>IIT Delhi<table><tr><td><img alt=yashas_sign src=https://rdv-public.s3.ap-south-1.amazonaws.com/cap/yashas_signature_43wijc8w43dqi.png><td><img alt=rishika_sign src=https://rdv-public.s3.ap-south-1.amazonaws.com/cap/rishika_signature_gnewq4iuefnai43.png></table></main><footer><img alt=footer src=https://rdv-public.s3.ap-south-1.amazonaws.com/cap/footer.png></footer>`)
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=Offer Letter.pdf');
      res.send(buffer);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}


export default UserController;
