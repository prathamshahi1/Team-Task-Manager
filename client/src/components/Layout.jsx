import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Layout.css";

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="layout">
      
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">Task Manager</h2>

        <nav className="nav">
          <Link
            to="/dashboard"
            className={isActive("/dashboard") ? "nav-link active" : "nav-link"}
          >
            📊 Dashboard
          </Link>

          <Link
            to="/projects"
            className={isActive("/projects") ? "nav-link active" : "nav-link"}
          >
            📁 Projects
          </Link>

          <Link
            to="/tasks"
            className={isActive("/tasks") ? "nav-link active" : "nav-link"}
          >
            📝 Tasks
          </Link>

          <Link
            to="/profile"
            className={isActive("/profile") ? "nav-link active" : "nav-link"}
          >
            👤 Profile
          </Link>
        </nav>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

export default Layout;