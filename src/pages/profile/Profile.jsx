import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import "./Profile.css";

function Profile() {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "");

  const [saved, setSaved] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <div>
          <h1>Profile</h1>
          <p>Manage your personal information and account details.</p>
        </div>
      </div>

      <div className="profile-grid">
        <section className="profile-card profile-overview">
          <div className="profile-avatar-large">
            {user?.name?.charAt(0) || "A"}
          </div>

          <h2>{user?.name || "Admin User"}</h2>

          <p className="profile-role">
            {user?.role || "Administrator"}
          </p>

          <div className="profile-divider" />

          <div className="profile-meta">
            <span>Email</span>
            <strong>{user?.email}</strong>
          </div>

          <div className="profile-meta">
            <span>Account ID</span>
            <strong>USR-0001</strong>
          </div>

          <div className="profile-meta">
            <span>Status</span>
            <strong className="status-active">
              Active
            </strong>
          </div>
        </section>

        <section className="profile-card">
          <div className="card-header">
            <div>
              <h2>Personal Information</h2>
              <p>
                Update your personal account information.
              </p>
            </div>
          </div>

          {saved && (
            <div className="success-message">
              Profile updated successfully.
            </div>
          )}

          <form
            className="profile-form"
            onSubmit={handleSubmit}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="profile-name">
                  Full Name
                </label>

                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="profile-role">
                  Role
                </label>

                <input
                  id="profile-role"
                  type="text"
                  value={role}
                  disabled
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="profile-email">
                Email Address
              </label>

              <input
                id="profile-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="primary-button"
              >
                Save Changes
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Profile;