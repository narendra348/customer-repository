import { Link } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaPlusCircle,
  FaUser,
  FaUsers,
  FaTasks,
  FaBell,
  FaChartBar,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
        position: "fixed",
      }}
    >
      <h3 className="text-center mb-5 fw-bold">
        CRS
      </h3>

      {/* ---------------- ADMIN ---------------- */}
      {user?.role === "admin" && (
        <>
          <Link className="nav-link text-white mb-3" to="/admin">
            <FaHome className="me-2" />
            Dashboard
          </Link>

          <Link
            className="nav-link text-white mb-3"
            to="/admin/complaints"
          >
            <FaClipboardList className="me-2" />
            All Complaints
          </Link>

          <Link
            className="nav-link text-white mb-3"
            to="/admin/agents"
          >
            <FaUsers className="me-2" />
            Agents
          </Link>

          <Link
            className="nav-link text-white mb-3"
            to="/reports"
          >
            <FaChartBar className="me-2" />
            Reports
          </Link>
          <Link className="nav-link text-white mb-3" to="/analytics">
              📊 Analytics
          </Link>


          
        </>
      )}

      {/* ---------------- AGENT ---------------- */}
      {user?.role === "agent" && (
        <>
          <Link className="nav-link text-white mb-3" to="/agent">
            <FaHome className="me-2" />
            Dashboard
          </Link>

          <Link
            className="nav-link text-white mb-3"
            to="/agent/tasks"
          >
            <FaTasks className="me-2" />
            My Tasks
          </Link>
            
          <Link
            className="nav-link text-white mb-3"
            to="/notifications"
          >
            <FaBell className="me-2" />
            Notifications
          </Link>
        </>
      )}

      {/* ---------------- CUSTOMER ---------------- */}
      {user?.role === "customer" && (
        <>
          <Link className="nav-link text-white mb-3" to="/dashboard">
            <FaHome className="me-2" />
            Dashboard
          </Link>

          <Link className="nav-link text-white mb-3" to="/complaint">
            <FaPlusCircle className="me-2" />
            New Complaint
          </Link>

          <Link className="nav-link text-white mb-3" to="/mycomplaints">
            <FaClipboardList className="me-2" />
            My Complaints
          </Link>

          <Link className="nav-link text-white mb-3" to="/agent/profile">
            <FaUser className="me-2" />
            Profile
          </Link>

          <Link className="nav-link text-white mb-3" to="/notifications">
            <FaBell className="me-2" />
            Notifications
          </Link>
        </>
      )}
      
<Link className="nav-link text-white mb-3" to="/feedback">
  ⭐ Feedback
</Link>

      <button
        className="btn btn-danger mt-5 w-100"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        <FaSignOutAlt className="me-2" />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;