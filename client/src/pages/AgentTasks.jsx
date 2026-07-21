import { useEffect, useState } from "react";
import axios from "axios";

function AgentTasks() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");

  // Load complaints when page opens
  useEffect(() => {
    fetchComplaints();
  }, []);

  // Fetch complaints
  const fetchComplaints = async () => {
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

      setComplaints(res.data.complaints);
    } catch (err) {
      console.log(err);
      alert("Failed to load complaints");
    }
  };

  // Update complaint status
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://customer-repository.onrender.com/api/agent/update/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Complaint Updated Successfully");

      fetchComplaints();
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <div
      className="container-fluid py-4"
      style={{ background: "#f5f7fb", minHeight: "100vh" }}
    >
      <h2 className="fw-bold mb-4">📋 Agent Complaint Dashboard</h2>

      {/* Dashboard Cards */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow border-0 rounded-4 text-center p-4">
            <h2 className="text-primary">{complaints.length}</h2>
            <p>Total Complaints</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 rounded-4 text-center p-4">
            <h2 className="text-warning">
              {
                complaints.filter((c) => c.status === "Pending").length
              }
            </h2>
            <p>Pending</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow border-0 rounded-4 text-center p-4">
            <h2 className="text-success">
              {
                complaints.filter((c) => c.status === "Resolved").length
              }
            </h2>
            <p>Resolved</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="card shadow border-0 rounded-4 mb-4">
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search Complaint by Title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Complaint Table */}
      <div className="card shadow border-0 rounded-4">
        <div className="card-body">

          <table className="table table-hover align-middle">

            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>

            <tbody>

              {complaints.length > 0 ? (

                complaints
                  .filter((item) =>
                    item.title
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  )
                  .map((item) => (

                    <tr key={item._id}>

                      <td>{item.title}</td>

                      <td>{item.category}</td>

                      <td>
                        <span
                          className={
                            item.status === "Resolved"
                              ? "badge bg-success"
                              : item.status === "Pending"
                              ? "badge bg-warning text-dark"
                              : "badge bg-primary"
                          }
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>
                        <select
                          className="form-select"
                          value={item.status}
                          onChange={(e) =>
                            updateStatus(item._id, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">
                            In Progress
                          </option>
                          <option value="Resolved">
                            Resolved
                          </option>
                        </select>
                      </td>

                    </tr>

                  ))

              ) : (

                <tr>
                  <td colSpan="4" className="text-center">
                    No Complaints Found
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}

export default AgentTasks;