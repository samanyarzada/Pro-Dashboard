import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useProjects } from "../../context/ProjectsContext";
import { useSettings } from "../../context/SettingsContext";
import Avatar from "../common/Avatar";
import Icon from "../common/Icon";

function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth();
  const { projects } = useProjects();
  const { settings } = useSettings();
  const location = useLocation();

  const mainLinks = [
    { to: "/app/dashboard", label: "Dashboard", icon: "dashboard" },
    { to: "/app/projects", label: "Projects", icon: "folder", count: projects.length },
    { to: "/app/analytics", label: "Analytics", icon: "trending-up" },
  ];

  const accountLinks = [
    { to: "/app/profile", label: "Profile", icon: "user" },
    { to: "/app/settings", label: "Settings", icon: "sliders" },
  ];

  // Close the mobile drawer whenever the route changes or Escape is pressed.
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const renderLink = (link) => (
    <NavLink
      key={link.to}
      to={link.to}
      className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
    >
      <Icon name={link.icon} size={18} />
      <span>{link.label}</span>
      {link.count !== undefined && <span className="sidebar-link-count">{link.count}</span>}
    </NavLink>
  );

  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`} aria-label="Main navigation">
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">
          <Icon name="logo" size={20} strokeWidth={2.6} />
        </div>

        <span className="sidebar-brand-name">{settings.appName}</span>

        <button
          type="button"
          className="sidebar-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <Icon name="x" size={18} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <span className="sidebar-section">Workspace</span>
        {mainLinks.map(renderLink)}

        <span className="sidebar-section">Account</span>
        {accountLinks.map(renderLink)}
      </nav>

      <div className="sidebar-footer">
        <Avatar name={user?.name} size="md" />

        <div className="sidebar-footer-info">
          <strong>{user?.name}</strong>
          <span>{settings.companyName}</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
