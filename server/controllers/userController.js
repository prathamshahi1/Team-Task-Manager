import User from "../models/User.js";
import bcrypt from "bcrypt";


// ✅ 1. GET ALL USERS (for task assign dropdown)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ 2. GET LOGGED-IN USER PROFILE
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// ✅ 3. UPDATE PASSWORD
export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    // check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};