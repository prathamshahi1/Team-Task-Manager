import Task from "../models/Task.js";

// ✅ CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, dueDate } = req.body;

    if (!project || !assignedTo) {
      return res.status(400).json({ error: "Project and assigned user required" });
    }

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      dueDate,
      status: "todo" // ✅ default
    });

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET TASKS BY PROJECT
export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({ project: projectId })
      .populate("assignedTo", "name email");

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ UPDATE STATUS
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(task);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted ✅" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};