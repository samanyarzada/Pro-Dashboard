import { Component } from "react";

import Icon from "./components/common/Icon";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application error:", error, errorInfo);
  }

  handleReload = () => window.location.reload();

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="centered-page">
        <div className="centered-card">
          <div className="error-icon">
            <Icon name="alert-triangle" size={28} />
          </div>

          <h1>Something went wrong</h1>
          <p>The page failed to load. Reload to try again.</p>

          {import.meta.env.DEV && this.state.error && (
            <pre className="error-details">{this.state.error.message}</pre>
          )}

          <button type="button" className="btn btn-primary btn-md" onClick={this.handleReload}>
            Reload application
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
