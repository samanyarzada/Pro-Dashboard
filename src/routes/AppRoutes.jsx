import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Loading from "../components/common/Loading";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

const Login = lazy(() => import("../pages/auth/Login"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Projects = lazy(() => import("../pages/projects/Projects"));
const ProjectDetails = lazy(() => import("../pages/projects/ProjectDetails"));
const Analytics = lazy(() => import("../pages/analytics/Analytics"));
const Profile = lazy(() => import("../pages/profile/Profile"));
const Settings = lazy(() => import("../pages/settings/Settings"));

function RootRedirect() {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? "/app/dashboard" : "/login"} replace />;
}

function AppRoutes() {
  return (
    <Suspense fallback={<Loading fullScreen text="Loading…" />}>
      <Routes>
        <Route path="/" element={<RootRedirect />} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<DashboardLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
