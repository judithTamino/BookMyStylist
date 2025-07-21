import { Router } from "express";
import {protect, admin} from "../middleware/auth.middleware.js";
import { createService, deleteService, getActiveServices, getAllServices, likeService, updateService } from "../controllers/service.controller.js";

const serviceRouter = Router();

serviceRouter.get("/", getActiveServices);
serviceRouter.get("/all", protect, admin, getAllServices);
serviceRouter.post("/", protect, admin, createService);
serviceRouter.put("/:id", protect, admin, updateService);
serviceRouter.delete("/:id", protect, admin, deleteService);
serviceRouter.patch("/:id", protect, likeService);


export default serviceRouter;