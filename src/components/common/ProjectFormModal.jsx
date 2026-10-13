import { useEffect, useState } from "react";

import { TEAM } from "../../data/projects";
import { CATEGORIES, STATUSES } from "../../utils/status";
import Button from "./Button";
import Modal from "./Modal";

const emptyForm = {
  name: "",
  client: "",
  description: "",
  status: "Planning",
  category: "Web Application",
  progress: 0,
  budget: "",
  deadline: "",
  team: [],
};

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Enter a project name.";
  if (!form.client.trim()) errors.client = "Enter the client name.";
  if (form.budget === "" || Number(form.budget) < 0) errors.budget = "Enter a budget of 0 or more.";
  if (!form.deadline) errors.deadline = "Choose a deadline.";
  if (form.team.length === 0) errors.team = "Select at least one team member.";
  return errors;
}

function ProjectFormModal({ isOpen, project, onClose, onSubmit }) {
  const isEditing = Boolean(project);

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  // Reset the form each time the dialog opens.
  useEffect(() => {
    if (isOpen) {
      setForm(project ? { ...emptyForm, ...project } : emptyForm);
      setErrors({});
    }
  }, [isOpen, project]);

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const toggleMember = (id) => {
    setField(
      "team",
      form.team.includes(id) ? form.team.filter((member) => member !== id) : [...form.team, id]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const found = validate(form);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    const status = form.status;
    const progress = status === "Completed" ? 100 : Math.min(100, Math.max(0, Number(form.progress) || 0));

    onSubmit({
      ...form,
      name: form.name.trim(),
      client: form.client.trim(),
      description: form.description.trim(),
      budget: Number(form.budget),
      progress,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit project" : "New project"}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="project-form">
            {isEditing ? "Save changes" : "Create project"}
          </Button>
        </>
      }
    >
      <form id="project-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="pf-name">Project name</label>
            <input
              id="pf-name"
              className="input"
              value={form.name}
              onChange={(event) => setField("name", event.target.value)}
              aria-invalid={Boolean(errors.name)}
              placeholder="e.g. Customer portal"
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="field">
            <label htmlFor="pf-client">Client</label>
            <input
              id="pf-client"
              className="input"
              value={form.client}
              onChange={(event) => setField("client", event.target.value)}
              aria-invalid={Boolean(errors.client)}
              placeholder="e.g. Acme Corporation"
            />
            {errors.client && <span className="field-error">{errors.client}</span>}
          </div>

          <div className="field span-2">
            <label htmlFor="pf-description">Description</label>
            <textarea
              id="pf-description"
              className="textarea"
              value={form.description}
              onChange={(event) => setField("description", event.target.value)}
              placeholder="What is this project about?"
            />
          </div>

          <div className="field">
            <label htmlFor="pf-status">Status</label>
            <select
              id="pf-status"
              className="select"
              value={form.status}
              onChange={(event) => setField("status", event.target.value)}
            >
              {STATUSES.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="pf-category">Category</label>
            <select
              id="pf-category"
              className="select"
              value={form.category}
              onChange={(event) => setField("category", event.target.value)}
            >
              {CATEGORIES.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="pf-budget">Budget</label>
            <input
              id="pf-budget"
              className="input"
              type="number"
              min="0"
              step="100"
              value={form.budget}
              onChange={(event) => setField("budget", event.target.value)}
              aria-invalid={Boolean(errors.budget)}
              placeholder="0"
            />
            {errors.budget && <span className="field-error">{errors.budget}</span>}
          </div>

          <div className="field">
            <label htmlFor="pf-deadline">Deadline</label>
            <input
              id="pf-deadline"
              className="input"
              type="date"
              value={form.deadline}
              onChange={(event) => setField("deadline", event.target.value)}
              aria-invalid={Boolean(errors.deadline)}
            />
            {errors.deadline && <span className="field-error">{errors.deadline}</span>}
          </div>

          <div className="field span-2">
            <label htmlFor="pf-progress">
              Progress: {form.status === "Completed" ? 100 : form.progress}%
            </label>
            <input
              id="pf-progress"
              className="range"
              type="range"
              min="0"
              max="100"
              step="1"
              value={form.status === "Completed" ? 100 : form.progress}
              disabled={form.status === "Completed"}
              onChange={(event) => setField("progress", Number(event.target.value))}
            />
            {form.status === "Completed" && (
              <span className="field-hint">Completed projects are always at 100%.</span>
            )}
          </div>

          <fieldset className="field span-2 member-picker">
            <legend className="field-label">Team</legend>
            <div className="member-options">
              {TEAM.map((member) => (
                <label key={member.id} className="member-option">
                  <input
                    type="checkbox"
                    checked={form.team.includes(member.id)}
                    onChange={() => toggleMember(member.id)}
                  />
                  <span className="avatar avatar-sm">{member.id}</span>
                  <span>{member.name}</span>
                </label>
              ))}
            </div>
            {errors.team && <span className="field-error">{errors.team}</span>}
          </fieldset>
        </div>
      </form>
    </Modal>
  );
}

export default ProjectFormModal;
