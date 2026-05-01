import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to your account</p>

        <form onSubmit={handleLogin} className="auth-form">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <p className="switch-text">
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;