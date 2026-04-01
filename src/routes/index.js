import e from "express";
import AdminRouter from "./admin.routes.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import UserRouter from "./user.routes.js";
import { secretCodeMiddleware } from "../middlewares/secretCodeMiddleware.js";
import { caTokenMiddleware } from "../middlewares/catoken.middleware.js";
import UserController from "../controllers/user.controller.js";
const router = e.Router();


router.use("/admin", secretCodeMiddleware, AdminRouter);


// router.use("/user/check_user", authMiddleware,UserRouter);
router.get("/user/check_user",authMiddleware,UserController.checkUser);
router.use(authMiddleware);

// router.use("/user/check_user", authMiddleware,UserRouter);
// router.use(caTokenMiddleware);
router.use(caTokenMiddleware);
router.use("/user", UserRouter);

export default router;
