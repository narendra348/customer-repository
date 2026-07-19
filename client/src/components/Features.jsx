import { FaUserPlus, FaClipboardList, FaUserShield } from "react-icons/fa";

function Features() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">Why Choose Our System?</h2>

      <div className="row">

        <div className="col-md-4">
          <div className="card shadow-lg border-0 p-4 text-center">
            <FaUserPlus size={50} className="text-primary mx-auto mb-3" />
            <h4>Easy Registration</h4>
            <p>Create your account within a few seconds.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-lg border-0 p-4 text-center">
            <FaClipboardList size={50} className="text-success mx-auto mb-3" />
            <h4>Complaint Tracking</h4>
            <p>Track complaint status in real time.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-lg border-0 p-4 text-center">
            <FaUserShield size={50} className="text-danger mx-auto mb-3" />
            <h4>Secure Access</h4>
            <p>JWT authentication for Customers, Agents and Admins.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Features;