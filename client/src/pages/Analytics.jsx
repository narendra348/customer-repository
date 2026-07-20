import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function Analytics() {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://https://customer-repository.onrender.com/api/dashboard/stats",
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

if (!stats) {
    return (
      <div className="text-center mt-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  const pieData = {
    labels: ["Pending", "In Progress", "Resolved"],
    datasets: [
      {
        label: "Complaints",
        data: [
          stats.pending,
          stats.inProgress,
          stats.resolved,
        ],
        backgroundColor: [
          "#FFC107",
          "#0DCAF0",
          "#198754",
        ],
      },
    ],
  };

  const barData = {
    labels: ["Customers", "Agents"],
    datasets: [
      {
        label: "Users",
        data: [
          stats.customers,
          stats.agents,
        ],
        backgroundColor: [
          "#0D6EFD",
          "#6C757D",
        ],
      },
    ],
  };

  const lineData = {
    labels: ["Pending", "In Progress", "Resolved"],
    datasets: [
      {
        label: "Complaint Status",
        data: [
          stats.pending,
          stats.inProgress,
          stats.resolved,
        ],
        borderColor: "#0D6EFD",
        backgroundColor: "#0D6EFD",
        fill: false,
      },
    ],
  };

  // ⬇️ AFTER THIS COMES return()

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
        Analytics Dashboard
      </h2>

      <div className="row">

        <div className="col-md-4 mb-4">

          <div className="card shadow border-0">

            <div className="card-body">

              <h5 className="text-center mb-3">
                Complaint Status
              </h5>

              <Pie data={pieData} />

            </div>

          </div>

        </div>

        <div className="col-md-4 mb-4">

          <div className="card shadow border-0">

            <div className="card-body">

              <h5 className="text-center mb-3">
                Users
              </h5>

              <Bar data={barData} />

            </div>

          </div>

        </div>

        <div className="col-md-4 mb-4">

          <div className="card shadow border-0">

            <div className="card-body">

              <h5 className="text-center mb-3">
                Complaint Trend
              </h5>

              <Line data={lineData} />

            </div>

          </div>

        </div>

      </div>
    </div>
  </>
);
}

export default Analytics;