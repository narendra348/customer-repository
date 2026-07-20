import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function AgentDashboard() {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getComplaints();
  }, []);

  const getComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://https://customer-repository.onrender.com/api/agent/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(response.data.complaints);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        alert("Session Expired. Please Login Again.");

        localStorage.clear();

        navigate("/login");
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

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="d-flex">

      {/* Sidebar */}

      <div
        className="bg-dark text-white p-4"
        style={{
          width: "250px",
          minHeight: "100vh",
        }}
      >
        <h2 className="text-center mb-5">
          Agent Panel
        </h2>

        <ul className="nav flex-column">

          <li className="mb-3">
            <Link
              to="/agent"
              className="nav-link text-white"
            >
              🏠 Dashboard
            </Link>
          </li>

          <li className="mb-3">
            <Link
              to="/agent/tasks"
              className="nav-link text-white"
            >
              📋 Assigned Complaints
            </Link>
          </li>

          <li className="mb-3">
            <Link
              to="/agent/profile"
              className="nav-link text-white"
            >
              👤 Profile
            </Link>
          </li>

          <li className="mt-5">
            <button
              className="btn btn-danger w-100"
              onClick={logout}
            >
              Logout
            </button>
          </li>

        </ul>
      </div>

      {/* Main Content */}

      <div
        className="flex-grow-1 p-5"
        style={{
          background: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        <h1 className="fw-bold">
          Welcome Agent 👋
        </h1>

        <p className="text-muted">
          Manage and resolve customer complaints
        </p>

        {/* Dashboard Cards */}

        <div className="row mt-4">

          <div className="col-md-4">
            <div className="card shadow border-0 rounded-4 p-4">
              <h2 className="text-primary">{total}</h2>
              <p>Total Assigned</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 rounded-4 p-4">
              <h2 className="text-warning">{pending}</h2>
              <p>Pending</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 rounded-4 p-4">
              <h2 className="text-success">{resolved}</h2>
              <p>Resolved</p>
            </div>
          </div>

        </div>

        {/* Complaint Table */}

        <div className="card shadow border-0 rounded-4 mt-5">

          <div className="card-header bg-white">
            <h4>Recent Complaints</h4>
          </div>

          <div className="table-responsive">

            <table className="table table-hover">

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
                          className={
                            item.status === "Resolved"
                              ? "badge bg-success"
                              : item.status === "Pending"
                              ? "badge bg-warning text-dark"
                              : "badge bg-primary"
                          }
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
                      className="text-center text-danger"
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

    </div>
  );
}

export default AgentDashboard;