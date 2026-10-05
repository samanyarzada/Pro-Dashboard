import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

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

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={<Login />}
        />
      </Route>

      {/* Protected Application */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/app"
          element={<DashboardLayout />}
        >
          <Route
            index
            element={
              <Navigate
                to="dashboard"
                replace
              />
            }
          />

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="projects"
            element={<Projects />}
          />

          <Route
            path="projects/:id"
            element={<ProjectDetails />}
          />

          <Route
            path="analytics"
            element={<Analytics />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />
        </Route>
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default AppRoutes;