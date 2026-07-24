import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import {
  FaArrowRight,
  FaClipboardCheck,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#0F172A,#1E3A8A,#2563EB)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">

          <div className="row align-items-center">

            {/* Left Side */}
            <div className="col-lg-6">

              <span className="badge bg-light text-primary px-3 py-2 mb-3">
                🚀 Smart Complaint Management
              </span>

              <h1
                className="fw-bold"
                style={{
                  fontSize: "55px",
                  lineHeight: "1.2",
                }}
              >
                Customer Registry &
                <br />
                Complaint Management System
              </h1>

              <p
                className="mt-4"
                style={{
                  fontSize: "20px",
                  color: "#E2E8F0",
                }}
              >
                A secure and intelligent platform to manage customer
                complaints, assign agents, monitor progress,
                generate reports and improve customer satisfaction.
              </p>

              <div className="mt-5">

                <Link
                  to="/login"
                  className="btn btn-light btn-lg px-4 me-3"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn btn-outline-light btn-lg px-4"
                >
                  Register
                  <FaArrowRight className="ms-2" />
                </Link>

              </div>

            </div>

            {/* Right Side */}
            <div className="col-lg-6 mt-5 mt-lg-0">

              <div
                className="card border-0 shadow-lg p-5"
                style={{
                  borderRadius: "25px",
                  background: "#fff",
                }}
              >

                <div className="row text-center g-4">

                  <div className="col-6">
                    <FaClipboardCheck
                      size={55}
                      color="#2563EB"
                    />
                    <h3 className="mt-3 fw-bold">500+</h3>
                    <p>Total Complaints</p>
                  </div>

                  <div className="col-6">
                    <FaUsers
                      size={55}
                      color="#10B981"
                    />
                    <h3 className="mt-3 fw-bold">250+</h3>
                    <p>Customers</p>
                  </div>

                  <div className="col-12">
                    <FaChartLine
                      size={60}
                      color="#F59E0B"
                    />
                    <h3 className="mt-3 fw-bold">
                      98% Resolution Rate
                    </h3>

                    <p className="text-muted">
                      Faster complaint resolution with real-time tracking.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Features */}
      <Features />
    </>
  );
}

export default Home;