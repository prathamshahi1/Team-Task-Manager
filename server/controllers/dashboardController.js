import Task from "../models/Task.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.find({ assignedTo: userId });

    const total = tasks.length;

    const completed = tasks.filter(t => t.status === "done").length;

    const pending = tasks.filter(t => t.status !== "done").length;

    const overdue = tasks.filter(
      t =>
        t.dueDate &&
        new Date(t.dueDate) < new Date() &&
        t.status !== "done"
    ).length;

    res.json({ total, completed, pending, overdue });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};