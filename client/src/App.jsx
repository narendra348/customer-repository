import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Complaint from "./pages/Complaint";
import MyComplaints from "./pages/MyComplaints";
import ComplaintDetails from "./pages/ComplaintDetails";

import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaints from "./pages/AdminComplaints";
import AdminAgents from "./pages/AdminAgents";

import AgentDashboard from "./pages/AgentDashboard";
import AgentTasks from "./pages/AgentTasks";

import Notifications from "./pages/Notifications";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Feedback from "./pages/Feedback";
import Profile from "./pages/Profile";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Customer */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/complaint"
        element={
          <PrivateRoute>
            <Complaint />
          </PrivateRoute>
        }
      />

      <Route
        path="/mycomplaints"
        element={
          <PrivateRoute>
            <MyComplaints />
          </PrivateRoute>
        }
      />

      <Route
        path="/complaint/:id"
        element={
          <PrivateRoute>
            <ComplaintDetails />
          </PrivateRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/complaints"
        element={
          <PrivateRoute>
            <AdminComplaints />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/agents"
        element={
          <PrivateRoute>
            <AdminAgents />
          </PrivateRoute>
        }
      />

      {/* Agent */}
      <Route
        path="/agent"
        element={
          <PrivateRoute>
            <AgentDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/agent/tasks"
        element={
          <PrivateRoute>
            <AgentTasks />
          </PrivateRoute>
        }
      />

      <Route
        path="/agent/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      {/* Common */}
      <Route
        path="/notifications"
        element={
          <PrivateRoute>
            <Notifications />
          </PrivateRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <PrivateRoute>
            <Analytics />
          </PrivateRoute>
        }
      />

      <Route
        path="/feedback"
        element={
          <PrivateRoute>
            <Feedback />
          </PrivateRoute>
        }
      />

    </Routes>
  );
}

export default App;