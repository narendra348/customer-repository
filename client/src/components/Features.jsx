import {
  FaUserPlus,
  FaClipboardList,
  FaUserShield,
  FaBell,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaUserPlus size={55} />,
      title: "Quick Registration",
      desc: "Register customers, agents, and administrators securely within seconds.",
      color: "#2563EB",
    },
    {
      icon: <FaClipboardList size={55} />,
      title: "Complaint Management",
      desc: "Submit, assign, monitor, and resolve complaints with real-time updates.",
      color: "#10B981",
    },
    {
      icon: <FaBell size={55} />,
      title: "Instant Notifications",
      desc: "Receive live notifications whenever complaint status changes.",
      color: "#F59E0B",
    },
    {
      icon: <FaChartLine size={55} />,
      title: "Analytics & Reports",
      desc: "Generate insightful reports with powerful dashboards and statistics.",
      color: "#8B5CF6",
    },
    {
      icon: <FaUsers size={55} />,
      title: "Role Based Access",
      desc: "Dedicated dashboards for Customers, Agents and Administrators.",
      color: "#EC4899",
    },
    {
      icon: <FaUserShield size={55} />,
      title: "Enterprise Security",
      desc: "JWT Authentication with secure APIs and protected routes.",
      color: "#EF4444",
    },
  ];

  return (
    <section
      style={{
        background: "#F8FAFC",
        padding: "90px 0",
      }}
    >
      <div className="container">

        <div className="text-center mb-5">

          <h2
            className="fw-bold"
            style={{ fontSize: "42px" }}
          >
            Why Choose Our Platform?
          </h2>

          <p
            className="text-muted"
            style={{
              maxWidth: "700px",
              margin: "auto",
            }}
          >
            A modern complaint management platform designed for
            organizations to simplify complaint handling,
            improve collaboration, and enhance customer satisfaction.
          </p>

        </div>

        <div className="row g-4">

          {features.map((item, index) => (

            <div
              className="col-lg-4 col-md-6"
              key={index}
            >
              <div
                className="card border-0 h-100 shadow-sm"
                style={{
                  borderRadius: "20px",
                  padding: "35px",
                  transition: ".3s",
                  cursor: "pointer",
                }}
              >

                <div
                  style={{
                    width: "85px",
                    height: "85px",
                    borderRadius: "20px",
                    background: item.color,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "25px",
                  }}
                >
                  {item.icon}
                </div>

                <h4 className="fw-bold">
                  {item.title}
                </h4>

                <p className="text-muted mt-3">
                  {item.desc}
                </p>

              </div>
            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;