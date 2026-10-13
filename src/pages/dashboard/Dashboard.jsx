import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Avatar from "../../components/common/Avatar";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import EmptyState from "../../components/common/EmptyState";
import Icon from "../../components/common/Icon";
import ProgressBar from "../../components/common/ProgressBar";
import RevenueChart from "../../components/common/RevenueChart";
import { useAuth } from "../../context/AuthContext";
import { useProjects } from "../../context/ProjectsContext";
import { useSettings } from "../../context/SettingsContext";
import { activities, monthlyRevenue } from "../../data/projects";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { formatCompactCurrency, formatCurrency } from "../../utils/format";
import { getStatusVariant } from "../../utils/status";

function Dashboard() {
  useDocumentTitle("Dashboard");

  const { user } = useAuth();
  const { projects } = useProjects();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const [range, setRange] = useState(6);

  const stats = useMemo(() => {
    const active = projects.filter((project) => project.status === "In Progress").length;
    const completed = projects.filter((project) => project.status === "Completed").length;
    const budget = projects.reduce((sum, project) => sum + Number(project.budget || 0), 0);
    const pending = projects.filter((project) => project.status !== "Completed").length;
    const last = monthlyRevenue[monthlyRevenue.length - 1].value;
    const previous = monthlyRevenue[monthlyRevenue.length - 2].value;
    const growth = ((last - previous) / previous) * 100;

    return [
      { title: "Monthly revenue", value: formatCurrency(last, settings.currency), note: `${growth >= 0 ? "+" : ""}${growth.toFixed(1)}% vs last month`, up: growth >= 0, icon: "dollar" },
      { title: "Total projects", value: String(projects.length), note: `${completed} completed`, up: true, icon: "folder" },
      { title: "In progress", value: String(active), note: `${pending} not yet completed`, up: true, icon: "clock" },
      { title: "Portfolio budget", value: formatCompactCurrency(budget, settings.currency), note: "Across all projects", up: true, icon: "briefcase" },
    ];
  }, [projects, settings.currency]);

  const recent = projects.slice(0, 5);
  const firstName = user?.name?.split(" ")[0] || "there";
  const chartData = monthlyRevenue.slice(-range);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Welcome back, {firstName}</h1>
          <p>Here is what is happening across your projects today.</p>
        </div>

        <div className="page-header-actions">
          <Button onClick={() => navigate("/app/projects", { state: { openCreate: true } })}>
            <Icon name="plus" size={16} /> New project
          </Button>
        </div>
      </div>

      <section className="stats-grid" aria-label="Key figures">
        {stats.map((stat) => (
          <div className="card stat-card" key={stat.title}>
            <div className="stat-icon">
              <Icon name={stat.icon} size={20} />
            </div>

            <div className="stat-body">
              <span className="stat-title">{stat.title}</span>
              <strong className="stat-value">{stat.value}</strong>
              <span className={`stat-note ${stat.up ? "up" : "down"}`}>
                <Icon name={stat.up ? "trending-up" : "trending-down"} size={14} />
                {stat.note}
              </span>
            </div>
          </div>
        ))}
      </section>

      <section className="dashboard-grid">
        <Card
          title="Revenue overview"
          description="Monthly revenue performance"
          actions={
            <div className="segmented" role="group" aria-label="Chart range">
              <button type="button" aria-pressed={range === 6} onClick={() => setRange(6)}>
                6 months
              </button>
              <button type="button" aria-pressed={range === 12} onClick={() => setRange(12)}>
                12 months
              </button>
            </div>
          }
        >
          <RevenueChart data={chartData} currency={settings.currency} />
        </Card>

        <Card
          title="Recent projects"
          description="Your latest work"
          actions={
            <Link to="/app/projects" className="btn btn-ghost btn-sm">
              View all
            </Link>
          }
          bodyClassName="list-body"
        >
          {recent.length === 0 ? (
            <EmptyState title="No projects yet" description="Create your first project to see it here." />
          ) : (
            <ul className="list">
              {recent.map((project) => (
                <li key={project.id}>
                  <Link to={`/app/projects/${project.id}`} className="list-row">
                    <div className="list-row-main">
                      <strong>{project.name}</strong>
                      <span>{project.client}</span>
                    </div>

                    <div className="list-row-side">
                      <Badge variant={getStatusVariant(project.status)}>{project.status}</Badge>
                      <div className="list-progress">
                        <ProgressBar value={project.progress} label={`${project.name} progress`} />
                        <span>{project.progress}%</span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </section>

      <Card title="Recent activity" description="Latest actions from your team">
        <ul className="activity-list">
          {activities.map((activity) => (
            <li className="activity-item" key={activity.id}>
              <Avatar name={activity.user} size="md" />

              <div className="activity-content">
                <p>
                  <strong>{activity.user}</strong> {activity.action} <strong>{activity.project}</strong>
                </p>
                <span>{activity.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default Dashboard;
