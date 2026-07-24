import { Link, useLocation } from "react-router-dom";
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
  FaCommentDots,
} from "react-icons/fa";

function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  const activeStyle = {
    background: "#2563EB",
    color: "#fff",
    borderRadius: "12px",
  };

  const menuStyle = {
    color: "#CBD5E1",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 16px",
    marginBottom: "8px",
    borderRadius: "12px",
    transition: "0.3s",
  };

  return (
    <div
      className="sidebar"
      style={{
        width: "260px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        background: "#0F172A",
        padding: "20px",
        overflowY: "auto",
        boxShadow: "0 0 25px rgba(0,0,0,.25)",
        zIndex: 1000,
      }}
    >
      <div className="text-center mb-5">
        <h2 className="text-info fw-bold">CRS</h2>
        <small className="text-light">
          Complaint Management
        </small>
      </div>

      {/* ADMIN */}
      {user?.role === "admin" && (
        <>
          <Link
            to="/admin"
            style={{
              ...menuStyle,
              ...(location.pathname === "/admin" ? activeStyle : {}),
            }}
          >
            <FaHome /> Dashboard
          </Link>

          <Link
            to="/admin/complaints"
            style={{
              ...menuStyle,
              ...(location.pathname === "/admin/complaints"
                ? activeStyle
                : {}),
            }}
          >
            <FaClipboardList /> Complaints
          </Link>

          <Link
            to="/admin/agents"
            style={{
              ...menuStyle,
              ...(location.pathname === "/admin/agents"
                ? activeStyle
                : {}),
            }}
          >
            <FaUsers /> Agents
          </Link>

          <Link
            to="/reports"
            style={{
              ...menuStyle,
              ...(location.pathname === "/reports"
                ? activeStyle
                : {}),
            }}
          >
            <FaChartBar /> Reports
          </Link>

          <Link
            to="/analytics"
            style={{
              ...menuStyle,
              ...(location.pathname === "/analytics"
                ? activeStyle
                : {}),
            }}
          >
            <FaChartBar /> Analytics
          </Link>
        </>
      )}

      {/* AGENT */}
      {user?.role === "agent" && (
        <>
          <Link
            to="/agent"
            style={{
              ...menuStyle,
              ...(location.pathname === "/agent"
                ? activeStyle
                : {}),
            }}
          >
            <FaHome /> Dashboard
          </Link>

          <Link
            to="/agent/tasks"
            style={{
              ...menuStyle,
              ...(location.pathname === "/agent/tasks"
                ? activeStyle
                : {}),
            }}
          >
            <FaTasks /> My Tasks
          </Link>

          <Link
            to="/notifications"
            style={{
              ...menuStyle,
              ...(location.pathname === "/notifications"
                ? activeStyle
                : {}),
            }}
          >
            <FaBell /> Notifications
          </Link>
        </>
      )}

      {/* CUSTOMER */}
      {user?.role === "customer" && (
        <>
          <Link
            to="/dashboard"
            style={{
              ...menuStyle,
              ...(location.pathname === "/dashboard"
                ? activeStyle
                : {}),
            }}
          >
            <FaHome /> Dashboard
          </Link>

          <Link
            to="/complaint"
            style={{
              ...menuStyle,
              ...(location.pathname === "/complaint"
                ? activeStyle
                : {}),
            }}
          >
            <FaPlusCircle /> New Complaint
          </Link>

          <Link
            to="/mycomplaints"
            style={{
              ...menuStyle,
              ...(location.pathname === "/mycomplaints"
                ? activeStyle
                : {}),
            }}
          >
            <FaClipboardList /> My Complaints
          </Link>

          <Link
            to="/agent/profile"
            style={{
              ...menuStyle,
              ...(location.pathname === "/agent/profile"
                ? activeStyle
                : {}),
            }}
          >
            <FaUser /> Profile
          </Link>

          <Link
            to="/notifications"
            style={{
              ...menuStyle,
              ...(location.pathname === "/notifications"
                ? activeStyle
                : {}),
            }}
          >
            <FaBell /> Notifications
          </Link>
        </>
      )}

      <Link
        to="/feedback"
        style={{
          ...menuStyle,
          ...(location.pathname === "/feedback"
            ? activeStyle
            : {}),
        }}
      >
        <FaCommentDots /> Feedback
      </Link>

      <button
        className="btn btn-danger w-100 mt-5"
        style={{
          borderRadius: "12px",
        }}
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