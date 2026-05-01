import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";
import "../styles/Tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const location = useLocation();

  const [form, setForm] = useState({
    title: "",
    description: "",
    project: "",
    assignedTo: "",
    dueDate: ""
  });

  useEffect(() => {
    API.get("/projects").then(res => setProjects(res.data));
  }, []);

  useEffect(() => {
    API.get("/users").then(res => setUsers(res.data));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const projectId = params.get("project");

    if (projectId) {
      setForm(prev => ({ ...prev, project: projectId }));
      fetchTasks(projectId);
    }
  }, [location]);

  const fetchTasks = async (projectId) => {
    const res = await API.get(`/tasks/${projectId}`);
    setTasks(res.data);
  };

  const createTask = async () => {
    try {
      if (!form.project) return alert("Select project");
      if (!form.assignedTo) return alert("Assign user");

      await API.post("/tasks", { ...form, status: "todo" });

      alert("Task created ✅");
      fetchTasks(form.project);

    } catch (err) {
      alert(err.response?.data?.error || "Error");
    }
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks(form.project);
    window.dispatchEvent(new Event("taskUpdated"));
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    await API.delete(`/tasks/${id}`);
    fetchTasks(form.project);
  };

  return (
    <Layout>
      <div className="tasks-container">
        <h2 className="tasks-title">📝 Tasks</h2>

        {/* FORM */}
        <div className="task-form">
          <input
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />

          <select
            value={form.project}
            onChange={e => {
              setForm({ ...form, project: e.target.value });
              fetchTasks(e.target.value);
            }}
          >
            <option value="">Select Project</option>
            {projects.map(p => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>

          <select
            value={form.assignedTo}
            onChange={e =>
              setForm({ ...form, assignedTo: e.target.value })
            }
          >
            <option value="">Assign User</option>
            {users.map(u => (
              <option key={u._id} value={u._id}>{u.name}</option>
            ))}
          </select>

          <input
            type="date"
            value={form.dueDate}
            onChange={e => setForm({ ...form, dueDate: e.target.value })}
          />

          <button onClick={createTask}>Create Task</button>
        </div>

        {/* TASK LIST */}
        <div className="tasks-grid">
          {tasks.length === 0 && <p>No tasks yet</p>}

          {tasks.map(task => (
            <div className="task-card" key={task._id}>
              <h4>{task.title}</h4>
              <p>{task.description}</p>

              <span className={`status ${task.status}`}>
                {task.status}
              </span>

              <div className="task-actions">
                <button onClick={() => updateStatus(task._id, "todo")}>
                  Todo
                </button>

                <button onClick={() => updateStatus(task._id, "in-progress")}>
                  In Progress
                </button>

                <button onClick={() => updateStatus(task._id, "done")}>
                  Done
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task._id)}
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

export default Tasks;