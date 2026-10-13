import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { initialNotifications } from "../../data/projects";
import { useClickOutside } from "../../hooks/useClickOutside";
import Avatar from "../common/Avatar";
import Icon from "../common/Icon";

const PAGE_META = {
  dashboard: { title: "Dashboard", subtitle: "Overview of your work" },
  projects: { title: "Projects", subtitle: "Manage and track every project" },
  analytics: { title: "Analytics", subtitle: "Performance and revenue" },
  profile: { title: "Profile", subtitle: "Your account details" },
  settings: { title: "Settings", subtitle: "Application preferences" },
};

function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const userMenuRef = useRef(null);
  const notificationsRef = useRef(null);

  useClickOutside(userMenuRef, () => setUserMenuOpen(false), userMenuOpen);
  useClickOutside(notificationsRef, () => setNotificationsOpen(false), notificationsOpen);

  const section = location.pathname.split("/")[2] || "dashboard";
  const meta = PAGE_META[section] || PAGE_META.dashboard;
  const unreadCount = notifications.filter((item) => item.unread).length;

  const markAllRead = () =>
    setNotifications((current) => current.map((item) => ({ ...item, unread: false })));

  const goTo = (path) => {
    setUserMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="icon-btn menu-button"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Icon name="menu" size={20} />
        </button>

        <div className="navbar-title">
          <h1>{meta.title}</h1>
          <p>{meta.subtitle}</p>
        </div>
      </div>

      <div className="navbar-right">
        <button
          type="button"
          className="icon-btn"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Light mode" : "Dark mode"}
        >
          <Icon name={isDark ? "sun" : "moon"} size={18} />
        </button>

        <div className="dropdown" ref={notificationsRef}>
          <button
            type="button"
            className="icon-btn"
            onClick={() => setNotificationsOpen((open) => !open)}
            aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
            aria-expanded={notificationsOpen}
          >
            <Icon name="bell" size={18} />
            {unreadCount > 0 && <span className="badge-dot-indicator" />}
          </button>

          {notificationsOpen && (
            <div className="dropdown-menu notification-menu">
              <div className="notification-menu-head">
                <strong>Notifications</strong>

                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={markAllRead}
                  disabled={unreadCount === 0}
                >
                  Mark all as read
                </button>
              </div>

              {notifications.map((item) => (
                <div key={item.id} className={`notification-item ${item.unread ? "unread" : ""}`}>
                  <div>
                    <p>{item.text}</p>
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dropdown" ref={userMenuRef}>
          <button
            type="button"
            className="user-trigger"
            onClick={() => setUserMenuOpen((open) => !open)}
            aria-expanded={userMenuOpen}
            aria-haspopup="menu"
          >
            <Avatar name={user?.name} size="md" />

            <div className="user-trigger-info">
              <strong>{user?.name}</strong>
              <span>{user?.role}</span>
            </div>

            <Icon name="chevron-down" size={16} />
          </button>

          {userMenuOpen && (
            <div className="dropdown-menu" role="menu">
              <div className="menu-header">
                <strong>{user?.name}</strong>
                <span>{user?.email}</span>
              </div>

              <div className="dropdown-divider" />

              <button type="button" role="menuitem" className="dropdown-item" onClick={() => goTo("/app/profile")}>
                <Icon name="user" size={16} /> Profile
              </button>

              <button type="button" role="menuitem" className="dropdown-item" onClick={() => goTo("/app/settings")}>
                <Icon name="sliders" size={16} /> Settings
              </button>

              <div className="dropdown-divider" />

              <button type="button" role="menuitem" className="dropdown-item dropdown-item-danger" onClick={handleLogout}>
                <Icon name="log-out" size={16} /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
