import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AdminDashboard() {

  const [complaints, setComplaints] = useState([]);
  const [agents, setAgents] = useState([]);

  const [stats, setStats] = useState({
  totalComplaints: 0,
  pending: 0,
  inProgress: 0,
  resolved: 0,
  customers: 0,
  agents: 0,
});

  useEffect(() => {
  fetchDashboardStats();
  fetchComplaints();
  fetchAgents();
}, []);

const fetchDashboardStats = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://customer-repository.onrender.com/api/dashboard/stats",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setStats(res.data.stats);

  } catch (err) {
    console.log(err);
  }
};

  // Get all complaints
  const fetchComplaints = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://customer-repository.onrender.com/api/admin/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(res.data.complaints);

    } catch (err) {
      console.log(err);
    }
  };

  // Get all agents
  const fetchAgents = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://customer-repository.onrender.com/api/admin/agents",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAgents(res.data.agents);

    } catch (err) {
      console.log(err);
    }
  };

  // Assign complaint
  const assignComplaint = async (complaintId, agentId) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `https://customer-repository.onrender.com/api/admin/assign/${complaintId}`,
        { agentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Complaint Assigned Successfully");

      fetchComplaints();

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
          background: "#F4F7FC",
          minHeight: "100vh",
        }}
      >

        <h2 className="fw-bold mb-4">
          Admin Dashboard
        </h2>
        <div className="row mb-4">

  <div className="col-md-4 mb-3">
    <div className="card shadow border-0 bg-primary text-white">
      <div className="card-body text-center">
        <h5>Total Complaints</h5>
        <h2>{stats.totalComplaints}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-4 mb-3">
    <div className="card shadow border-0 bg-warning text-white">
      <div className="card-body text-center">
        <h5>Pending</h5>
        <h2>{stats.pending}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-4 mb-3">
    <div className="card shadow border-0 bg-info text-white">
      <div className="card-body text-center">
        <h5>In Progress</h5>
        <h2>{stats.inProgress}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-4 mb-3">
    <div className="card shadow border-0 bg-success text-white">
      <div className="card-body text-center">
        <h5>Resolved</h5>
        <h2>{stats.resolved}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-4 mb-3">
    <div className="card shadow border-0 bg-dark text-white">
      <div className="card-body text-center">
        <h5>Customers</h5>
        <h2>{stats.customers}</h2>
      </div>
    </div>
  </div>

  <div className="col-md-4 mb-3">
    <div className="card shadow border-0 bg-secondary text-white">
      <div className="card-body text-center">
        <h5>Agents</h5>
        <h2>{stats.agents}</h2>
      </div>
    </div>
  </div>

</div>
        <div className="card shadow border-0">

          <div className="card-body">

            <table className="table table-hover">

              <thead>

                <tr>
                  <th>Complaint ID</th>
                  <th>Customer</th>
                  <th>Complaint</th>
                  <th>Status</th>
                  <th>Assign Agent</th>
                  
                </tr>

              </thead>

              <tbody>

                {complaints.map((item) => (

                  <tr key={item._id}>

                        <td>{item._id}</td>

                    <td>{item.customer.name}</td>

                    <td>{item.title}</td>

                    <td>{item.status}</td>

                    <td>

                      <select
                        className="form-select"
                        onChange={(e) =>
                          assignComplaint(item._id, e.target.value)
                        }
                      >
                        <option>Select Agent</option>

                        {agents.map((agent) => (
                          <option
                            key={agent._id}
                            value={agent._id}
                          >
                            {agent.name}
                          </option>
                        ))}

                      </select>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </>
  );
}

export default AdminDashboard;