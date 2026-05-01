import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import "../styles/Projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createProject = async () => {
    try {
      if (!form.name) return alert("Enter project name");

      await API.post("/projects", form);

      alert("Project Created ✅");

      setForm({ name: "", description: "" });

      fetchProjects();

    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await API.delete(`/projects/${id}`);
      alert("Project deleted ✅");
      fetchProjects();
    } catch (err) {
      alert("Error deleting project ❌");
    }
  };

  return (
    <Layout>
      <div className="projects-container">
        <h2 className="projects-title">📁 Projects</h2>

        {/* CREATE FORM */}
        <div className="project-form">
          <input
            placeholder="Project Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />

          <button onClick={createProject}>
            Create Project
          </button>
        </div>

        {/* PROJECT GRID */}
        <div className="projects-grid">
          {projects.length === 0 && <p>No projects yet</p>}

          {projects.map(p => (
            <div className="project-card" key={p._id}>
              <h3>{p.name}</h3>
              <p>{p.description || "No description"}</p>

              <div className="project-actions">
                <button
                  className="view-btn"
                  onClick={() => navigate(`/tasks?project=${p._id}`)}
                >
                  View Tasks
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteProject(p._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Projects;