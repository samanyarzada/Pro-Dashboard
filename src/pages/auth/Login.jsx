import {
  useEffect,
  useState,
} from "react";

import {
  Navigate,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import "./Login.css";

function Login() {
  const {
    login,
    isAuthenticated,
  } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState(
    "admin@example.com"
  );

  const [password, setPassword] = useState(
    "123456"
  );

  const [error, setError] = useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(
        "/app/dashboard",
        {
          replace: true,
        }
      );
    }
  }, [
    isAuthenticated,
    navigate,
  ]);

  if (isAuthenticated) {
    return (
      <Navigate
        to="/app/dashboard"
        replace
      />
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    const result = await login(
      email,
      password
    );

    if (!result.success) {
      setError(result.message);
      setIsSubmitting(false);
      return;
    }

    navigate(
      "/app/dashboard",
      {
        replace: true,
      }
    );
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-header">

          <div className="login-logo">
            P
          </div>

          <h1>
            Welcome back
          </h1>

          <p>
            Sign in to your account
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="login-form"
        >

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              placeholder="Enter your email"
              required
            />

          </div>

          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Enter your password"
              required
            />

          </div>

          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Signing in..."
              : "Sign In"}
          </button>

        </form>

        <div className="login-demo">
          <strong>Demo Account</strong>

          <span>
            admin@example.com
          </span>

          <span>
            Password: 123456
          </span>
        </div>

      </div>

    </div>
  );
}

export default Login;