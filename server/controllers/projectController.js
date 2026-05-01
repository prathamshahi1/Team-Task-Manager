import Project from "../models/Project.js";
import User from "../models/User.js";

// ✅ CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name required" });
    }

    // 🔥 SAFE ACCESS
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const project = await Project.create({
      name,
      description,
      owner: userId,
      members: [userId]
    });

    res.status(201).json(project);

  } catch (error) {
    console.log("CREATE ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};


// ✅ GET PROJECTS
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { owner: req.user.id },
        { members: req.user.id }
      ]
    }).populate("members", "name email");

    res.json(projects);

  } catch (error) {
    console.log("GET PROJECT ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};


// ✅ ADD MEMBER
export const addMember = async (req, res) => {
  try {
    const { projectId, userId } = req.body;

    // 🔒 VALIDATION
    if (!projectId || !userId) {
      return res.status(400).json({ message: "projectId and userId required" });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // 🔒 ONLY OWNER CAN ADD MEMBERS
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only owner can add members" });
    }

    // ✅ CHECK USER EXISTS
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ ADD MEMBER IF NOT EXISTS
    if (!project.members.includes(userId)) {
      project.members.push(userId);
      await project.save();
    }

    res.json(project);

  } catch (error) {
    console.log("ADD MEMBER ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};
// DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // optional: only owner can delete
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await project.deleteOne();

    res.json({ message: "Project deleted ✅" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};