import { Router } from "express";

import {protect, admin} from "../middleware/auth.middleware.js";
import { deleteUser, getUserProfile, updateUserProfile, insertAndUpdateWorkingHours } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.put("/working-hours", protect, admin, insertAndUpdateWorkingHours);

userRouter.get("/:id", protect, getUserProfile);
userRouter.put("/:id", protect, updateUserProfile);
userRouter.delete("/:id", protect, deleteUser);


export default userRouter;
