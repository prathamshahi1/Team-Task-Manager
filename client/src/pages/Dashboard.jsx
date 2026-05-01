import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";
import "../styles/Dashboard.css";

function Dashboard() {
  const [data, setData] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0
  });

  const fetchDashboard = async () => {
    const res = await API.get("/dashboard");
    setData(res.data);
  };

  useEffect(() => {
    fetchDashboard();

    window.addEventListener("taskUpdated", fetchDashboard);

    return () => {
      window.removeEventListener("taskUpdated", fetchDashboard);
    };
  }, []);

  return (
    <Layout>
      <div className="dashboard">
        <h2 className="dashboard-title">📊 Dashboard</h2>

        <div className="cards">

          <div className="card total">
            <h3>Total Tasks</h3>
            <p>{data.total}</p>
          </div>

          <div className="card completed">
            <h3>Completed</h3>
            <p>{data.completed}</p>
          </div>

          <div className="card pending">
            <h3>Pending</h3>
            <p>{data.pending}</p>
          </div>

          <div className="card overdue">
            <h3>Overdue</h3>
            <p>{data.overdue}</p>
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;