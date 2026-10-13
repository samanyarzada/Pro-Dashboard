import { Outlet } from "react-router-dom";

import Icon from "../components/common/Icon";
import { useTheme } from "../context/ThemeContext";

function AuthLayout() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
      <button
        type="button"
        className="icon-btn auth-theme-toggle"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <Icon name={isDark ? "sun" : "moon"} size={18} />
      </button>

      <Outlet />
    </>
  );
}

export default AuthLayout;
