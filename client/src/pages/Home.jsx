import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Features from "../components/Features";

function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div
  className="d-flex justify-content-center align-items-center"
  style={{
    minHeight: "90vh",
    background:
      "linear-gradient(135deg,#4f46e5,#2563eb,#06b6d4)",
  }}

      >
        <div className="text-center text-white">
          <h1 className="display-3 fw-bold">
            Customer Registry System
          </h1>

          <p className="lead mt-3">
            Manage Customer Complaints Quickly & Efficiently
          </p>

          <div className="mt-4">
            <Link to="/login" className="btn btn-primary btn-lg me-3">
              Login
            </Link>

            <Link to="/register" className="btn btn-outline-light btn-lg">
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <Features />
    </>
  );
}

export default Home;