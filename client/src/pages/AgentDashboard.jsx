import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  FaClipboardList,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

function AgentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [complaints, setComplaints] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://customer-repository.onrender.com/api/agent/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(res.data.complaints);
    } catch (err) {
      console.log(err);

      if (err.response?.status === 401) {
        alert("Session Expired. Please Login Again.");
        localStorage.clear();
        window.location.href = "/login";
      }
    }
  };

  const total = complaints.length;

  const pending = complaints.filter(
    (item) => item.status === "Pending"
  ).length;

  const resolved = complaints.filter(
    (item) => item.status === "Resolved"
  ).length;

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
    marginLeft: window.innerWidth > 768 ? "260px" : "0",
    marginTop: "80px",
    padding: window.innerWidth > 768 ? "30px" : "15px",
    background: "#F4F7FC",
    minHeight: "100vh",
    width: window.innerWidth > 768 ? "calc(100% - 260px)" : "100%",
  }}
>
        {/* Header */}

        <div className="mb-4">
          <h2 className="fw-bold display-6">
            Welcome Back, {user?.name} 👋
          </h2>

          <p className="text-secondary">
            Manage and resolve customer complaints
          </p>
        </div>

        {/* Dashboard Cards */}

        <div className="row g-4">

          {/* Total Assigned */}

          <div className="col-lg-4 col-md-6">
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
                {total}
              </h1>

              <h5>Total Assigned</h5>
            </div>
          </div>
                    {/* Pending */}

          <div className="col-lg-4 col-md-6">
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
                {pending}
              </h1>

              <h5>Pending</h5>
            </div>
          </div>

          {/* Resolved */}

          <div className="col-lg-4 col-md-6">
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
                {resolved}
              </h1>

              <h5>Resolved</h5>
            </div>
          </div>

        </div>

        {/* Recent Complaints */}

        <div className="card border-0 shadow-lg rounded-4 mt-5">

          <div className="card-header bg-white border-0 py-4">
            <h4 className="fw-bold mb-0">
              Assigned Complaints
            </h4>
          </div>

          <div className="table-responsive">

            <table className="table table-hover align-middle mb-0">

              <thead className="table-light">

                <tr>
                  <th>Customer</th>
                  <th>Complaint</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>
                                {complaints.length > 0 ? (

                  complaints.slice(0, 5).map((item) => (

                    <tr key={item._id}>

                      <td>{item.customer?.name}</td>

                      <td>{item.title}</td>

                      <td>{item.category}</td>

                      <td>

                        <span
                          className={`badge rounded-pill px-3 py-2 ${
                            item.status === "Pending"
                              ? "bg-warning text-dark"
                              : item.status === "Resolved"
                              ? "bg-success"
                              : "bg-primary"
                          }`}
                        >
                          {item.status}
                        </span>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center py-5 text-muted"
                    >
                      No complaints assigned.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </>
  );
}

export default AgentDashboard;