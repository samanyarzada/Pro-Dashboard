import {
  Component,
} from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(
    error
  ) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      "Application Error:",
      error
    );

    console.error(
      "Error Info:",
      errorInfo
    );
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <div className="error-card">
            <div className="error-icon">
              ⚠️
            </div>

            <h1>
              Something went wrong
            </h1>

            <p>
              An unexpected error occurred
              while loading this page.
            </p>

            {import.meta.env.DEV &&
              this.state.error && (
                <pre className="error-details">
                  {this.state.error.message}
                </pre>
              )}

            <button
              className="error-button"
              onClick={this.handleReload}
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;