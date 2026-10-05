import { Link, useParams } from "react-router-dom";

import { projects } from "../../data/projects";
import "./ProjectDetails.css";

function ProjectDetails() {
  const { id } = useParams();

  const project = projects.find(
    (item) => item.id === id
  );

  if (!project) {
    return (
      <div className="project-not-found">

        <div>📁</div>

        <h1>Project Not Found</h1>

        <p>
          The project you're looking for doesn't exist.
        </p>

        <Link
          to="/app/projects"
          className="primary-button"
        >
          Back to Projects
        </Link>

      </div>
    );
  }

  return (
    <div className="project-details-page">

      {/* Breadcrumb */}

      <div className="breadcrumb">

        <Link to="/app/projects">
          Projects
        </Link>

        <span>/</span>

        <span>{project.name}</span>

      </div>

      {/* Header */}

      <div className="project-details-header">

        <div className="project-title">

          <div className="project-details-icon">
            📁
          </div>

          <div>
            <h1>{project.name}</h1>
            <p>{project.client}</p>
          </div>

        </div>

        <span
          className={`status ${project.status
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {project.status}
        </span>

      </div>

      {/* Overview */}

      <div className="details-grid">

        <div className="details-main">

          <section className="details-card">

            <h2>Project Overview</h2>

            <p className="overview-text">
              {project.description}
            </p>

            <div className="project-meta">

              <div>
                <span>Category</span>
                <strong>{project.category}</strong>
              </div>

              <div>
                <span>Budget</span>
                <strong>{project.budget}</strong>
              </div>

              <div>
                <span>Deadline</span>
                <strong>{project.deadline}</strong>
              </div>

            </div>

          </section>

          {/* Progress */}

          <section className="details-card">

            <div className="details-card-header">

              <div>
                <h2>Project Progress</h2>
                <p>
                  Current project completion
                </p>
              </div>

              <strong className="progress-number">
                {project.progress}%
              </strong>

            </div>

            <div className="large-progress">
              <div
                style={{
                  width: `${project.progress}%`,
                }}
              />
            </div>

          </section>

        </div>

        {/* Sidebar */}

        <aside className="details-sidebar">

          <section className="details-card">

            <h2>Team Members</h2>

            <div className="team-list">

              {project.team.map((member) => (
                <div
                  className="team-member"
                  key={member}
                >
                  <div className="team-avatar">
                    {member}
                  </div>

                  <div>
                    <strong>
                      Team Member
                    </strong>

                    <span>
                      Developer
                    </span>
                  </div>
                </div>
              ))}

            </div>

          </section>

          <Link
            to="/app/projects"
            className="back-button"
          >
            ← Back to Projects
          </Link>

        </aside>

      </div>

    </div>
  );
}

export default ProjectDetails;