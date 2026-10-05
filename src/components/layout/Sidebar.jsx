import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  const links = [
    {
      to: "/app/dashboard",
      label: "Dashboard",
      icon: "📊",
    },
    {
      to: "/app/projects",
      label: "Projects",
      icon: "📁",
    },
    {
      to: "/app/analytics",
      label: "Analytics",
      icon: "📈",
    },
    {
      to: "/app/profile",
      label: "Profile",
      icon: "👤",
    },
    {
      to: "/app/settings",
      label: "Settings",
      icon: "⚙️",
    },
  ];

  return (
    <aside
      className={`sidebar ${
        isOpen ? "sidebar-open" : ""
      }`}
    >
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          
        </div>

        <span>Pro Dashboard</span>

        <button
          className="sidebar-close"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onClose}
            className={({ isActive }) =>
              `sidebar-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="sidebar-link-icon">
              {link.icon}
            </span>

            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span>Pro Dashboard</span>
        <small>v1.0.0</small>
      </div>
    </aside>
  );
}

export default Sidebar;