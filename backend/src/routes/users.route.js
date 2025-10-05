import { Router } from "express";

import {protect, admin} from "../middleware/auth.middleware.js";
import { deleteUser, getAllUsers, getUserProfile, updateUserProfile, workingHoures } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", protect, admin, getAllUsers);
userRouter.put("/working-hours", protect, admin, workingHoures);

userRouter.get("/:id", protect, getUserProfile);
userRouter.put("/:id", protect, updateUserProfile);
userRouter.delete("/:id", protect, deleteUser);


export default userRouter;
