import { useState } from "react";

import Button from "../../components/common/Button";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import Icon from "../../components/common/Icon";
import Switch from "../../components/common/Switch";
import { useAuth } from "../../context/AuthContext";
import { useProjects } from "../../context/ProjectsContext";
import { useSettings } from "../../context/SettingsContext";
import { useTheme } from "../../context/ThemeContext";
import { useToast } from "../../context/ToastContext";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

const TABS = [
  { id: "general", label: "General", icon: "briefcase" },
  { id: "notifications", label: "Notifications", icon: "bell" },
  { id: "security", label: "Security", icon: "lock" },
  { id: "preferences", label: "Preferences", icon: "sliders" },
];

const NOTIFICATION_OPTIONS = [
  { key: "email", title: "Email notifications", description: "Receive important updates by email." },
  { key: "projects", title: "Project updates", description: "Get notified when a project’s status changes." },
  { key: "security", title: "Security alerts", description: "Be alerted about sign-ins and password changes." },
  { key: "marketing", title: "Product news", description: "Hear about new features and tips." },
];

function SectionHeader({ title, description }) {
  return (
    <div className="settings-section-header">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function GeneralTab() {
  const { settings, saveSettings } = useSettings();
  const toast = useToast();

  const [appName, setAppName] = useState(settings.appName);
  const [companyName, setCompanyName] = useState(settings.companyName);
  const [currency, setCurrency] = useState(settings.currency);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!appName.trim() || !companyName.trim()) {
      setError("Application name and company name can’t be empty.");
      return;
    }

    setError("");
    saveSettings({ appName: appName.trim(), companyName: companyName.trim(), currency });
    toast.success("Settings saved", "General settings were updated.");
  };

  return (
    <>
      <SectionHeader title="General" description="Manage general application configuration." />

      <form className="settings-form" onSubmit={handleSubmit} noValidate>
        {error && (
          <div className="alert alert-danger" role="alert">
            <Icon name="alert-circle" size={18} />
            <div>{error}</div>
          </div>
        )}

        <div className="field">
          <label htmlFor="s-app">Application name</label>
          <input id="s-app" className="input" value={appName} onChange={(e) => setAppName(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="s-company">Company name</label>
          <input id="s-company" className="input" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="s-currency">Default currency</label>
          <select id="s-currency" className="select" value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">USD — US Dollar</option>
            <option value="EUR">EUR — Euro</option>
            <option value="GBP">GBP — British Pound</option>
          </select>
          <span className="field-hint">Used for budgets and revenue across the app.</span>
        </div>

        <div className="form-actions">
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </>
  );
}

function NotificationsTab() {
  const { settings, saveSettings } = useSettings();
  const toast = useToast();

  const toggle = (key, value) => {
    saveSettings({ notifications: { ...settings.notifications, [key]: value } });
    toast.info("Preference saved");
  };

  return (
    <>
      <SectionHeader title="Notifications" description="Choose which notifications you want to receive." />

      <ul className="toggle-list">
        {NOTIFICATION_OPTIONS.map((option) => (
          <li className="toggle-item" key={option.key}>
            <div>
              <strong>{option.title}</strong>
              <span>{option.description}</span>
            </div>

            <Switch
              checked={settings.notifications[option.key]}
              onChange={(value) => toggle(option.key, value)}
              label={option.title}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

function SecurityTab() {
  const { changePassword } = useAuth();
  const toast = useToast();

  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const setField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const found = {};
    if (!form.current) found.current = "Enter your current password.";
    if (form.next.length < 6) found.next = "Use at least 6 characters.";
    if (form.next && form.next === form.current) found.next = "Choose a password different from the current one.";
    if (form.confirm !== form.next) found.confirm = "Passwords don’t match.";

    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSaving(true);
    const result = await changePassword(form.current, form.next);
    setSaving(false);

    if (!result.success) {
      setErrors({ current: result.message });
      return;
    }

    setForm({ current: "", next: "", confirm: "" });
    toast.success("Password updated", "Use your new password next time you sign in.");
  };

  return (
    <>
      <SectionHeader title="Security" description="Manage your password and account security." />

      <div className="alert alert-warning settings-alert">
        <Icon name="alert-triangle" size={18} />
        <div>
          <strong>Demo mode</strong>
          Password changes apply to this session only. Connect a backend API to make them permanent.
        </div>
      </div>

      <form className="settings-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="s-current">Current password</label>
          <input id="s-current" type="password" autoComplete="current-password" className="input" value={form.current} onChange={setField("current")} aria-invalid={Boolean(errors.current)} />
          {errors.current && <span className="field-error">{errors.current}</span>}
        </div>

        <div className="field">
          <label htmlFor="s-next">New password</label>
          <input id="s-next" type="password" autoComplete="new-password" className="input" value={form.next} onChange={setField("next")} aria-invalid={Boolean(errors.next)} />
          {errors.next && <span className="field-error">{errors.next}</span>}
        </div>

        <div className="field">
          <label htmlFor="s-confirm">Confirm new password</label>
          <input id="s-confirm" type="password" autoComplete="new-password" className="input" value={form.confirm} onChange={setField("confirm")} aria-invalid={Boolean(errors.confirm)} />
          {errors.confirm && <span className="field-error">{errors.confirm}</span>}
        </div>

        <div className="form-actions">
          <Button type="submit" loading={saving}>
            Update password
          </Button>
        </div>
      </form>
    </>
  );
}

function PreferencesTab() {
  const { settings, saveSettings } = useSettings();
  const { theme, setTheme } = useTheme();
  const { resetProjects } = useProjects();
  const toast = useToast();

  const [confirmReset, setConfirmReset] = useState(false);

  const handleReset = () => {
    resetProjects();
    setConfirmReset(false);
    toast.success("Sample data restored", "Projects were reset to the defaults.");
  };

  return (
    <>
      <SectionHeader title="Preferences" description="Customize your dashboard experience. Changes apply immediately." />

      <div className="settings-form">
        <div className="field">
          <span className="field-label">Theme</span>
          <div className="segmented" role="group" aria-label="Theme">
            <button type="button" aria-pressed={theme === "light"} onClick={() => setTheme("light")}>
              Light
            </button>
            <button type="button" aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>
              Dark
            </button>
          </div>
        </div>

        <div className="field">
          <label htmlFor="s-language">Language</label>
          <select id="s-language" className="select" value={settings.language} onChange={(e) => saveSettings({ language: e.target.value })}>
            <option>English</option>
            <option>Persian</option>
            <option>German</option>
            <option>French</option>
          </select>
          <span className="field-hint">The interface is currently available in English only.</span>
        </div>

        <div className="field">
          <label htmlFor="s-timezone">Timezone</label>
          <select id="s-timezone" className="select" value={settings.timezone} onChange={(e) => saveSettings({ timezone: e.target.value })}>
            <option>UTC</option>
            <option>Europe/Amsterdam</option>
            <option>Europe/London</option>
            <option>Asia/Kabul</option>
            <option>Asia/Tehran</option>
          </select>
        </div>

        <ul className="toggle-list">
          <li className="toggle-item">
            <div>
              <strong>Compact mode</strong>
              <span>Reduce spacing to fit more on screen.</span>
            </div>
            <Switch checked={settings.compactMode} onChange={(value) => saveSettings({ compactMode: value })} label="Compact mode" />
          </li>
        </ul>

        <div className="danger-zone">
          <div>
            <strong>Restore sample data</strong>
            <span>Replace all projects with the original demo projects.</span>
          </div>
          <Button variant="secondary" onClick={() => setConfirmReset(true)}>
            <Icon name="refresh" size={16} /> Restore
          </Button>
        </div>
      </div>

      <ConfirmDialog
        isOpen={confirmReset}
        title="Restore sample data?"
        message="Any projects you created or edited will be replaced with the original demo projects."
        confirmLabel="Restore data"
        onConfirm={handleReset}
        onCancel={() => setConfirmReset(false)}
      />
    </>
  );
}

function Settings() {
  useDocumentTitle("Settings");

  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your application settings and preferences.</p>
        </div>
      </div>

      <div className="settings-layout">
        <div className="card settings-nav" role="tablist" aria-label="Settings sections" aria-orientation="vertical">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls="settings-panel"
              className={`settings-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon name={tab.icon} size={17} />
              {tab.label}
            </button>
          ))}
        </div>

        <section className="card settings-content" role="tabpanel" id="settings-panel" aria-labelledby={`tab-${activeTab}`}>
          {activeTab === "general" && <GeneralTab />}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "security" && <SecurityTab />}
          {activeTab === "preferences" && <PreferencesTab />}
        </section>
      </div>
    </div>
  );
}

export default Settings;
