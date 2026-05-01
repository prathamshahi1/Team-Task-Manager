import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", auth, getDashboard);

export default router;