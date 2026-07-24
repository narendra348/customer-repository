import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar">

      <div className="container">

        <Link className="navbar-brand fw-bold fs-3" to="/">
          🚀 CRS
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarMenu"
        >

          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#features">
                Features
              </a>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>

          </ul>

          <div className="d-flex">

            <Link
              to="/register"
              className="btn btn-light rounded-pill px-4"
            >
              <FaUserCircle className="me-2" />
              Register
            </Link>

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;