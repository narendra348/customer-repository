import { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Reports() {

  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://customer-repository.onrender.com/api/reports",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReports(res.data.reports);

    } catch (err) {

      console.log(err);
      alert("Failed to load reports");

    }
  };
    // Search + Filter

  const filteredReports = reports.filter((item) => {

    const matchSearch =
      item.customer?.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      item.title
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchStatus =
      status === "All" ||
      item.status === status;

    return matchSearch && matchStatus;

  });

  // Export Excel

  const exportCSV = () => {

    let csv =
      "Customer,Complaint,Category,Status,Assigned Agent,Date\n";

    filteredReports.forEach((item) => {

      csv +=
        `${item.customer?.name},` +
        `${item.title},` +
        `${item.category},` +
        `${item.status},` +
        `${item.assignedTo?.name || "Not Assigned"},` +
        `${new Date(item.createdAt).toLocaleDateString()}\n`;

    });

    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    saveAs(blob, "Complaint_Report.csv");

  };

  // Export PDF

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "Customer Care Registry Report",
      14,
      20
    );

    autoTable(doc, {

      startY: 30,

      head: [[
        "Customer",
        "Complaint",
        "Category",
        "Status",
        "Assigned Agent",
        "Date"
      ]],

      body: filteredReports.map((item) => [

        item.customer?.name,

        item.title,

        item.category,

        item.status,

        item.assignedTo
          ? item.assignedTo.name
          : "Not Assigned",

        new Date(
          item.createdAt
        ).toLocaleDateString()

      ])

    });

    doc.save("Complaint_Report.pdf");

  };
    return (
    <>
      <Sidebar />
      <Topbar />

      <div
        style={{
          marginLeft: "250px",
          minHeight: "100vh",
          background: "#F4F7FC",
          padding: "30px",
        }}
      >
        <h2 className="fw-bold text-primary mb-4">
          Reports Dashboard
        </h2>

        <div className="card shadow border-0 rounded-4">

          <div className="card-body">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <h4 className="fw-bold">
                Complaint Reports
              </h4>

              <div>

                <button
                  className="btn btn-success me-2"
                  onClick={exportCSV}
                >
                  📊 Export Excel
                </button>

                <button
                  className="btn btn-danger"
                  onClick={exportPDF}
                >
                  📄 Export PDF
                </button>

              </div>

            </div>

            <div className="row mb-4">

              <div className="col-md-6">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Customer or Complaint..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

              <div className="col-md-3">

                <select
                  className="form-select"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                >
                  <option value="All">
                    All Status
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Resolved">
                    Resolved
                  </option>

                </select>

              </div>

            </div>

            <div className="table-responsive">

              <table className="table table-hover table-bordered align-middle">

                <thead className="table-primary">

                  <tr>

                    <th>#</th>
                    <th>Customer</th>
                    <th>Complaint</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Assigned Agent</th>
                    <th>Date</th>

                  </tr>

                </thead>

                <tbody>
                                    {filteredReports.length > 0 ? (

                    filteredReports.map((item, index) => (

                      <tr key={item._id}>

                        <td>{index + 1}</td>

                        <td>{item.customer?.name}</td>

                        <td>{item.title}</td>

                        <td>{item.category}</td>

                        <td>

                          <span
                            className={`badge ${
                              item.status === "Resolved"
                                ? "bg-success"
                                : item.status === "Pending"
                                ? "bg-warning text-dark"
                                : "bg-info text-dark"
                            }`}
                          >
                            {item.status}
                          </span>

                        </td>

                        <td>
                          {item.assignedTo
                            ? item.assignedTo.name
                            : "Not Assigned"}
                        </td>

                        <td>
                          {new Date(
                            item.createdAt
                          ).toLocaleDateString()}
                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="7"
                        className="text-center text-danger fw-bold"
                      >
                        No Reports Found
                      </td>

                    </tr>

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

export default Reports;