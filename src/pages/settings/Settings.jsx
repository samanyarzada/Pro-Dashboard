import { useState } from "react";

import "./Settings.css";

function Settings() {
  const [activeTab, setActiveTab] = useState("general");

  const [notifications, setNotifications] = useState({
    email: true,
    projects: true,
    security: true,
    marketing: false,
  });

  const [preferences, setPreferences] = useState({
    language: "English",
    timezone: "UTC",
    compactMode: false,
  });

  const tabs = [
    {
      id: "general",
      label: "General",
      icon: "⚙️",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: "🔔",
    },
    {
      id: "security",
      label: "Security",
      icon: "🔒",
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: "🎨",
    },
  ];

  const toggleNotification = (key) => {
    setNotifications((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>
            Manage your application settings and preferences.
          </p>
        </div>
      </div>

      <div className="settings-layout">
        <aside className="settings-sidebar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`settings-tab ${
                activeTab === tab.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveTab(tab.id)
              }
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </aside>

        <section className="settings-content">
          {activeTab === "general" && (
            <div className="settings-section">
              <div className="settings-section-header">
                <h2>General Settings</h2>
                <p>
                  Manage general application configuration.
                </p>
              </div>

              <div className="settings-form">
                <div className="form-group">
                  <label>Application Name</label>
                  <input
                    type="text"
                    defaultValue="React Pro Dashboard"
                  />
                </div>

                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    defaultValue="Pro Company"
                  />
                </div>

                <div className="form-group">
                  <label>Default Currency</label>
                  <select defaultValue="USD">
                    <option value="USD">
                      USD — US Dollar
                    </option>
                    <option value="EUR">
                      EUR — Euro
                    </option>
                    <option value="GBP">
                      GBP — British Pound
                    </option>
                  </select>
                </div>

                <div className="settings-actions">
                  <button className="primary-button">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="settings-section">
              <div className="settings-section-header">
                <h2>Notifications</h2>
                <p>
                  Choose which notifications you want to receive.
                </p>
              </div>

              <div className="toggle-list">
                <div className="toggle-item">
                  <div>
                    <strong>Email Notifications</strong>
                    <span>
                      Receive important updates via email.
                    </span>
                  </div>

                  <button
                    className={`toggle ${
                      notifications.email
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      toggleNotification("email")
                    }
                  >
                    <span />
                  </button>
                </div>

                <div className="toggle-item">
                  <div>
                    <strong>Project Updates</strong>
                    <span>
                      Get notified when project status changes.
                    </span>
                  </div>

                  <button
                    className={`toggle ${
                      notifications.projects
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      toggleNotification("projects")
                    }
                  >
                    <span />
                  </button>
                </div>

                <div className="toggle-item">
                  <div>
                    <strong>Security Alerts</strong>
                    <span>
                      Receive alerts about account security.
                    </span>
                  </div>

                  <button
                    className={`toggle ${
                      notifications.security
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      toggleNotification("security")
                    }
                  >
                    <span />
                  </button>
                </div>

                <div className="toggle-item">
                  <div>
                    <strong>Marketing Emails</strong>
                    <span>
                      Receive product news and promotions.
                    </span>
                  </div>

                  <button
                    className={`toggle ${
                      notifications.marketing
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      toggleNotification("marketing")
                    }
                  >
                    <span />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="settings-section">
              <div className="settings-section-header">
                <h2>Security</h2>
                <p>
                  Manage your password and account security.
                </p>
              </div>

              <div className="security-warning">
                <strong>Security Notice</strong>
                <span>
                  Password changes are currently simulated.
                  A real backend/API will be connected later.
                </span>
              </div>

              <div className="settings-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                  />
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="settings-actions">
                  <button className="primary-button">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="settings-section">
              <div className="settings-section-header">
                <h2>Preferences</h2>
                <p>
                  Customize your dashboard experience.
                </p>
              </div>

              <div className="settings-form">
                <div className="form-group">
                  <label>Language</label>

                  <select
                    value={preferences.language}
                    onChange={(event) =>
                      setPreferences((current) => ({
                        ...current,
                        language:
                          event.target.value,
                      }))
                    }
                  >
                    <option>English</option>
                    <option>Persian</option>
                    <option>German</option>
                    <option>French</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Timezone</label>

                  <select
                    value={preferences.timezone}
                    onChange={(event) =>
                      setPreferences((current) => ({
                        ...current,
                        timezone:
                          event.target.value,
                      }))
                    }
                  >
                    <option>UTC</option>
                    <option>Europe/Amsterdam</option>
                    <option>Europe/London</option>
                    <option>Asia/Tehran</option>
                  </select>
                </div>

                <div className="toggle-item preference-toggle">
                  <div>
                    <strong>Compact Mode</strong>
                    <span>
                      Use a more compact dashboard layout.
                    </span>
                  </div>

                  <button
                    className={`toggle ${
                      preferences.compactMode
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setPreferences((current) => ({
                        ...current,
                        compactMode:
                          !current.compactMode,
                      }))
                    }
                  >
                    <span />
                  </button>
                </div>

                <div className="settings-actions">
                  <button className="primary-button">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Settings;