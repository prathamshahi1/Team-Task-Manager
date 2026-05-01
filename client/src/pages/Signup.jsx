import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", form);

      alert("Signup successful ✅");

      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Error ❌");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Create Account 🚀</h2>
        <p className="subtitle">Sign up to get started</p>

        <form onSubmit={handleSignup} className="auth-form">

          <input
            type="text"
            placeholder="Full Name"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          <button type="submit">Signup</button>
        </form>

        <p className="switch-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;