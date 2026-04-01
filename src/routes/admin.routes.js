import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import AdminController from "../controllers/admin.controller.js";

const AdminRouter = Router();

// AdminRouter.get("/check", AdminController.check);
AdminRouter.post("/upload", upload.single("file"), AdminController.addCAs);
AdminRouter.post("/approveTask", AdminController.approveTask);
AdminRouter.post("/removeTaskPoint", AdminController.removeTaskPoint);
AdminRouter.put("/task", AdminController.updateTask);
AdminRouter.get("/task", AdminController.getAllTasks);
AdminRouter.delete("/task", AdminController.deleteTask);
AdminRouter.post("/task", AdminController.createTask);
AdminRouter.get("/taskid", AdminController.getTaskById); // If you prefer to get the task using task_id from the body
AdminRouter.put("/profile", AdminController.updateUserProfile);
AdminRouter.delete("/profile", AdminController.deleteUserProfile);
AdminRouter.get("/users", AdminController.getAllUsers);
AdminRouter.get("/allsubmissions", AdminController.allSubmissions);

export default AdminRouter;
