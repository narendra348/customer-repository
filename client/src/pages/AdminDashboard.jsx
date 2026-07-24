import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  FaClipboardList,
  FaClock,
  FaSpinner,
  FaCheckCircle,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [agents, setAgents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [stats, setStats] = useState({
    totalComplaints: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
    customers: 0,
    agents: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
    fetchComplaints();
    fetchAgents();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://customer-repository.onrender.com/api/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data.stats);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://customer-repository.onrender.com/api/admin/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(res.data.complaints);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAgents = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://customer-repository.onrender.com/api/admin/agents",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAgents(res.data.agents);
    } catch (err) {
      console.log(err);
    }
  };

  const assignComplaint = async (complaintId, agentId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://customer-repository.onrender.com/api/admin/assign/${complaintId}`,
        { agentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Complaint Assigned Successfully");

      fetchComplaints();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <>
      <Sidebar
  isOpen={isOpen}
  setIsOpen={setIsOpen}
/>

<Topbar
  isOpen={isOpen}
  setIsOpen={setIsOpen}
/>

      <div
  className="main-content"
  style={{
    marginLeft: window.innerWidth <= 768 ? "0" : "280px",
    marginTop: "90px",
    padding: window.innerWidth <= 768 ? "15px" : "25px",
    width: window.innerWidth <= 768 ? "100%" : "calc(100% - 280px)",
    transition: "0.3s",
  }}
>

        <h3 className="mt-2 mb-1 fw-bold">
          Admin Dashboard
        </h3>

        <p className="text-muted mb-4">
          Monitor complaints, customers and agents.
        </p>

        <div className="row g-2 mb-3 justify-content-center">
          {/* Total */}

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">
            <div
              className="card border-0 shadow-lg h-100"
              style={{
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg,#2563EB,#3B82F6)",
                color: "#fff",
              }}
            >
              <div className="card-body text-center py-3">

                <FaClipboardList size={26} />

                <h3 className="mt-2 mb-1 fw-bold">
                  {stats.totalComplaints}
                </h3>

                <small>Total Complaints</small>

              </div>
            </div>

          </div>

          {/* Pending */}

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">

            <div
              className="card border-0 shadow-lg h-100"
              style={{
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg,#F59E0B,#FBBF24)",
                color: "#fff",
              }}
            >
              <div className="card-body text-center py-3">

                <FaClock size={26} />

                <h3 className="mt-2 mb-1 fw-bold">
                  {stats.pending}
                </h3>

                <small>Pending</small>

              </div>
            </div>

          </div>

          {/* In Progress */}

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">

            <div
              className="card border-0 shadow-lg h-100"
              style={{
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg,#06B6D4,#0EA5E9)",
                color: "#fff",
              }}
            >
              <div className="card-body text-center py-3">

                <FaSpinner size={26} />

                <h3 className="mt-2 mb-1 fw-bold">
                  {stats.inProgress}
                </h3>

                <small>In Progress</small>

              </div>
            </div>

          </div>

          {/* Resolved */}

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">

            <div
              className="card border-0 shadow-lg h-100"
              style={{
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg,#10B981,#34D399)",
                color: "#fff",
              }}
            >
              <div className="card-body text-center py-3">

                <FaCheckCircle size={26} />

                <h3 className="mt-2 mb-1 fw-bold">
                  {stats.resolved}
                </h3>

                <small>Resolved</small>

              </div>
            </div>

          </div>

          {/* Customers */}

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">

            <div
              className="card border-0 shadow-lg h-100"
              style={{
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg,#7C3AED,#9333EA)",
                color: "#fff",
              }}
            >
              <div className="card-body text-center py-3">

                <FaUsers size={26} />

                <h3 className="mt-2 mb-1 fw-bold">
                  {stats.customers}
                </h3>

                <small>Customers</small>

              </div>
            </div>

          </div>

          {/* Agents */}

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-3">

            <div
              className="card border-0 shadow-lg h-100"
              style={{
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg,#374151,#4B5563)",
                color: "#fff",
              }}
            >
              <div className="card-body text-center py-3">

                <FaUserTie size={26} />

                <h3 className="mt-2 mb-1 fw-bold">
                  {stats.agents}
                </h3>

                <small>Agents</small>

              </div>
            </div>

          </div>

        </div>
                {/* Complaint Management Table */}

        <div
          className="card border-0 shadow-lg"
          style={{
            borderRadius: "20px",
          }}
        >
          <div className="card-header bg-white border-0 py-4">
            <h4 className="fw-bold mb-0">
              Complaint Management
            </h4>
          </div>

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-light">

                  <tr>

                    <th>ID</th>

                    <th>Customer</th>

                    <th>Complaint</th>

                    <th>Status</th>

                    <th>Assign Agent</th>

                  </tr>

                </thead>

                <tbody>

                  {complaints.length === 0 ? (

                    <tr>

                      <td
                        colSpan="5"
                        className="text-center py-5 text-muted"
                      >
                        No complaints available
                      </td>

                    </tr>

                  ) : (

                    complaints.map((item) => (

                      <tr key={item._id}>

                        <td>
                          <span className="fw-semibold text-primary">
                            #{item._id.slice(-6)}
                          </span>
                        </td>

                        <td>
                          <div className="fw-semibold">
                            {item.customer?.name}
                          </div>
                        </td>

                        <td>
                          {item.title}
                        </td>

                        <td>

                          <span
                            className={`badge rounded-pill px-3 py-2 ${
                              item.status === "Pending"
                                ? "bg-warning text-dark"
                                : item.status === "Resolved"
                                ? "bg-success"
                                : "bg-info"
                            }`}
                          >
                            {item.status}
                          </span>

                        </td>

                        <td style={{ width: "180px" }}>

                          <select
                            className="form-select"
                            defaultValue=""
                            onChange={(e) =>
                              assignComplaint(
                                item._id,
                                e.target.value
                              )
                            }
                          >

                            <option value="">
                              Select Agent
                            </option>

                            {agents.map((agent) => (

                              <option
                                key={agent._id}
                                value={agent._id}
                              >
                                {agent.name}
                              </option>

                            ))}

                          </select>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}

export default AdminDashboard;