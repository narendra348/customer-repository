import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const navigate = useNavigate(); 

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
      "http://localhost:5000/api/auth/register",
      form
    );

    alert(res.data.message);

    navigate("/login");

  } catch (err) {
  console.log(err);

  if (err.response) {
    console.log(err.response.data);
    alert(err.response.data.message);
  } else {
    alert(err.message);
  }
}
};

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0F172A,#1E3A8A,#2563EB)",
      }}
    >
      <div
        className="card shadow-lg p-5"
        style={{
          width: "430px",
          borderRadius: "20px",
        }}
      >
        <h2 className="text-center mb-4 fw-bold">
          Register
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Full Name"
            name="name"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />

          <select
            className="form-select mb-4"
            name="role"
            onChange={handleChange}
          >
            <option value="customer">Customer</option>
            <option value="agent">Agent</option>
          </select>

          <button className="btn btn-primary w-100">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;