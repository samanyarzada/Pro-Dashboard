import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Avatar from "../../components/common/Avatar";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
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
import { daysUntil, formatCurrency, formatDate } from "../../utils/format";
import { getStatusVariant } from "../../utils/status";

function deadlineLabel(project) {
  if (project.status === "Completed") return { text: "Delivered", variant: "success" };

  const days = daysUntil(project.deadline);
  if (days === null) return null;
  if (days < 0) return { text: `${Math.abs(days)} days overdue`, variant: "danger" };
  if (days === 0) return { text: "Due today", variant: "warning" };
  if (days <= 14) return { text: `${days} days left`, variant: "warning" };
  return { text: `${days} days left`, variant: "default" };
}

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, updateProject, deleteProject } = useProjects();
  const { settings } = useSettings();
  const toast = useToast();

  const project = projects.find((item) => item.id === id);

  useDocumentTitle(project ? project.name : "Project not found");

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (!project) {
    return (
      <div className="card">
        <EmptyState
          title="Project not found"
          description="It may have been deleted, or the link is incorrect."
          action={
            <Link to="/app/projects" className="btn btn-primary btn-md">
              Back to projects
            </Link>
          }
        />
      </div>
    );
  }

  const deadline = deadlineLabel(project);

  const handleSave = (data) => {
    updateProject(project.id, data);
    setEditOpen(false);
    toast.success("Project updated", `${data.name} was saved.`);
  };

  const handleDelete = () => {
    deleteProject(project.id);
    toast.success("Project deleted", `${project.name} was removed.`);
    navigate("/app/projects", { replace: true });
  };

  return (
    <div className="page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/app/projects">Projects</Link>
        <Icon name="chevron-right" size={14} />
        <span aria-current="page">{project.name}</span>
      </nav>

      <div className="page-header">
        <div className="details-title">
          <div className="details-icon">
            <Icon name="folder" size={24} />
          </div>

          <div>
            <h1>{project.name}</h1>
            <p>{project.client}</p>
          </div>
        </div>

        <div className="page-header-actions">
          <Badge variant={getStatusVariant(project.status)} dot>
            {project.status}
          </Badge>

          <Button variant="secondary" onClick={() => setEditOpen(true)}>
            <Icon name="pencil" size={16} /> Edit
          </Button>

          <Button variant="danger" onClick={() => setDeleteOpen(true)}>
            <Icon name="trash" size={16} /> Delete
          </Button>
        </div>
      </div>

      <div className="details-grid">
        <div className="details-main">
          <Card title="Overview">
            <p className="overview-text">{project.description || "No description provided."}</p>

            <dl className="meta-grid meta-grid-lg">
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
                <dd>
                  {formatDate(project.deadline)}
                  {deadline && (
                    <>
                      {" "}
                      <Badge variant={deadline.variant}>{deadline.text}</Badge>
                    </>
                  )}
                </dd>
              </div>
            </dl>
          </Card>

          <Card
            title="Progress"
            description="Current completion"
            actions={<strong className="progress-number">{project.progress}%</strong>}
          >
            <ProgressBar value={project.progress} large label="Project progress" />
          </Card>
        </div>

        <aside className="details-sidebar">
          <Card title="Team" description={`${project.team.length} members`}>
            <ul className="team-list">
              {project.team.map((memberId) => {
                const member = TEAM.find((item) => item.id === memberId);
                return (
                  <li key={memberId} className="team-member">
                    <Avatar initials={memberId} name={member?.name} size="md" />
                    <div>
                      <strong>{member?.name || memberId}</strong>
                      <span>{member?.role || "Team member"}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Link to="/app/projects" className="btn btn-secondary btn-md btn-block">
            <Icon name="arrow-left" size={16} /> Back to projects
          </Link>
        </aside>
      </div>

      <ProjectFormModal
        isOpen={editOpen}
        project={project}
        onClose={() => setEditOpen(false)}
        onSubmit={handleSave}
      />

      <ConfirmDialog
        isOpen={deleteOpen}
        title="Delete project?"
        message={`“${project.name}” will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete project"
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  );
}

export default ProjectDetails;
