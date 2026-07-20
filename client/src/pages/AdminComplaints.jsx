import { useEffect, useState } from "react";
import axios from "axios";

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedAgents, setSelectedAgents] = useState({});

  useEffect(() => {
    fetchComplaints();
    fetchAgents();
  }, []);

  // Fetch all complaints
  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/admin/complaints",
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

  // Fetch all agents
  const fetchAgents = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/admin/agents",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAgents(res.data.agents);
    } catch (err) {
      console.log(err);
      alert("Failed to load agents");
    }
  };

  // Assign agent
  const assignAgent = async (complaintId) => {
    try {
      const token = localStorage.getItem("token");

      const agentId = selectedAgents[complaintId];

      if (!agentId) {
        alert("Please select an agent");
        return;
      }

      await axios.put(
        `https://customer-repository.onrender.com/api/admin/assign/${complaintId}`,
        {
          agentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Agent Assigned Successfully");

      fetchComplaints();
    } catch (err) {
      console.log(err);
      alert("Assignment Failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4 text-center">
        Admin Complaint Management
      </h2>

      <table className="table table-bordered table-hover shadow">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Customer</th>
            <th>Category</th>
            <th>Status</th>
            <th>Assigned Agent</th>
            <th>Assign New Agent</th>
          </tr>
        </thead>

        <tbody>
          {complaints.length > 0 ? (
            complaints.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>

                <td>{item.customer?.name}</td>

                <td>{item.category}</td>

                <td>{item.status}</td>

                <td>
                  {item.assignedTo
                    ? item.assignedTo.name
                    : "Not Assigned"}
                </td>

                <td>
                  <select
                    className="form-select mb-2"
                    value={selectedAgents[item._id] || ""}
                    onChange={(e) =>
                      setSelectedAgents({
                        ...selectedAgents,
                        [item._id]: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Agent</option>

                    {agents.map((agent) => (
                      <option
                        key={agent._id}
                        value={agent._id}
                      >
                        {agent.name}
                      </option>
                    ))}
                  </select>

                  <button
                    className="btn btn-primary btn-sm w-100"
                    onClick={() => assignAgent(item._id)}
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No Complaints Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminComplaints;