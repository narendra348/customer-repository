import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaEye,
  FaClipboardList,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

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
      alert(err.response?.data?.message);
    }
  };

  const filteredComplaints = complaints.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Sidebar />
      <Topbar />

      <div
  className="main-content"
  style={{
    marginLeft: "260px",
    width: "calc(100% - 260px)",
    padding: "30px",
    minHeight: "100vh",
  }}
>

        {/* Header */}

        <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

          <div>
            <h2 className="fw-bold">
              My Complaints
            </h2>

            <p className="text-muted">
              Track all your submitted complaints.
            </p>
          </div>

          <div
            className="input-group shadow"
            style={{
              maxWidth: "340px",
              borderRadius: "30px",
              overflow: "hidden",
            }}
          >
            <span className="input-group-text bg-white border-0">
              <FaSearch />
            </span>

            <input
              className="form-control border-0"
              placeholder="Search complaint..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

        </div>
{/* Summary Cards */}

<div className="row g-4 mb-5">

  {/* Total Complaints */}
  <div className="col-lg-4 col-md-6">
    <div
      className="card border-0 shadow-lg rounded-4 p-4"
      style={{
        height: "180px",
        background: "linear-gradient(135deg,#2563EB,#4F46E5)",
        color: "white",
      }}
    >
      <div
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "18px",
          background: "rgba(255,255,255,.20)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FaClipboardList size={32} />
      </div>

      <h1 className="fw-bold mt-3">
        {complaints.length}
      </h1>

      <h5>Total Complaints</h5>
    </div>
  </div>

  {/* Pending */}
  <div className="col-lg-4 col-md-6">
    <div
      className="card border-0 shadow-lg rounded-4 p-4"
      style={{
        height: "180px",
        background: "linear-gradient(135deg,#F59E0B,#F97316)",
        color: "white",
      }}
    >
      <div
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "18px",
          background: "rgba(255,255,255,.20)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FaClock size={32} />
      </div>

      <h1 className="fw-bold mt-3">
        {complaints.filter(c => c.status === "Pending").length}
      </h1>

      <h5>Pending</h5>
    </div>
  </div>

  {/* Resolved */}
  <div className="col-lg-4 col-md-6">
    <div
      className="card border-0 shadow-lg rounded-4 p-4"
      style={{
        height: "180px",
        background: "linear-gradient(135deg,#10B981,#14B8A6)",
        color: "white",
      }}
    >
      <div
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "18px",
          background: "rgba(255,255,255,.20)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FaCheckCircle size={32} />
      </div>

      <h1 className="fw-bold mt-3">
        {complaints.filter(c => c.status === "Resolved").length}
      </h1>

      <h5>Resolved</h5>
    </div>
  </div>

</div>
        {/* Complaint Table */}

        <div
          className="card border-0 shadow-lg"
          style={{
            borderRadius: "25px",
          }}
        >

          <div className="card-body p-4">

            <h4 className="fw-bold mb-4">
              Complaint History
            </h4>

            <div className="table-responsive">

              <table className="table align-middle table-hover">

                <thead className="table-primary">

                  <tr>

                    <th>Title</th>

                    <th>Category</th>

                    <th>Status</th>

                    <th>Date</th>

                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {filteredComplaints.length === 0 ? (

                    <tr>

                      <td
                        colSpan="5"
                        className="text-center py-5"
                      >
                        No complaints found.
                      </td>

                    </tr>

                  ) : (

                    filteredComplaints.map((item) => (

                      <tr key={item._id}>

                        <td className="fw-semibold">
                          {item.title}
                        </td>

                        <td>{item.category}</td>

                        <td>

                          <span
                            className={`badge rounded-pill px-3 py-2 ${
                              item.status === "Pending"
                                ? "bg-warning text-dark"
                                : item.status === "Resolved"
                                ? "bg-success"
                                : "bg-primary"
                            }`}
                          >
                            {item.status}
                          </span>

                        </td>

                        <td>
                          {new Date(
                            item.createdAt
                          ).toLocaleDateString()}
                        </td>

                        <td>

                          <Link
                            to={`/complaint/${item._id}`}
                            className="btn btn-outline-primary rounded-pill px-3"
                          >
                            <FaEye className="me-2" />
                            View
                          </Link>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default MyComplaints;