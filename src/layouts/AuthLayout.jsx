import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div>
      <header>
        <h2>React Pro Dashboard</h2>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;