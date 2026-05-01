import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// only logged-in users
router.get("/user", auth, (req, res) => {
  res.json({
    message: "User access granted",
    user: req.user
  });
});

// only admin
router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    message: "Admin access granted"
  });
});

export default router;