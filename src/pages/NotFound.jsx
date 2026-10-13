import { Link } from "react-router-dom";

import { useDocumentTitle } from "../hooks/useDocumentTitle";

function NotFound() {
  useDocumentTitle("Page not found");

  return (
    <div className="centered-page">
      <div className="centered-card">
        <span className="error-code">404</span>

        <h1>Page not found</h1>
        <p>This page doesn’t exist or has moved.</p>

        <Link to="/app/dashboard" className="btn btn-primary btn-md">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
