import { useEffect, useState } from "react";
import axios from "axios";
import { FaBell, FaCheckCircle } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Notification() {
  const [notifications, setNotifications] = useState([]);

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

      setNotifications(res.data.notifications);
    } catch (err) {
      console.log(err);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://https://customer-repository.onrender.com/api/notifications/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchNotifications();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Sidebar />
      <Topbar />

      <div
        style={{
          marginLeft: "250px",
          padding: "30px",
          minHeight: "100vh",
          background: "#F4F7FC",
        }}
      >
        <h2 className="fw-bold text-primary mb-4">
          🔔 Notifications
        </h2>

        {notifications.length === 0 ? (
          <div className="alert alert-info shadow">
            No Notifications Available
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item._id}
              className={`card shadow border-0 rounded-4 mb-3 ${
                item.read ? "" : "border-start border-5 border-primary"
              }`}
            >
              <div className="card-body">

                <div className="d-flex justify-content-between">

                  <div>

                    <h5 className="fw-bold">
                      <FaBell className="text-warning me-2" />
                      {item.title}
                    </h5>

                    <p className="text-muted mb-2">
                      {item.message}
                    </p>

                    <small className="text-secondary">
                      {new Date(item.createdAt).toLocaleString()}
                    </small>

                  </div>

                  {!item.read && (
                    <button
                      className="btn btn-success"
                      onClick={() => markAsRead(item._id)}
                    >
                      <FaCheckCircle className="me-2" />
                      Mark as Read
                    </button>
                  )}

                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Notification;