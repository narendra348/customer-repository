import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import AgentTasks from "./pages/AgentTasks";
import AdminComplaints from "./pages/AdminComplaints";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Complaint from "./pages/Complaint";
import MyComplaints from "./pages/MyComplaints";
import AdminDashboard from "./pages/AdminDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import Notifications from "./pages/Notifications";
import ComplaintDetails from "./pages/ComplaintDetails";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import AdminAgents from "./pages/AdminAgents";

import Feedback from "./pages/Feedback";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/complaint" element={<Complaint />} />
      <Route path="/mycomplaints" element={<MyComplaints />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/agent" element={<AgentDashboard />} />
      <Route path="/agent/tasks" element={<AgentTasks />} />
      <Route path="/admin/complaints" element={<AdminComplaints />} />
      <Route path="/agent" element={<AgentDashboard />} />
<Route path="/agent/tasks" element={<AgentTasks />} />
<Route path="/agent/profile" element={<Profile />} />
      <Route path="/notifications" element={<Notifications />} />
      
      <Route  path="/complaint/:id"element={<ComplaintDetails />}/>
      <Route path="/reports" element={<Reports />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/admin/agents" element={<AdminAgents />} />

    </Routes>
  );
}

export default App;