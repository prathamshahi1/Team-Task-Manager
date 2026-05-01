import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

function Profile() {
  const [user, setUser] = useState({});
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: ""
  });

  // ✅ Fetch profile
  useEffect(() => {
    API.get("/users/profile")
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, []);

  // ✅ Update password
  const handleUpdate = async () => {
    try {
      await API.put("/users/password", form);

      alert("Password updated ✅");

      setForm({
        oldPassword: "",
        newPassword: ""
      });

    } catch (err) {
      alert(err.response?.data?.message || "Error ❌");
    }
  };

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h2>👤 Profile</h2>

        <p><b>Name:</b> {user.name}</p>
        <p><b>Email:</b> {user.email}</p>

        <hr />

        <h3>Change Password</h3>

        <input
          type="password"
          placeholder="Old Password"
          value={form.oldPassword}
          onChange={e =>
            setForm({ ...form, oldPassword: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="New Password"
          value={form.newPassword}
          onChange={e =>
            setForm({ ...form, newPassword: e.target.value })
          }
        />

        <button onClick={handleUpdate}>
          Update Password
        </button>
      </div>
    </Layout>
  );
}

export default Profile;