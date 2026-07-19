import { useEffect, useState } from "react";
import axios from "axios";
import { FaBell, FaUserCircle } from "react-icons/fa";

function Topbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const unread = res.data.notifications.filter(
        (item) => item.read === false
      );

      setCount(unread.length);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center bg-white shadow-sm px-4"
      style={{
        height: "70px",
        marginLeft: "250px",
      }}
    >
      <h3 className="fw-bold">
        {user?.role === "admin"
          ? "Admin Dashboard"
          : user?.role === "agent"
          ? "Agent Dashboard"
          : "Customer Dashboard"}
      </h3>

      <div className="d-flex align-items-center">

        <div className="position-relative me-4">

          <FaBell size={24} />

          {count > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              {count}
            </span>
          )}

        </div>

        <FaUserCircle size={35} className="me-2" />

        <span>{user?.name}</span>

      </div>
    </div>
  );
}

export default Topbar;