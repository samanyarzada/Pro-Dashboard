import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <span className="not-found-code">
          404
        </span>

        <h1>Page not found</h1>

        <p>
          The page you're looking for
          doesn't exist or has been moved.
        </p>

        <Link
          to="/app/dashboard"
          className="not-found-button"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;