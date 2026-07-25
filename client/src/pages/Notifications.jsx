import { useEffect, useState } from "react";
import axios from "axios";
import { FaBell, FaCheckCircle } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Notification() {
  const [notifications, setNotifications] = useState([]);
const [isOpen, setIsOpen] = useState(false);
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

      setNotifications(res.data.notifications);
    } catch (err) {
      console.log(err);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://customer-repository.onrender.com/api/notifications/${id}`,
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
     <Sidebar
  isOpen={isOpen}
  setIsOpen={setIsOpen}
/>

<Topbar
  isOpen={isOpen}
  setIsOpen={setIsOpen}
/>

      <div
       style={{
  marginLeft: window.innerWidth > 768 ? "260px" : "0",
  marginTop: "80px",
  width: window.innerWidth > 768 ? "calc(100% - 260px)" : "100%",
  padding: window.innerWidth > 768 ? "30px" : "15px",
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