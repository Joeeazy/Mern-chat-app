import express from "express";
import { getUsersForSidebar } from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

//protectRoute middleware ensures that anauthenticated user will not be able to call the function
router.get("/", protectRoute, getUsersForSidebar);

export default router;
