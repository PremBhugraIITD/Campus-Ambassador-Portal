import { Router } from 'express';
import UserController from '../controllers/user.controller.js'; 
import TaskController from '../controllers/task.controller.js';
import UploadRouter from "./upload.routes.js";


const UserRouter = Router();

UserRouter.get('/profile', UserController.getUserProfile);
UserRouter.get('/tasks', TaskController.getAllTasks);
UserRouter.get('/getTaskpoints', TaskController.getTaskpoints);
UserRouter.use("/upload", UploadRouter);
// UserRouter.get("/check_user", UserController.checkUser);
UserRouter.get("/users", UserController.getAllUsers);
UserRouter.post("/task_submission", UserController.checkUserTask);
UserRouter.get("/offer_letter", UserController.getOfferLetter);



/**
 * Upload file (Submit task)
 */


export default UserRouter;