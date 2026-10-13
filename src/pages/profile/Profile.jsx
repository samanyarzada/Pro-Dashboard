import { useState } from "react";

import Avatar from "../../components/common/Avatar";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Profile() {
  useDocumentTitle("Profile");

  const { user, updateUser } = useAuth();
  const toast = useToast();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [errors, setErrors] = useState({});

  const hasChanges = name.trim() !== user?.name || email.trim() !== user?.email;

  const handleSubmit = (event) => {
    event.preventDefault();

    const found = {};
    if (!name.trim()) found.name = "Enter your full name.";
    if (!EMAIL_PATTERN.test(email.trim())) found.email = "Enter a valid email address.";

    setErrors(found);
    if (Object.keys(found).length > 0) return;

    updateUser({ name: name.trim(), email: email.trim() });
    toast.success("Profile updated", "Your details were saved.");
  };

  const handleReset = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setErrors({});
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Profile</h1>
          <p>Manage your personal information and account details.</p>
        </div>
      </div>

      <div className="profile-grid">
        <Card className="profile-overview">
          <Avatar name={user?.name} size="lg" />

          <h2>{user?.name}</h2>
          <p className="profile-role">{user?.role}</p>

          <dl className="profile-meta">
            <div>
              <dt>Email</dt>
              <dd>{user?.email}</dd>
            </div>
            <div>
              <dt>Account ID</dt>
              <dd>USR-{String(user?.id || 1).padStart(4, "0")}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd className="status-active">Active</dd>
            </div>
          </dl>
        </Card>

        <Card title="Personal information" description="Update your account details.">
          <form className="stack" onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="profile-name">Full name</label>
                <input
                  id="profile-name"
                  className="input"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>

              <div className="field">
                <label htmlFor="profile-role">Role</label>
                <input id="profile-role" className="input" value={user?.role || ""} disabled />
                <span className="field-hint">Roles are managed by an administrator.</span>
              </div>

              <div className="field span-2">
                <label htmlFor="profile-email">Email address</label>
                <input
                  id="profile-email"
                  className="input"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>
            </div>

            <div className="form-actions">
              <Button variant="secondary" onClick={handleReset} disabled={!hasChanges}>
                Discard changes
              </Button>
              <Button type="submit" disabled={!hasChanges}>
                Save changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
