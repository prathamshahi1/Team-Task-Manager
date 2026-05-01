import express from "express";
import {
  createTask,
  getTasks,
  updateTaskStatus
} from "../controllers/taskController.js";

import { auth } from "../middleware/authMiddleware.js";
import { deleteTask } from "../controllers/taskController.js";

const router = express.Router();

// Create task
router.post("/", auth, createTask);

// Get tasks by project
router.get("/:projectId", auth, getTasks);

// Update status
router.put("/:id", auth, updateTaskStatus);
router.delete("/:id", auth, deleteTask);

export default router;