const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/admin");
// Routes
//const complaintRoutes = require("./routes/complaint");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// API Routes
app.use("/api/auth", authRoutes);
// app.use("/api/complaints", complaintRoutes);

app.get("/", (req, res) => {
  res.send("Customer Registry API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const complaintRoutes = require("./routes/complaint");
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);
const agentRoutes = require("./routes/agent");
app.use("/api/agent", agentRoutes);
const feedbackRoutes = require("./routes/feedback");

app.use("/api/feedback", feedbackRoutes);
const notificationRoutes = require("./routes/notification");
app.use("/api/notifications", notificationRoutes);
const commentRoutes=require("./routes/comment");
app.use("/api/comments",commentRoutes);
const dashboardRoutes = require("./routes/dashboard");
app.use("/api/dashboard", dashboardRoutes);
const reportRoutes = require("./routes/report");
app.use("/api/reports", reportRoutes);
const profileRoutes = require("./routes/profile");
app.use("/api/profile", profileRoutes);
const historyRoutes = require("./routes/history");

app.use("/api/history", historyRoutes);
// trigger deploy v2