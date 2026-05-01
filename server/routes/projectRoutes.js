import express from "express";
import {
  createProject,
  getProjects,
  addMember
} from "../controllers/projectController.js";

import { auth } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import { deleteProject } from "../controllers/projectController.js";

const router = express.Router();

// Admin creates project
router.post("/", auth, isAdmin, createProject);

// All users can view their projects
router.get("/", auth, getProjects);

// Add member (Admin only)
router.post("/add-member", auth, isAdmin, addMember);
router.delete("/:id", auth, deleteProject);

export default router;