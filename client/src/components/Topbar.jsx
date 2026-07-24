import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBell,
  FaUserCircle,
  FaSearch,
  FaBars,
} from "react-icons/fa";

function Topbar({ isOpen, setIsOpen }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://customer-repository.onrender.com/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const unread = res.data.notifications.filter(
        (item) => !item.read
      );

      setCount(unread.length);

    } catch (err) {
      console.log(err);
    }
  };

  const title =
    user?.role === "admin"
      ? "Admin Dashboard"
      : user?.role === "agent"
      ? "Agent Dashboard"
      : "Customer Dashboard";

  return (
   <div
  className="topbar d-flex justify-content-between align-items-center px-4 py-3 bg-white shadow-sm"
      style={{
  minHeight: "75px",
  position: "sticky",
  top: 0,
  zIndex: 999,
}}
    >
      {/* Left */}
      <div className="d-flex align-items-center">

        <button
          className="btn btn-light me-3 d-lg-none"
        >
          <FaBars />
        </button>

        <div>
          <h4 className="fw-bold mb-0">
            {title}
          </h4>

          <small className="text-muted">
            Welcome back, {user?.name}
          </small>
        </div>

      </div>

      {/* Center */}
      <div
        className="d-none d-md-flex align-items-center"
        style={{
          width: "350px",
        }}
      >
        <div className="input-group">

          <span className="input-group-text bg-white">
            <FaSearch />
          </span>

          <input
            className="form-control"
            placeholder="Search..."
          />

        </div>
      </div>

      {/* Right */}
      <div className="d-flex align-items-center">

        <div
          className="position-relative me-4"
          style={{
            cursor: "pointer",
          }}
        >
          <FaBell
            size={22}
            color="#2563EB"
          />

          {count > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              {count}
            </span>
          )}
        </div>

        <FaUserCircle
          size={42}
          color="#2563EB"
        />

        <div className="ms-2 d-none d-md-block">

          <div className="fw-bold">
            {user?.name}
          </div>

          <small className="text-muted text-capitalize">
            {user?.role}
          </small>

        </div>

      </div>
    </div>
  );
}

export default Topbar;