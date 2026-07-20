import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Feedback() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchResolvedComplaints();
  }, []);

  const fetchResolvedComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resolved = res.data.complaints.filter(
        (item) => item.status === "Resolved"
      );

      setComplaints(resolved);

    } catch (err) {
      console.log(err);
    }
  };

  const submitFeedback = async (id, rating) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://customer-repository.onrender.com/api/feedback",
        {
          complaintId: id,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Feedback Submitted");

    } catch (err) {
      alert(err.response?.data?.message || "Error");
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
          background: "#F4F7FC",
          minHeight: "100vh",
        }}
      >
        <h2 className="fw-bold text-primary mb-4">
          ⭐ Feedback
        </h2>

        {complaints.map((item) => (
          <div
            key={item._id}
            className="card shadow border-0 rounded-4 mb-3"
          >
            <div className="card-body">

              <h5>{item.title}</h5>

              <p>{item.description}</p>

              <div className="mt-3">

                <button
                  className="btn btn-outline-warning me-2"
                  onClick={() => submitFeedback(item._id, 1)}
                >
                  ⭐1
                </button>

                <button
                  className="btn btn-outline-warning me-2"
                  onClick={() => submitFeedback(item._id, 2)}
                >
                  ⭐2
                </button>

                <button
                  className="btn btn-outline-warning me-2"
                  onClick={() => submitFeedback(item._id, 3)}
                >
                  ⭐3
                </button>

                <button
                  className="btn btn-outline-warning me-2"
                  onClick={() => submitFeedback(item._id, 4)}
                >
                  ⭐4
                </button>

                <button
                  className="btn btn-warning"
                  onClick={() => submitFeedback(item._id, 5)}
                >
                  ⭐5
                </button>

              </div>

            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Feedback;