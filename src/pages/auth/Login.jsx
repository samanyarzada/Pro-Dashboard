import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import Button from "../../components/common/Button";
import Icon from "../../components/common/Icon";
import { useAuth } from "../../context/AuthContext";
import { useSettings } from "../../context/SettingsContext";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

function Login() {
  useDocumentTitle("Sign in");

  const { login, isAuthenticated } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();

  const destination = location.state?.from?.startsWith("/app") ? location.state.from : "/app/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={destination} replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await login(email, password);

    if (!result.success) {
      setError(result.message);
      setIsSubmitting(false);
      return;
    }

    navigate(destination, { replace: true });
  };

  const fillDemo = () => {
    setEmail("admin@example.com");
    setPassword("123456");
    setError("");
  };

  return (
    <div className="auth-page">
      <aside className="auth-aside">
        <div className="auth-brand">
          <div className="sidebar-brand-mark">
            <Icon name="logo" size={20} strokeWidth={2.6} />
          </div>
          {settings.appName}
        </div>

        <div className="auth-aside-copy">
          <h2>Every project, one clear view.</h2>
          <p>
            Track progress, deadlines and budgets across your team without
            switching between tools.
          </p>
        </div>

        <ul className="auth-points">
          <li>
            <Icon name="check-circle" size={18} /> Live progress on every project
          </li>
          <li>
            <Icon name="check-circle" size={18} /> Revenue and delivery analytics
          </li>
          <li>
            <Icon name="check-circle" size={18} /> Light and dark themes
          </li>
        </ul>
      </aside>

      <main className="auth-main">
        <div className="auth-card">
          <h1>Sign in</h1>
          <p>Enter your details to open your workspace.</p>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {error && (
              <div className="alert alert-danger" role="alert">
                <Icon name="alert-circle" size={18} />
                <div>{error}</div>
              </div>
            )}

            <div className="field">
              <label htmlFor="email">Email</label>
              <div className="input-wrap">
                <Icon name="mail" size={17} className="input-icon" />
                <input
                  id="email"
                  className="input"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  aria-invalid={Boolean(error)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="input-wrap">
                <Icon name="lock" size={17} className="input-icon" />
                <input
                  id="password"
                  className="input"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  aria-invalid={Boolean(error)}
                  required
                />
                <button
                  type="button"
                  className="input-action"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <Icon name={showPassword ? "eye-off" : "eye"} size={17} />
                </button>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              block
              loading={isSubmitting}
              disabled={!email || !password}
            >
              {isSubmitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <div className="auth-demo">
            <strong>Demo account</strong>
            admin@example.com · password 123456
            <div>
              <Button variant="secondary" size="sm" onClick={fillDemo}>
                Fill demo details
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
