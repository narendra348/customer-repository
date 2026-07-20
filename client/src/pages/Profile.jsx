import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaEnvelope,
  FaUserTag,
  FaUser,
} from "react-icons/fa";

function Profile() {
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://https://customer-repository.onrender.com/api/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.user);

      setForm({
        name: res.data.user.name,
        email: res.data.user.email,
      });
    } catch (err) {
      console.log(err);
      alert("Failed to load profile");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:5000/api/profile",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile Updated Successfully");

      setUser(res.data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0F172A,#1E3A8A,#2563EB)",
        padding: "40px",
      }}
    >
      <div className="container">

        <div className="row justify-content-center">

          <div className="col-lg-7">

            <div
              className="card shadow-lg border-0"
              style={{
                borderRadius: "20px",
              }}
            >

              <div
                className="text-center text-white p-5"
                style={{
                  background:
                    "linear-gradient(135deg,#2563EB,#06B6D4)",
                }}
              >

                <FaUserCircle size={90} />

                <h2 className="mt-3">
                  {user?.name}
                </h2>

                <span className="badge bg-light text-primary px-4 py-2">
                  {user?.role?.toUpperCase()}
                </span>

              </div>

              <div className="card-body p-5">

                <div className="mb-4">

                  <label className="fw-bold mb-2">
                    <FaUser className="me-2" />
                    Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />

                </div>

                <div className="mb-4">

                  <label className="fw-bold mb-2">
                    <FaEnvelope className="me-2" />
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />

                </div>

                <div className="mb-4">

                  <label className="fw-bold mb-2">
                    <FaUserTag className="me-2" />
                    Role
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={user?.role || ""}
                    disabled
                  />

                </div>

                <button
                  className="btn btn-primary w-100"
                  onClick={updateProfile}
                >
                  Save Changes
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;