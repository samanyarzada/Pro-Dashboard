import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import EmptyState from "../../components/common/EmptyState";
import Icon from "../../components/common/Icon";
import ProgressBar from "../../components/common/ProgressBar";
import ProjectFormModal from "../../components/common/ProjectFormModal";
import { useProjects } from "../../context/ProjectsContext";
import { useSettings } from "../../context/SettingsContext";
import { useToast } from "../../context/ToastContext";
import { TEAM } from "../../data/projects";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { formatCurrency, formatDate } from "../../utils/format";
import { getStatusVariant, STATUSES } from "../../utils/status";

const SORTS = {
  newest: { label: "Newest first", compare: () => 0 },
  deadline: { label: "Nearest deadline", compare: (a, b) => a.deadline.localeCompare(b.deadline) },
  progress: { label: "Highest progress", compare: (a, b) => b.progress - a.progress },
  budget: { label: "Highest budget", compare: (a, b) => b.budget - a.budget },
  name: { label: "Name (A–Z)", compare: (a, b) => a.name.localeCompare(b.name) },
};

function Projects() {
  useDocumentTitle("Projects");

  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const { settings } = useSettings();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState("newest");

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // The dashboard's "New project" button opens the form here.
  useEffect(() => {
    if (location.state?.openCreate) {
      setEditing(null);
      setFormOpen(true);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects
      .filter((project) => {
        const matchesSearch =
          !query ||
          project.name.toLowerCase().includes(query) ||
          project.client.toLowerCase().includes(query);
        const matchesStatus = statusFilter === "All" || project.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort(SORTS[sort].compare);
  }, [projects, search, statusFilter, sort]);

  const hasFilters = search.trim() !== "" || statusFilter !== "All";

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (project) => {
    setEditing(project);
    setFormOpen(true);
  };

  const handleSubmit = (data) => {
    if (editing) {
      updateProject(editing.id, data);
      toast.success("Project updated", `${data.name} was saved.`);
    } else {
      addProject(data);
      toast.success("Project created", `${data.name} was added.`);
    }
    setFormOpen(false);
  };

  const confirmDelete = () => {
    deleteProject(deleting.id);
    toast.success("Project deleted", `${deleting.name} was removed.`);
    setDeleting(null);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Projects</h1>
          <p>Manage and track all your projects.</p>
        </div>

        <div className="page-header-actions">
          <Button onClick={openCreate}>
            <Icon name="plus" size={16} /> New project
          </Button>
        </div>
      </div>

      <div className="card toolbar">
        <div className="input-wrap toolbar-search">
          <Icon name="search" size={17} className="input-icon" />
          <input
            className="input"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by project or client"
            aria-label="Search projects"
          />
        </div>

        <select
          className="select toolbar-select"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter by status"
        >
          <option value="All">All statuses</option>
          {STATUSES.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>

        <select
          className="select toolbar-select"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          aria-label="Sort projects"
        >
          {Object.entries(SORTS).map(([key, option]) => (
            <option key={key} value={key}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="card">
          {hasFilters ? (
            <EmptyState
              icon="search"
              title="No matching projects"
              description="Try a different search or clear the filters."
              action={
                <Button variant="secondary" onClick={clearFilters}>
                  Clear filters
                </Button>
              }
            />
          ) : (
            <EmptyState
              title="No projects yet"
              description="Create a project to start tracking progress, budget and deadlines."
              action={
                <Button onClick={openCreate}>
                  <Icon name="plus" size={16} /> New project
                </Button>
              }
            />
          )}
        </div>
      ) : (
        <div className="projects-grid">
          {filtered.map((project) => (
            <article key={project.id} className="card project-card">
              <div className="project-card-top">
                <div className="project-card-title">
                  <h2>
                    <Link to={`/app/projects/${project.id}`}>{project.name}</Link>
                  </h2>
                  <p>{project.client}</p>
                </div>

                <Badge variant={getStatusVariant(project.status)} dot>
                  {project.status}
                </Badge>
              </div>

              <p className="project-description">{project.description || "No description."}</p>

              <div className="project-progress">
                <div className="project-progress-label">
                  <span>Progress</span>
                  <strong>{project.progress}%</strong>
                </div>
                <ProgressBar value={project.progress} label={`${project.name} progress`} />
              </div>

              <dl className="meta-grid">
                <div>
                  <dt>Category</dt>
                  <dd>{project.category}</dd>
                </div>
                <div>
                  <dt>Budget</dt>
                  <dd>{formatCurrency(project.budget, settings.currency)}</dd>
                </div>
                <div>
                  <dt>Deadline</dt>
                  <dd>{formatDate(project.deadline)}</dd>
                </div>
              </dl>

              <div className="project-card-footer">
                <div className="avatar-stack">
                  {project.team.map((id) => {
                    const member = TEAM.find((item) => item.id === id);
                    return (
                      <span key={id} className="avatar avatar-sm" title={member?.name || id}>
                        {id}
                      </span>
                    );
                  })}
                </div>

                <div className="row-actions">
                  <button
                    type="button"
                    className="icon-btn icon-btn-plain"
                    onClick={() => openEdit(project)}
                    aria-label={`Edit ${project.name}`}
                    title="Edit"
                  >
                    <Icon name="pencil" size={16} />
                  </button>

                  <button
                    type="button"
                    className="icon-btn icon-btn-plain"
                    onClick={() => setDeleting(project)}
                    aria-label={`Delete ${project.name}`}
                    title="Delete"
                  >
                    <Icon name="trash" size={16} />
                  </button>

                  <Link to={`/app/projects/${project.id}`} className="btn btn-secondary btn-sm">
                    Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <ProjectFormModal
        isOpen={formOpen}
        project={editing}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        isOpen={Boolean(deleting)}
        title="Delete project?"
        message={`“${deleting?.name}” will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete project"
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}

export default Projects;
