import {
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { projects } from "../../data/projects";

import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";

import "./Projects.css";

function getStatusVariant(status) {
  switch (status) {
    case "Completed":
      return "success";

    case "Review":
      return "warning";

    case "In Progress":
      return "info";

    case "Planning":
      return "default";

    default:
      return "default";
  }
}

function Projects() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");

  const filteredProjects = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        project.name
          .toLowerCase()
          .includes(query) ||
        project.client
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        project.status === statusFilter;

      return (
        matchesSearch && matchesStatus
      );
    });
  }, [search, statusFilter]);

  return (
    <div className="projects-page">
      <div className="page-header">
        <div>
          <h1>Projects</h1>

          <p>
            Manage and track all your projects.
          </p>
        </div>

        <Button>
          + New Project
        </Button>
      </div>

      <div className="projects-toolbar">
        <div className="projects-search">
          <span>🔍</span>

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search projects..."
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value
            )
          }
          className="projects-filter"
        >
          <option value="All">
            All Statuses
          </option>

          <option value="Planning">
            Planning
          </option>

          <option value="In Progress">
            In Progress
          </option>

          <option value="Review">
            Review
          </option>

          <option value="Completed">
            Completed
          </option>
        </select>
      </div>

      {filteredProjects.length === 0 ? (
        <EmptyState
          icon="📁"
          title="No projects found"
          description="Try changing your search or filter criteria."
        />
      ) : (
        <div className="projects-grid">
          {filteredProjects.map(
            (project) => (
              <article
                key={project.id}
                className="project-card"
              >
                <div className="project-card-top">
                  <div>
                    <h2>{project.name}</h2>

                    <p className="project-client">
                      {project.client}
                    </p>
                  </div>

                  <Badge
                    variant={getStatusVariant(
                      project.status
                    )}
                  >
                    {project.status}
                  </Badge>
                </div>

                <p className="project-description">
                  {project.description}
                </p>

                <div className="project-progress">
                  <div className="progress-header">
                    <span>Progress</span>

                    <strong>
                      {project.progress}%
                    </strong>
                  </div>

                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="project-meta">
                  <div>
                    <span>Category</span>
                    <strong>
                      {project.category}
                    </strong>
                  </div>

                  <div>
                    <span>Budget</span>
                    <strong>
                      {project.budget}
                    </strong>
                  </div>

                  <div>
                    <span>Deadline</span>
                    <strong>
                      {project.deadline}
                    </strong>
                  </div>
                </div>

                <div className="project-card-footer">
                  <div className="team-avatars">
                    {project.team.map(
                      (member) => (
                        <span key={member}>
                          {member}
                        </span>
                      )
                    )}
                  </div>

                  <Link
                    to={`/app/projects/${project.id}`}
                  >
                    <Button
                      variant="outline"
                      size="small"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </article>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Projects;