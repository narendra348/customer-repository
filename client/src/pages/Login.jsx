import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserShield,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
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
        "https://customer-repository.onrender.com/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else if (res.data.user.role === "agent") {
        navigate("/agent");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
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

            <FaUserShield
              size={90}
              className="mb-4"
            />

            <h1 className="fw-bold display-4">
              Customer Registry
            </h1>

            <h2 className="fw-light">
              Complaint Management System
            </h2>

            <p
              className="mt-4"
              style={{
                maxWidth: "450px",
                color: "#CBD5E1",
              }}
            >
              Securely manage customer complaints,
              assign agents, monitor progress,
              generate reports and improve
              customer satisfaction.
            </p>

          </div>

        </div>

        {/* RIGHT */}

        <div className="col-lg-6 d-flex justify-content-center align-items-center">

          <div
            className="card border-0 shadow-lg p-5"
            style={{
              width: "430px",
              borderRadius: "25px",
            }}
          >

            <h2 className="fw-bold text-center mb-2">
              Welcome Back
            </h2>

            <p className="text-center text-muted mb-4">
              Login to continue
            </p>

            <form onSubmit={handleSubmit}>

              <div className="input-group mb-3">

                <span className="input-group-text">
                  <FaEnvelope />
                </span>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="input-group mb-4">

                <span className="input-group-text">
                  <FaLock />
                </span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  className="form-control"
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

              <button className="btn btn-primary w-100 btn-lg">

                Login

              </button>

            </form>

            <p className="text-center mt-4">

              Don't have an account?

              <Link
                to="/register"
                className="ms-2 fw-bold text-decoration-none"
              >
                Register
              </Link>

            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;