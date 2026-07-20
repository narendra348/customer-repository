import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Link } from "react-router-dom";

function MyComplaints() {

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://https://customer-repository.onrender.com/api/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setComplaints(res.data.complaints);

    } catch (err) {

      alert(err.response?.data?.message);

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
          background: "#F5F7FB",
          minHeight: "100vh"
        }}
      >

        <h2 className="fw-bold mb-4">
          My Complaints
        </h2>

        <div className="card shadow border-0">

          <div className="card-body">

            <table className="table table-hover">

              <thead>

                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Details</th>
                </tr>

              </thead>

              <tbody>

                {
                  complaints.map((item) => (

                    <tr key={item._id}>

                      <td>{item.title}</td>

                      <td>{item.category}</td>

                      <td>

                        <span className={`badge
                        ${item.status==="Pending"
                        ?"bg-warning":
                        item.status==="Resolved"
                        ?"bg-success":
                        "bg-primary"}
                        `}>
                          {item.status}
                        </span>

                      </td>

                      <td>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td>
  <Link
    to={`/complaint/${item._id}`}
    className="btn btn-info btn-sm"
  >
    View Details
  </Link>
</td>

                    </tr>

                  ))
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </>
  );
}

export default MyComplaints;