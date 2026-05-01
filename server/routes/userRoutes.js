import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { auth } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();


// ✅ 1. GET ALL USERS (for dropdown)
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().select("name email");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ 2. GET PROFILE
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ 3. UPDATE PASSWORD
router.put("/password", auth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ 4. TEST USER ROUTE
router.get("/user", auth, (req, res) => {
  res.json({
    message: "User access granted",
    user: req.user
  });
});


// ✅ 5. ADMIN ONLY
router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    message: "Admin access granted"
  });
});


export default router;