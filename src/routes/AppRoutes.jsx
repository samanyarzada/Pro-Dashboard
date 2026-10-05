import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/auth/Login";

import Dashboard from "../pages/dashboard/Dashboard";
import Projects from "../pages/projects/Projects";
import ProjectDetails from "../pages/projects/ProjectDetails";

import Analytics from "../pages/analytics/Analytics";

import Profile from "../pages/profile/Profile";
import Settings from "../pages/settings/Settings";

import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";

function RootRedirect() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
}

function LoginRedirect() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <Login />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* =========================
          Root
      ========================= */}

      <Route path="/" element={<RootRedirect />} />

      {/* =========================
          Authentication
      ========================= */}

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginRedirect />} />
      </Route>

      {/* =========================
          Protected Application
      ========================= */}

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<DashboardLayout />}>
          {/* /app → /app/dashboard */}
          <Route index element={<Navigate to="/app/dashboard" replace />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Projects */}
          <Route path="projects" element={<Projects />} />

          {/* Project Details */}
          <Route path="projects/:id" element={<ProjectDetails />} />

          {/* Analytics */}
          <Route path="analytics" element={<Analytics />} />

          {/* Profile */}
          <Route path="profile" element={<Profile />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* =========================
          404
      ========================= */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
