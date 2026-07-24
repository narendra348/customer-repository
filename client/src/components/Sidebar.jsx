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

function Sidebar({ isOpen, setIsOpen }) {
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
    top: 0,
    left:
      window.innerWidth <= 768
        ? isOpen
          ? "0"
          : "-260px"
        : "0",
    background: "#0F172A",
    padding: "20px",
    overflowY: "auto",
    boxShadow: "0 0 25px rgba(0,0,0,.25)",
    zIndex: 1000,
    transition: "left 0.3s ease",
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
  onClick={() => {
    if (window.innerWidth <= 768) setIsOpen(false);
  }}
  style={{
    ...menuStyle,
    ...(location.pathname === "/admin" ? activeStyle : {}),
  }}
>
            <FaHome /> Dashboard
          </Link>

          <Link
  to="/admin/complaints"
  onClick={() => {
    if (window.innerWidth <= 768) setIsOpen(false);
  }}
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
            onClick={() => {
    if (window.innerWidth <= 768) setIsOpen(false);
  }}
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
            onClick={() => {
    if (window.innerWidth <= 768) setIsOpen(false);
  }}
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
            onClick={() => {
    if (window.innerWidth <= 768) setIsOpen(false);
  }}
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
            onClick={() => {
    if (window.innerWidth <= 768) setIsOpen(false);
  }}
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
            onClick={() => {
    if (window.innerWidth <= 768) setIsOpen(false);
  }}
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
            onClick={() => {
    if (window.innerWidth <= 768) setIsOpen(false);
  }}
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
            onClick={() => {
    if (window.innerWidth <= 768) setIsOpen(false);
  }}
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
            onClick={() => {
    if (window.innerWidth <= 768) setIsOpen(false);
  }}
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
            onClick={() => {
    if (window.innerWidth <= 768) setIsOpen(false);
  }}
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
            onClick={() => {
    if (window.innerWidth <= 768) setIsOpen(false);
  }}
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
            onClick={() => {
    if (window.innerWidth <= 768) setIsOpen(false);
  }}
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
        onClick={() => {
    if (window.innerWidth <= 768) setIsOpen(false);
  }}
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