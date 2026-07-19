import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Complaint() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/complaints",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      setForm({
        title: "",
        description: "",
        category: "",
      });

    } catch (err) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <>
      <Sidebar />
      <Topbar />

      <div
        style={{
          marginLeft: "250px",
          padding: "35px",
          background: "#F5F7FB",
          minHeight: "100vh",
        }}
      >
        <div
          className="card shadow border-0"
          style={{ borderRadius: "20px" }}
        >
          <div className="card-body p-5">

            <h2 className="fw-bold mb-4">
              Submit New Complaint
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">
                  Complaint Title
                </label>

                <input
                  className="form-control"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter complaint title"
                />
              </div>

              <div className="mb-3">

                <label className="form-label">
                  Category
                </label>

                <select
                  className="form-select"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option>Network</option>
                  <option>Hardware</option>
                  <option>Software</option>
                  <option>Other</option>
                </select>

              </div>

              <div className="mb-4">

                <label className="form-label">
                  Description
                </label>

                <textarea
                  rows="5"
                  className="form-control"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your complaint..."
                ></textarea>

              </div>

              <button className="btn btn-primary btn-lg">
                Submit Complaint
              </button>

            </form>

          </div>
        </div>
      </div>
    </>
  );
}

export default Complaint;