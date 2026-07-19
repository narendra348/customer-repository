import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AdminAgents() {
  const [agents, setAgents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAgents();
  }, []);

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

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Sidebar />
      <Topbar />

      <div
        style={{
          marginLeft: "250px",
          padding: "30px",
          minHeight: "100vh",
          background: "#F4F7FC",
        }}
      >
        <h2 className="fw-bold text-primary mb-4">
          Agent Management
        </h2>

        {/* Cards */}

        <div className="row mb-4">

          <div className="col-md-4">
            <div className="card shadow border-0 rounded-4">
              <div className="card-body text-center">
                <h2 className="text-primary">
                  {agents.length}
                </h2>
                <p>Total Agents</p>
              </div>
            </div>
          </div>

        </div>

        {/* Search */}

        <div className="card shadow border-0 rounded-4 mb-4">

          <div className="card-body">

            <input
              className="form-control"
              placeholder="Search Agent..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

        </div>

        {/* Table */}

        <div className="card shadow border-0 rounded-4">

          <div className="card-body">

            <div className="table-responsive">

              <table className="table table-hover">

                <thead className="table-primary">

<tr>

<th>#</th>

<th>Name</th>

<th>Email</th>

<th>Role</th>

<th>Assigned Complaints</th>

</tr>



                </thead>

                <tbody>

                  {filteredAgents.length > 0 ? (

                    filteredAgents.map((agent, index) => (

                      <tr key={agent._id}>

                        <td>{index + 1}</td>

                        <td>{agent.name}</td>

                        <td>{agent.email}</td>

                        <td>
                          <span className="badge bg-success">
                            {agent.role}
                          </span>
                        </td>
                        <td>
                            <span className="badge bg-primary">
                            {agent.totalComplaints}
                        </span>
                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="5"
                        className="text-center text-danger"
                      >
                        No Agents Found
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

export default AdminAgents;