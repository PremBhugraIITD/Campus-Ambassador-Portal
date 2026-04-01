import { ApiResponse } from "../lib/ApiResponse.js";
import db from "../lib/db.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import xlsx from "xlsx"; // Import xlsx module
import { nanoid } from "nanoid";

let AdminController = {};
let counter = 100000;
let numrow = 0;
AdminController.addCAs = async (req, res) => {
	console.log(req.file);
	if (!req.file) {
		throw NotFoundError("File not found");
	}

	const maxCaId = await db.user.findFirst({
		orderBy: { ca_id: "desc" },
		select: { ca_id: true },
	});
	const maxNumRow = await db.$queryRaw`
  SELECT id
  FROM "User"
  WHERE LENGTH(id) < 19
  AND id ~ '^[0-9]+$'  -- Ensure it's a numeric value
  ORDER BY CAST(id AS INTEGER) DESC
  LIMIT 1;
`;

	// Set numrow and counter based on the max values from the database
	// let numrow = maxUserId._max.id ? parseInt(maxUserId._max.id, 10) + 1 : 0;
	// console.log('maxCaId:', maxCaId);
	// console.log('maxNumRow:', maxNumRow);
	let counter = maxCaId ? parseInt(maxCaId.ca_id.split("-")[1], 10) + 1 : 100000;
	let numrow = maxNumRow.length > 0 ? parseInt(maxNumRow[0].id, 10) + 1 : 1;
	// console.log('numrow:', numrow, 'counter:', counter);
	const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
	const sheetName = workbook.SheetNames[0];
	const sheet = workbook.Sheets[sheetName];
	const rows = xlsx.utils.sheet_to_json(sheet);
	// var numrow=await db.user.count();
	const users = rows.map((row) => ({
		id: String(numrow++),
		ca_id: String("RA-" + String(counter++)),
		email: row.email,
		name: row.name || "",
		mobile_number: String(row.mobile_number) || "",
		instagram: row.instagram || "",
		linkedin: row.linkedin || "",
		college_name: row.college_name || "",
		college_city: row.college_city || "",
	}));
	try {
		const createdUsers = await db.user.createMany({ data: users });
		res.status(201).json(new ApiResponse(201, createdUsers, "Users added successfully"));
	} catch (error) {
		// console.log(error);
		throw BadRequestError("Duplicate or missing email values");
	}
};

// AdminController.check = async (req, res) => {
// 	res.status(200).json(new ApiResponse(200, { user_id: req.user_id }, "User authenticated"));
// };

AdminController.approveTask = async (req, res) => {
	const { user_id, task_id, customPoints } = req.body; // Get customPoints from the request body

	if (!user_id || !task_id) {
		throw BadRequestError("user_id and task_id are required");
	}

	const task = await db.task.findUnique({ where: { task_id } });
	if (!task) {
		throw NotFoundError("Task not found");
	}

	const userTask = await db.userTask.findUnique({ where: { user_id } });
	if (!userTask) {
		throw NotFoundError("User not found");
	}

	// Check if the task is already approved
	if (userTask.tasks[task_id]?.approved) {
		throw BadRequestError("Submission already approved");
	}

	// Calculate points to increment
	const pointsToAdd = customPoints !== undefined ? parseInt(customPoints) : task.points;

	await db.userTask.update({
		where: { user_id },
		data: {
			user_credit: { increment: pointsToAdd },
			tasks: {
				
					[task_id]: {
						approved: true,
						points: pointsToAdd,
						files: userTask.tasks[task_id]?.files,
						 // Add points to the submission
					},
				
			},
		},
	});

	res.status(200).json(new ApiResponse(200, null, "Task approved and credit updated"));
};



AdminController.removeTaskPoint = async (req, res) => {
	const { user_id, task_id } = req.body;

	if (!user_id || !task_id) {
		throw BadRequestError("user_id and task_id are required");
	}

	const task = await db.task.findUnique({ where: { task_id } });
	if (!task) {
		throw NotFoundError("Task not found");
	}

	const userTask = await db.userTask.findUnique({ where: { user_id } });
	if (!userTask) {
		throw NotFoundError("User not found");
	}
	if (!userTask.tasks[task_id]?.approved) {
		throw BadRequestError("Submission not  approved");
	}
	await db.userTask.update({
		where: { user_id },
		data: {
			user_credit: { decrement: userTask.tasks[task_id]?.points },
			tasks: {
				
					[task_id]: {  approved: false ,files: userTask.tasks[task_id].files},
				
			},
		},
	});

	res.status(200).json(new ApiResponse(200, null, "Credit removed"));
};

AdminController.updateUserProfile = async (req, res) => {
	const { id, name, email, mobile_number, instagram, linkedin, college_name, college_city } = req.body;
	const updatedUser = await db.user.update({
		where: { id },
		data: {
			name,
			email,
			mobile_number,
			instagram,
			linkedin,
			college_name,
			college_city,
		},
	});
	res.json(new ApiResponse(200, updatedUser, "User profile updated successfully"));
};

AdminController.deleteUserProfile = async (req, res) => {
	const { id } = req.body;

	const deletedUser = await db.user.delete({
		where: { id },
	});
	res.json(new ApiResponse(200, deletedUser, "User successfully deleted"));
};

AdminController.createTask = async (req, res) => {
	let { description, deadline, points, type, link, multiple_submission } = req.body;
	const task_id = nanoid(6);
	points = parseInt(points);
	multiple_submission = multiple_submission == "true";

	if (link) {
		const response = await fetch("https://url.rdv-iitd.org/shorten/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + 'UpA*FlgvX?""S^h$^62:@2TD2z-]yB',
			},
			body: JSON.stringify({ original_url: link }),
		});
		const data = await response.json();
		link = data.shortUrl;
	}

	const task = await db.task.create({
		data: {
			task_id,
			description,
			deadline: new Date(deadline),
			points: points || 0,
			type,
			link,
			multiple_submission,
		},
	});
	res.status(201).json(new ApiResponse(201, task, "Task created successfully"));
};

// Update a task by ID
AdminController.updateTask = async (req, res) => {
	let { task_id, description, deadline, points, link, multiple_submission } = req.body;
	points = parseInt(points);
	multiple_submission = multiple_submission == "true";
  if (link && !link.startsWith("https://url")) {
		const response = await fetch("https://url.rdv-iitd.org/shorten/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + 'UpA*FlgvX?""S^h$^62:@2TD2z-]yB',
			},
			body: JSON.stringify({ original_url: link }),
		});
		const data = await response.json();
		link = data.shortUrl;
	}

	const task = await db.task.update({
		where: { task_id },
		data: {
			description,
			deadline: new Date(deadline),
			points,
			link,
			multiple_submission,
		},
	});
	res.status(200).json(new ApiResponse(200, task, "Task updated successfully"));
};

// Delete a task by ID
AdminController.deleteTask = async (req, res) => {
	const { task_id } = req.body;

	const deletedTask = await db.task.delete({
		where: { task_id },
	});
	res.status(200).json(new ApiResponse(200, deletedTask, "Task successfully deleted"));
};

// Get all users
AdminController.getAllUsers = async (req, res) => {
	const users = await db.user.findMany({
		select: {
			id: true,
			name: true,
			email: true,
			mobile_number: true,
			ca_id: true,
		},
	});
	res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
};

// // Get user task points
// AdminController.getTaskpoints = async (req, res) => {
// 	const user_id = req.user_id;

// 	if (!user_id) {
// 		throw BadRequestError("user_id is required");
// 	}

// 	const userTask = await db.userTask.findUnique({
// 		where: { user_id },
// 		select: { user_credit: true },
// 	});

// 	if (!userTask) {
// 		throw NotFoundError("User not found");
// 	}

// 	res.status(200).json(new ApiResponse(200, { user_id, points: userTask.user_credit }));
// };

// Get a specific task by ID
AdminController.getTaskById = async (req, res) => {
	const { task_id } = req.query;

	if (!task_id) {
		throw BadRequestError("task_id is required");
	}

	const task = await db.task.findUnique({ where: { task_id } });
	if (task) {
		res.status(200).json(new ApiResponse(200, task, "Task found"));
	} else {
		throw NotFoundError("Task not found");
	}
};

// Get all tasks
AdminController.getAllTasks = async (req, res) => {
	const tasks = await db.task.findMany();
	res.status(200).json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
};

AdminController.allSubmissions = async (req, res) => {
	const { task_id } = req.query; // e.g., "N3K9gk"
  
	if (!task_id) {
		throw BadRequestError("task_id is required");
	}

	try {
		// Fetch the task points from the task table
		const task = await db.task.findUnique({
			where: { task_id },
			select: { points: true },
		});
		
		if (!task) {
			throw NotFoundError("Task not found");
		}

		// Fetch all user tasks containing the specified task_id
		const submissions = await db.userTask.findMany({
			where: {
				tasks: {
					path: [task_id], // Specify the path for the task_id in the JSON
					not: {
						equals: null, // Ensure the task_id exists in the tasks JSON
					},
				},
			},
			include: {
				user: {
					select: {
						name: true,
					},
				},
			},
		});
  
		// Map the results and add task points
		const result = submissions.map((submission) => {
			const taskData = submission.tasks[task_id];
			return {
				user_id: submission.user_id,
				name: submission.user.name,
				task_id,
				approved: taskData.approved,
				files: taskData.files || [],
				points: task.points, // Add task points to the response
			};
		});
  
		// Send the response
		return res.status(200).json({
			status: 200,
			data: result,
			message: "Submissions fetched successfully",
		});
	} catch (error) {
		console.error(error);
		throw BadRequestError("Failed to fetch submissions");
	}
};

export default AdminController;