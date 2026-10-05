import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          className="menu-button"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          ☰
        </button>

        <div>
          <h1>Dashboard</h1>
          <p>Welcome back!</p>
        </div>
      </div>

      <div className="navbar-right">
        <button
          className="icon-button"
          title="Toggle theme"
          onClick={toggleTheme}
        >
          {isDark ? "☀️" : "🌙"}
        </button>

        <button
          className="icon-button"
          title="Notifications"
        >
          🔔
        </button>

        <button
          className="user-profile"
          onClick={() =>
            navigate("/app/profile")
          }
        >
          <div className="avatar">
            {user?.name?.charAt(0) || "A"}
          </div>

          <div className="user-info">
            <strong>
              {user?.name || "Admin User"}
            </strong>

            <span>
              {user?.role || "Administrator"}
            </span>
          </div>
        </button>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;