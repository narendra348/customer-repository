import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    users: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://customer-repository.onrender.com/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Sidebar />
      <Topbar />

      <div
        className="main-content"
        style={{
          marginLeft: "250px",
          padding: "30px",
          background: "#F4F7FC",
          minHeight: "100vh",
        }}
      >
        <div className="mb-4">
          <h2 className="fw-bold display-6">
            Welcome Back, {user?.name} 👋
          </h2>

          <p className="text-secondary">
            Customer Complaint Management Dashboard
          </p>
        </div>

        <div className="row g-4">

          {/* Card 1 */}

          <div className="col-lg-3 col-md-6">
            <div
              className="card border-0 shadow-lg rounded-4 p-4"
              style={{
                height: "180px",
                background:
                  "linear-gradient(135deg,#2563EB,#4F46E5)",
                color: "white",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "18px",
                  background: "rgba(255,255,255,.20)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaClipboardList size={32} />
              </div>

              <h1 className="fw-bold mt-3">
                {stats.total}
              </h1>

              <h5>Total Complaints</h5>
            </div>
          </div>

          {/* Card 2 */}

          <div className="col-lg-3 col-md-6">
            <div
              className="card border-0 shadow-lg rounded-4 p-4"
              style={{
                height: "180px",
                background:
                  "linear-gradient(135deg,#F59E0B,#F97316)",
                color: "white",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "18px",
                  background: "rgba(255,255,255,.20)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaClock size={32} />
              </div>

              <h1 className="fw-bold mt-3">
                {stats.pending}
              </h1>

              <h5>Pending</h5>
            </div>
          </div>

          {/* Card 3 */}

          <div className="col-lg-3 col-md-6">
            <div
              className="card border-0 shadow-lg rounded-4 p-4"
              style={{
                height: "180px",
                background:
                  "linear-gradient(135deg,#10B981,#14B8A6)",
                color: "white",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "18px",
                  background: "rgba(255,255,255,.20)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaCheckCircle size={32} />
              </div>

              <h1 className="fw-bold mt-3">
                {stats.resolved}
              </h1>

              <h5>Resolved</h5>
            </div>
          </div>

          {/* Card 4 */}

          <div className="col-lg-3 col-md-6">
            <div
              className="card border-0 shadow-lg rounded-4 p-4"
              style={{
                height: "180px",
                background:
                  "linear-gradient(135deg,#8B5CF6,#9333EA)",
                color: "white",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "18px",
                  background: "rgba(255,255,255,.20)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaUsers size={32} />
              </div>

              <h1 className="fw-bold mt-3">
                {stats.users}
              </h1>

              <h5>Active Users</h5>
            </div>
          </div>
        </div>

        {/* Recent Complaints */}

        <div className="card border-0 shadow-lg rounded-4 mt-5">

          <div className="card-header bg-white border-0 py-4">
            <h4 className="fw-bold mb-0">
              Recent Complaints
            </h4>
          </div>

          <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

              <thead className="table-light">

                <tr>
                  <th>Complaint</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>

              </thead>

              <tbody>

                <tr>

                  <td>Internet Issue</td>

                  <td>Network</td>

                  <td>
                    <span className="badge bg-warning rounded-pill px-3 py-2">
                      Pending
                    </span>
                  </td>

                  <td>13 Jul 2026</td>

                </tr>

                <tr>

                  <td>Software Error</td>

                  <td>Software</td>

                  <td>
                    <span className="badge bg-success rounded-pill px-3 py-2">
                      Resolved
                    </span>
                  </td>

                  <td>12 Jul 2026</td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;