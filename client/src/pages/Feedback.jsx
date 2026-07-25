import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Feedback() {
  const [complaints, setComplaints] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchResolvedComplaints();
  }, []);

  const fetchResolvedComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://customer-repository.onrender.com/api/complaints",
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