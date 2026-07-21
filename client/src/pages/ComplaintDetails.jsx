import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);

  // Comments
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  // Feedback
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    fetchComplaint();
    fetchComments();
    fetchFeedback();
  }, []);

  // ==============================
  // Fetch Complaint
  // ==============================

  const fetchComplaint = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `https://customer-repository.onrender.com/api/complaints/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaint(res.data.complaint);
    } catch (err) {
      console.log(err);
      alert("Failed to load complaint");
    }
  };

  // ==============================
  // Fetch Comments
  // ==============================

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `https://customer-repository.onrender.com/api/comments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments(res.data.comments);
    } catch (err) {
      console.log(err);
    }
  };

  // ==============================
  // Add Comment
  // ==============================

  const addComment = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://customer-repository.onrender.com/api/comments",
        {
          complaintId: id,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("");

      fetchComments();

    } catch (err) {
      alert("Failed to add comment");
    }
  };

  // ==============================
  // Fetch Feedback
  // ==============================

  const fetchFeedback = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `https://customer-repository.onrender.com/api/feedback/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFeedbackList(res.data.feedback);

    } catch (err) {
      console.log(err);
    }
  };

  // ==============================
  // Submit Feedback
  // ==============================

  const submitFeedback = async () => {
    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "https://customer-repository.onrender.com/api/feedback",
        {
          complaintId: id,
          rating,
          message: feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Feedback Submitted Successfully");

      setRating(5);
      setFeedback("");

      fetchFeedback();

    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  if (!complaint) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading...</h3>
      </div>
    );
  }
    return (
    <div
      style={{
        background: "#F4F7FC",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <div className="container">

        <div className="card shadow-lg border-0 rounded-4">

          <div
            className="card-header text-white text-center"
            style={{
              background:
                "linear-gradient(135deg,#2563EB,#1D4ED8)",
            }}
          >
            <h2>Complaint Details</h2>
          </div>

          <div className="card-body">

            {/* Complaint Information */}

            <h4 className="text-primary mb-3">
              Complaint Information
            </h4>

            <table className="table table-bordered">

              <tbody>

                <tr>
                  <th width="220">Complaint ID</th>
                  <td>{complaint._id}</td>
                </tr>

                <tr>
                  <th>Title</th>
                  <td>{complaint.title}</td>
                </tr>

                <tr>
                  <th>Category</th>
                  <td>{complaint.category}</td>
                </tr>

                <tr>
                  <th>Description</th>
                  <td>{complaint.description}</td>
                </tr>

                <tr>
                  <th>Status</th>
                  <td>
                    <span
                      className={`badge ${
                        complaint.status === "Resolved"
                          ? "bg-success"
                          : complaint.status === "In Progress"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                </tr>

                <tr>
                  <th>Created At</th>
                  <td>
                    {new Date(
                      complaint.createdAt
                    ).toLocaleString()}
                  </td>
                </tr>

              </tbody>

            </table>

            <hr />

            {/* Customer Information */}

            <h4 className="text-primary mb-3">
              Customer Information
            </h4>

            <table className="table table-bordered">

              <tbody>

                <tr>
                  <th width="220">Customer Name</th>
                  <td>{complaint.customer?.name}</td>
                </tr>

                <tr>
                  <th>Email</th>
                  <td>{complaint.customer?.email}</td>
                </tr>

              </tbody>

            </table>

            <hr />

            {/* Assigned Agent */}

            <h4 className="text-primary mb-3">
              Assigned Agent
            </h4>

            <table className="table table-bordered">

              <tbody>

                <tr>
                  <th width="220">Agent Name</th>

                  <td>
                    {complaint.assignedTo
                      ? complaint.assignedTo.name
                      : "Not Assigned"}
                  </td>

                </tr>

                <tr>

                  <th>Email</th>

                  <td>
                    {complaint.assignedTo
                      ? complaint.assignedTo.email
                      : "-"}
                  </td>

                </tr>

              </tbody>

            </table>

            <hr />

            {/* Complaint Progress */}

            <h4 className="text-primary mb-3">
              Complaint Progress
            </h4>

            <ul className="list-group">

              <li className="list-group-item">
                ✅ Complaint Registered
              </li>

              <li className="list-group-item">
                {complaint.assignedTo
                  ? "✅ Assigned to Agent"
                  : "❌ Not Assigned"}
              </li>

              <li className="list-group-item">
                {complaint.status === "Pending"
                  ? "⏳ Waiting for Agent"
                  : "✅ In Progress"}
              </li>

              <li className="list-group-item">
                {complaint.status === "Resolved"
                  ? "🎉 Complaint Resolved"
                  : "❌ Not Resolved"}
              </li>

            </ul>

            <hr />

            {/* Comments */}

            <h4 className="text-primary mb-3">
              Comments
            </h4>

            <textarea
              className="form-control"
              rows="3"
              placeholder="Write a comment..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
            ></textarea>

            <button
              className="btn btn-primary mt-3"
              onClick={addComment}
            >
              Send Comment
            </button>

            <div className="mt-4">

              {comments.length > 0 ? (

                comments.map((item) => (

                  <div
                    key={item._id}
                    className="card shadow-sm mb-3"
                  >
                    <div className="card-body">

                      <h6 className="fw-bold">
                        {item.user?.name}
                      </h6>

                      <p className="mb-1">
                        {item.message}
                      </p>

                      <small className="text-muted">
                        {new Date(
                          item.createdAt
                        ).toLocaleString()}
                      </small>

                    </div>

                  </div>

                ))

              ) : (

                <p className="text-muted">
                  No comments yet.
                </p>

              )}

            </div>

            <hr />

                          {/* Customer Feedback */}

            <h4 className="text-primary mb-3">
              Customer Feedback
            </h4>

            <select
              className="form-select mb-3"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
              <option value={4}>⭐⭐⭐⭐ Very Good</option>
              <option value={3}>⭐⭐⭐ Good</option>
              <option value={2}>⭐⭐ Fair</option>
              <option value={1}>⭐ Poor</option>
            </select>

            <textarea
              className="form-control"
              rows="3"
              placeholder="Write your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>

            <button
              className="btn btn-success mt-3"
              onClick={submitFeedback}
            >
              Submit Feedback
            </button>

            <hr />

            {/* Previous Feedback */}

            <h4 className="text-primary mb-3">
              Previous Feedback
            </h4>

            {feedbackList.length > 0 ? (
              feedbackList.map((item) => (
                <div
                  key={item._id}
                  className="card shadow-sm mb-3 border-0"
                >
                  <div className="card-body">

                    <div className="d-flex justify-content-between">

                      <h6 className="fw-bold">
                        {item.customer?.name}
                      </h6>

                      <span className="badge bg-warning text-dark">
                        ⭐ {item.rating}/5
                      </span>

                    </div>

                    <p className="mt-2">
                      {item.message}
                    </p>

                    <small className="text-muted">
                      {new Date(item.createdAt).toLocaleString()}
                    </small>

                  </div>
                </div>
              ))
            ) : (
              <div className="alert alert-info">
                No feedback available.
              </div>
            )}

            <hr />

            {/* Buttons */}

            <div className="text-center mt-4">

              <button
                className="btn btn-secondary me-3"
                onClick={() => navigate(-1)}
              >
                ← Back
              </button>

              <button
                className="btn btn-success"
                onClick={() => window.print()}
              >
                🖨 Print
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetails;