import { useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  FaClipboardList,
  FaTag,
  FaAlignLeft,
  FaPaperPlane,
  FaHeadset,
  FaShieldAlt,
  FaBolt,
} from "react-icons/fa";

function Complaint() {
  const [form, setForm] =useState({
    title:"",
    description:"",
    category:"",
  });

  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value,
    });
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{

      const token=localStorage.getItem("token");

      const res=await axios.post(
        "https://customer-repository.onrender.com/api/complaints",
        form,
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      setForm({
        title:"",
        description:"",
        category:"",
      });

    }catch(err){
      alert(err.response?.data?.message||"Submission Failed");
    }
  };

  return(
    <>
      <Sidebar/>
      <Topbar/>

      <div
        className="main-content"
        style={{
          marginLeft:"250px",
          padding:"30px",
          background:"#F4F7FC",
          minHeight:"100vh",
        }}
      >

        <div className="mb-4">

          <h2 className="fw-bold display-6">
            Submit New Complaint
          </h2>

          <p className="text-muted">
            Register your issue and track its status in real time.
          </p>

        </div>

        <div className="row g-4">

          {/* Left Card */}

          <div className="col-lg-4">

            <div
              className="card border-0 shadow-lg h-100"
              style={{
                borderRadius:"30px",
                background:"linear-gradient(135deg,#2563EB,#4F46E5)",
                color:"white",
              }}
            >

              <div className="card-body p-5">

                <div
                  className="bg-white text-primary rounded-circle d-flex justify-content-center align-items-center"
                  style={{
                    width:"90px",
                    height:"90px",
                  }}
                >
                  <FaClipboardList size={40}/>
                </div>

                <h2 className="fw-bold mt-4">
                  Customer Support
                </h2>

                <p className="mt-3">
                  Our support team is always ready to help you.
                  Submit your complaint and monitor the progress until it is resolved.
                </p>

                <hr className="border-light"/>

                <div className="mt-4">

                  <div className="d-flex align-items-center mb-3">
                    <FaHeadset size={24}/>
                    <span className="ms-3">
                      24/7 Customer Support
                    </span>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <FaBolt size={24}/>
                    <span className="ms-3">
                      Fast Resolution
                    </span>
                  </div>

                  <div className="d-flex align-items-center">
                    <FaShieldAlt size={24}/>
                    <span className="ms-3">
                      Secure Complaint Tracking
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Right Card */}

          <div className="col-lg-8">

            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius:"30px",
              }}
            >

              <div className="card-body p-5">

                <h3 className="fw-bold">
                  Complaint Details
                </h3>

                <p className="text-muted mb-4">
                  Fill in the details below.
                </p>

                <form onSubmit={handleSubmit}>

                  <label className="fw-semibold mb-2">
                    Complaint Title
                  </label>

                  <div className="input-group mb-4">

                    <span className="input-group-text bg-primary text-white">
                      <FaClipboardList/>
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter complaint title"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <label className="fw-semibold mb-2">
                    Category
                  </label>

                  <div className="input-group mb-4">

                    <span className="input-group-text bg-primary text-white">
                      <FaTag/>
                    </span>

                    <select
                      className="form-select"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select Category
                      </option>

                      <option>Network</option>

                      <option>Hardware</option>

                      <option>Software</option>

                      <option>Other</option>

                    </select>

                  </div>

                  <label className="fw-semibold mb-2">
                    Description
                  </label>

                  <div className="input-group mb-4">

                    <span className="input-group-text bg-primary text-white">
                      <FaAlignLeft/>
                    </span>

                    <textarea
                      rows="6"
                      className="form-control"
                      placeholder="Describe your issue..."
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <button
                    className="btn btn-primary btn-lg rounded-pill px-5"
                  >
                    <FaPaperPlane className="me-2"/>
                    Submit Complaint
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Cards */}

        <div className="row mt-5">

          <div className="col-md-4 mb-4">

            <div className="card border-0 shadow-sm p-4 text-center">

              <h1>⚡</h1>

              <h5 className="fw-bold">
                Quick Response
              </h5>

              <p className="text-muted">
                Average response within 24 hours.
              </p>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="card border-0 shadow-sm p-4 text-center">

              <h1>📍</h1>

              <h5 className="fw-bold">
                Live Tracking
              </h5>

              <p className="text-muted">
                Track complaint progress anytime.
              </p>

            </div>

          </div>

          <div className="col-md-4 mb-4">

            <div className="card border-0 shadow-sm p-4 text-center">

              <h1>🔒</h1>

              <h5 className="fw-bold">
                Secure Platform
              </h5>

              <p className="text-muted">
                Your complaint is protected and secure.
              </p>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

export default Complaint;