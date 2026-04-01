import { createContext, useEffect, useState } from "react";
import { fecthTask, fecthUser, showLeaderboard } from "./apiHandler.js";

const capContext = createContext();
const users = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    user_id: "CG5861",
    points: "4861",
  },
  {
    name: "Lucky Bhuskute",
    email: "bhuskutelucky@gmail.com",
    user_id: "CG1052",
    points: "4824",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    user_id: "CG5862",
    points: "4923",
  },
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    user_id: "CG5863",
    points: "4785",
  },
  {
    name: "Michael Brown",
    email: "michael.brown@example.com",
    user_id: "CG5864",
    points: "4592",
  },
  {
    name: "Emily Davis",
    email: "emily.davis@example.com",
    user_id: "CG5865",
    points: "4630",
  },
  {
    name: "Daniel Wilson",
    email: "daniel.wilson@example.com",
    user_id: "CG5866",
    points: "4750",
  },
  {
    name: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    user_id: "CG5867",
    points: "4814",
  },
  {
    name: "James Anderson",
    email: "james.anderson@example.com",
    user_id: "CG5868",
    points: "4675",
  },
  {
    name: "Olivia Taylor",
    email: "olivia.taylor@example.com",
    user_id: "CG5869",
    points: "4912",
  },
  {
    name: "William Thomas",
    email: "william.thomas@example.com",
    user_id: "CG5870",
    points: "4809",
  },
  {
    name: "Mia Hernandez",
    email: "mia.hernandez@example.com",
    user_id: "CG5871",
    points: "4763",
  },
  {
    name: "David Lee",
    email: "david.lee@example.com",
    user_id: "CG5872",
    points: "4835",
  },
  {
    name: "Amelia Clark",
    email: "amelia.clark@example.com",
    user_id: "CG5873",
    points: "4887",
  },
  {
    name: "Lucas Lewis",
    email: "lucas.lewis@example.com",
    user_id: "CG5874",
    points: "4642",
  },
  {
    name: "Charlotte Walker",
    email: "charlotte.walker@example.com",
    user_id: "CG5875",
    points: "4779",
  },
  {
    name: "Elijah Hall",
    email: "elijah.hall@example.com",
    user_id: "CG5876",
    points: "4821",
  },
  {
    name: "Harper Young",
    email: "harper.young@example.com",
    user_id: "CG5877",
    points: "4783",
  },
  {
    name: "Matthew King",
    email: "matthew.king@example.com",
    user_id: "CG5878",
    points: "4900",
  },
  {
    name: "Ava Wright",
    email: "ava.wright@example.com",
    user_id: "CG5879",
    points: "4715",
  },
  {
    name: "Benjamin Scott",
    email: "benjamin.scott@example.com",
    user_id: "CG5880",
    points: "4698",
  },
];

const tasks = [
  {
    points: "10",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt laboriosam veniam quae, quaerat tenetur sapiente perspiciatis, adipisci placeat quia, deleniti id? Architecto quisquam voluptatem iste facere delectus facilis fugiat dolor.",
    deadline: "2024-09-01",
    link: "https://example.com/proposal",
    type: "sharing",
  },
  {
    points: "15",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt laboriosam veniam quae, quaerat tenetur sapiente perspiciatis, adipisci placeat quia, deleniti id? Architecto quisquam voluptatem iste facere delectus facilis fugiat dolor.",
    deadline: "2024-09-05",
    link: "https://example.com/code-review",
  },
  {
    points: "8",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt laboriosam veniam quae, quaerat tenetur sapiente perspiciatis, adipisci placeat quia, deleniti id? Architecto quisquam voluptatem iste facere delectus facilis fugiat dolor.",
    deadline: "2024-09-07",
    link: "https://example.com/api-docs",
  },
  {
    points: "12",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt laboriosam veniam quae, quaerat tenetur sapiente perspiciatis, adipisci placeat quia, deleniti id? Architecto quisquam voluptatem iste facere delectus facilis fugiat dolor.",
    deadline: "2024-09-10",
    link: "https://example.com/slides",
  },
  {
    points: "7",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt laboriosam veniam quae, quaerat tenetur sapiente perspiciatis, adipisci placeat quia, deleniti id? Architecto quisquam voluptatem iste facere delectus facilis fugiat dolor.",
    deadline: "2024-09-12",
    link: "https://example.com/user-manual",
  },
  {
    points: "20",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt laboriosam veniam quae, quaerat tenetur sapiente perspiciatis, adipisci placeat quia, deleniti id? Architecto quisquam voluptatem iste facere delectus facilis fugiat dolor.",
    deadline: "2024-09-15",
    link: "https://example.com/bug-fix",
  },
  {
    points: "5",
    description: "Schedule a team meeting.",
    deadline: "2024-09-18",
    link: "https://example.com/meeting-schedule",
  },
  {
    points: "18",
    description: "Optimize the database queries.",
    deadline: "2024-09-20",
    link: "https://example.com/db-optimize",
  },
  {
    points: "10",
    description: "Design the new feature mockups.",
    deadline: "2024-09-22",
    link: "https://example.com/feature-mockups",
  },
  {
    points: "14",
    description: "Conduct user testing for the new update.",
    deadline: "2024-09-25",
    link: "https://example.com/user-testing",
  },
  {
    points: "9",
    description: "Prepare the monthly report.",
    deadline: "2024-09-28",
    link: "https://example.com/monthly-report",
  },
  {
    points: "6",
    description: "Update the website content.",
    deadline: "2024-09-30",
    link: "https://example.com/website-update",
  },
  {
    points: "16",
    description: "Integrate third-party API.",
    deadline: "2024-10-02",
    link: "https://example.com/api-integration",
  },
  {
    points: "11",
    description: "Analyze the latest market trends.",
    deadline: "2024-10-05",
    link: "https://example.com/market-trends",
  },
  {
    points: "4",
    description: "Order supplies for the office.",
    deadline: "2024-10-08",
    link: "https://example.com/order-supplies",
  },
  {
    points: "13",
    description: "Update security protocols.",
    deadline: "2024-10-10",
    link: "https://example.com/security-update",
  },
  {
    points: "19",
    description: "Oversee the deployment process.",
    deadline: "2024-10-12",
    link: "https://example.com/deployment",
  },
  {
    points: "17",
    description: "Train the new employees.",
    deadline: "2024-10-15",
    link: "https://example.com/employee-training",
  },
  {
    points: "8",
    description: "Prepare for the client meeting.",
    deadline: "2024-10-18",
    link: "https://example.com/client-meeting",
  },
  {
    points: "10",
    description: "Audit the financial statements.",
    deadline: "2024-10-20",
    link: "https://example.com/financial-audit",
  },
];

const userPersonal = {
  name: "Lucky Bhuskute",
  email: "bhuskuteLucky@gmail.com",
  phone: "7489202439",
  user_id: "CG1052",
  insta_id: "lucky_b.19",
  linkedin_id: "lucky_bhuskute",
  college: "IIT Delhi",
  city: "Delhi",
  points: "4824",
};

const user = {
  name: "Lucky Bhuskute",
  email: "bhuskutelucky@gmail.com",
  user_id: "CG1002",
  points: "4824",
};

const FAQList = [
  {
    title: "Who can become a Campus Ambassador?",
    description: (
      <>
        Any student with an active social media presence is eligible to join. Whether you are a school student, a college undergraduate, or a postgraduate, if you possess the enthusiasm to promote and engage, you are welcome to become a Campus Ambassador.
        <br />
        <br />
        Note: Only for those who have not registered yet.
        <br />
        Follow the link to become CA:{" "}
        <a style={{color:"blue"}} href="https://docs.google.com/forms/d/e/1FAIpQLSefKVEqvoxqTS-oeg1syLYtLxLlfw1q7jkfm2-DaelJErXiCw/viewform" target="_blank" rel="noopener noreferrer">
          Campus Ambassador Registration
        </a>
      </>
    )
  },
  
  {
    title:
      "What will be my responsibilities as a Campus Ambassador for Rendezvous ‘24?",
    description:
      "As a Campus Ambassador, your primary role will be to share and promote RDV '24 competition and event stories on your social media platforms. Your efforts will help raise awareness and generate excitement among students from various institutions.",
  },
  {
    title: "How will I contribute to Rendezvous ‘24 as a Campus Ambassador?",
    description:
      "You will play a vital role in representing Rendezvous '24 at your institution. By promoting events and encouraging participation, you will contribute to the overall success of the festival.",
  },
  {
    title: "What incentives do I receive as a Campus Ambassador?",
    description:
      "Campus Ambassadors will be rewarded with exclusive merchandise, VIP access to premium events, letters of recommendation, and certificates of participation, among other incentives.",
  },
  {
    title: "How long will this internship last?",
    description:
      "The internship is designed to last one month, offering a concise yet impactful experience.",
  },
  {
    title: "Is this internship remote or offline?",
    description:
      "This internship is entirely remote, allowing you to participate from any location by utilizing your social media presence.",
  },
  {
    title: "How will I be able to demonstrate my work?",
    description:
      "You will be able to submit proof of your participation by uploading your contributions on the designated platform, ensuring a straightforward and transparent process.",
  },
  {
    title:
      "Where can I download the Letter of Completion and the Letter of Recommendation?",
    description:
      "Both documents will be available at the conclusion of your internship and can be easily accessed from your profile on the designated platform.",
  },
  {
    title: "When will the QR code for entry into the institute be available?",
    description:
      "The QR code for entry will be activated at 12:01 AM on October 5th and will remain valid until the end of October 8th.",
  },
  {
    title: "How can I become a Campus Ambassador?",
    description:
      "If you are not already a Campus Ambassador, you can apply by clicking the link below the login button on our platform. This will direct you to a Google form, which you need to complete to join our team.",
  },
  {
    title: "On what basis will Campus Ambassadors be selected?",
    description:
      "Selection will be based on your responses in the application form, which will help us evaluate your commitment, enthusiasm, and suitability for the role.",
  },
];

const contacts = [
  {
    name: "Rishika",
    PoR: "CTM",
    instaID: "rish_chika",
    mailID: "rishikam.iitd@gmail.com",
  },
  {
    name: "Vidya",
    PoR: "CTM",
    instaID: "vd_vidyadarshini",
    mailID: "rvidyadarshini@gmail.com",
  },
  {
    name: "Aman",
    PoR: "Coordinator",
    instaID: "__aman_kumar_kk",
    mailID: "aman7518404113@gmail.com",
  },
  {
    name: "Gaurav",
    PoR: "Coordinator",
    instaID: "_.gaurav_gupta",
    mailID: "guptagaurav7375@gmail.com",
  },
  {
    name: "Ria",
    PoR: "Coordinator",
    instaID: "rbarodia3",
    mailID: "rbarodia.rdv@gmail.com",
  },
  {
    name: "Priyansh",
    PoR: "Coordinator",
    instaID: "_priyansh.sr",
    mailID: "priyanshsingh540@gmail.com",
  },
  {
    name: "Harimohan",
    PoR: "Coordinator",
    instaID: "_harimohan_nath",
    mailID: "harimohannath9@gmail.com",
  },
];

const CapContextStore = ({ children }) => {
  const [message, setMessage] = useState("");
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [userPersonal, setUserPersonal] = useState([]);
  useEffect(() => {
    fecthTask().then((data) => {
      setTasks(data);
    });
    fecthUser().then((data) => {
      setUser(data);
      setUserPersonal(data);
    });
  }, []);
  return (
    <capContext.Provider
      value={{
        tasks,
        users,
        userPersonal,
        user,
        FAQList,
        contacts,
        message,
        setMessage,
      }}
    >
      {children}
    </capContext.Provider>
  );
};

export { capContext, CapContextStore };
