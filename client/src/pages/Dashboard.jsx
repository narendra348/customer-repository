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

  return (
    <>
      <Sidebar />
      <Topbar />

      <div
        style={{
          marginLeft: "250px",
          padding: "30px",
          background: "#f4f7fc",
          minHeight: "100vh",
        }}
      >
        <h2 className="fw-bold mb-2">
          Welcome Back, {user?.name} 👋
        </h2>

        <p className="text-muted mb-4">
          Customer Complaint Management Dashboard
        </p>

        <div className="row g-4">

          <div className="col-lg-3">
            <div className="card border-0 shadow rounded-4 p-4">
              <FaClipboardList size={40} color="#2563EB" />
              <h2 className="mt-3">25</h2>
              <p className="text-muted mb-0">
                Total Complaints
              </p>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card border-0 shadow rounded-4 p-4">
              <FaClock size={40} color="#F59E0B" />
              <h2 className="mt-3">12</h2>
              <p className="text-muted mb-0">
                Pending
              </p>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card border-0 shadow rounded-4 p-4">
              <FaCheckCircle size={40} color="#10B981" />
              <h2 className="mt-3">13</h2>
              <p className="text-muted mb-0">
                Resolved
              </p>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card border-0 shadow rounded-4 p-4">
              <FaUsers size={40} color="#8B5CF6" />
              <h2 className="mt-3">5</h2>
              <p className="text-muted mb-0">
                Active Users
              </p>
            </div>
          </div>

        </div>

        <div className="card border-0 shadow rounded-4 mt-5">
          <div className="card-header bg-white">
            <h4 className="fw-bold">
              Recent Complaints
            </h4>
          </div>

          <div className="table-responsive">
            <table className="table table-hover mb-0">
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
                    <span className="badge bg-warning">
                      Pending
                    </span>
                  </td>
                  <td>13 Jul 2026</td>
                </tr>

                <tr>
                  <td>Software Error</td>
                  <td>Application</td>
                  <td>
                    <span className="badge bg-success">
                      Resolved
                    </span>
                  </td>
                  <td>12 Jul 2026</td>
                </tr>

                <tr>
                  <td>Printer Not Working</td>
                  <td>Hardware</td>
                  <td>
                    <span className="badge bg-primary">
                      In Progress
                    </span>
                  </td>
                  <td>11 Jul 2026</td>
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