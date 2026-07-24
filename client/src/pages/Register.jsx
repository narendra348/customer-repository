import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserTag,
  FaEye,
  FaEyeSlash,
  FaUserPlus,
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
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
      const res = await axios.post(
        "https://customer-repository.onrender.com/api/auth/register",
        form
      );

      alert(res.data.message);

      navigate("/login");

    } catch (err) {

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert(err.message);
      }

    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0F172A,#1E3A8A,#2563EB)",
      }}
    >
      <div className="row min-vh-100">

        {/* LEFT */}

        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center">

          <div className="text-white">

            <FaUserPlus
              size={90}
              className="mb-4"
            />

            <h1 className="display-4 fw-bold">
              Join CRS
            </h1>

            <h3 className="fw-light">
              Customer Registry System
            </h3>

            <p
              className="mt-4"
              style={{
                maxWidth: "450px",
                color: "#CBD5E1",
              }}
            >
              Create your account to submit complaints,
              track complaint status,
              receive notifications,
              and communicate with administrators.
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="col-lg-6 d-flex justify-content-center align-items-center">

          <div
            className="card border-0 shadow-lg p-5"
            style={{
              width: "470px",
              borderRadius: "25px",
            }}
          >

            <h2 className="fw-bold text-center">
              Create Account
            </h2>

            <p className="text-center text-muted mb-4">
              Register to continue
            </p>

            <form onSubmit={handleSubmit}>

              <div className="input-group mb-3">

                <span className="input-group-text">
                  <FaUser />
                </span>

                <input
                  className="form-control"
                  placeholder="Full Name"
                  name="name"
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="input-group mb-3">

                <span className="input-group-text">
                  <FaEnvelope />
                </span>

                <input
                  className="form-control"
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="input-group mb-3">

                <span className="input-group-text">
                  <FaLock />
                </span>

                <input
                  className="form-control"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="btn btn-light border"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

              <div className="input-group mb-4">

                <span className="input-group-text">
                  <FaUserTag />
                </span>

                <select
                  className="form-select"
                  name="role"
                  onChange={handleChange}
                  defaultValue="customer"
                >
                  <option value="customer">
                    Customer
                  </option>

                  <option value="agent">
                    Agent
                  </option>

                </select>

              </div>

              <button
                className="btn btn-primary btn-lg w-100"
              >
                Create Account
              </button>

            </form>

            <p className="text-center mt-4">

              Already have an account?

              <Link
                to="/login"
                className="ms-2 fw-bold text-decoration-none"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;