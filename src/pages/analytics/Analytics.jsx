import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Badge from "../../components/common/Badge";
import Card from "../../components/common/Card";
import EmptyState from "../../components/common/EmptyState";
import Icon from "../../components/common/Icon";
import ProgressBar from "../../components/common/ProgressBar";
import RevenueChart from "../../components/common/RevenueChart";
import { useProjects } from "../../context/ProjectsContext";
import { useSettings } from "../../context/SettingsContext";
import { monthlyRevenue } from "../../data/projects";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { daysUntil, formatCurrency } from "../../utils/format";
import { getStatusVariant, STATUSES } from "../../utils/status";

const PERIODS = [
  { value: 3, label: "3 months" },
  { value: 6, label: "6 months" },
  { value: 12, label: "12 months" },
];

const pct = (part, total) => (total === 0 ? 0 : Math.round((part / total) * 100));

function Analytics() {
  useDocumentTitle("Analytics");

  const { projects } = useProjects();
  const { settings } = useSettings();
  const [period, setPeriod] = useState(6);

  const revenueData = monthlyRevenue.slice(-period);
  const periodRevenue = revenueData.reduce((sum, item) => sum + item.value, 0);
  const previousSlice = monthlyRevenue.slice(-period * 2, -period);
  const previousRevenue = previousSlice.reduce((sum, item) => sum + item.value, 0);
  const revenueChange =
    previousSlice.length === period && previousRevenue > 0
      ? ((periodRevenue - previousRevenue) / previousRevenue) * 100
      : null;

  const data = useMemo(() => {
    const total = projects.length;
    const completed = projects.filter((project) => project.status === "Completed");
    const open = projects.filter((project) => project.status !== "Completed");
    const overdue = open.filter((project) => (daysUntil(project.deadline) ?? 0) < 0);
    const totalBudget = projects.reduce((sum, project) => sum + Number(project.budget || 0), 0);
    const deliveredBudget = completed.reduce((sum, project) => sum + Number(project.budget || 0), 0);
    const avgProgress = total === 0 ? 0 : Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / total);

    const byStatus = STATUSES.map((status) => {
      const count = projects.filter((project) => project.status === status).length;
      return { status, count, share: pct(count, total), variant: getStatusVariant(status) };
    });

    const metrics = [
      { label: "Completion rate", value: pct(completed.length, total) },
      { label: "Average progress", value: avgProgress },
      { label: "On schedule", value: open.length === 0 ? 100 : pct(open.length - overdue.length, open.length) },
      { label: "Budget delivered", value: pct(deliveredBudget, totalBudget) },
    ];

    const overall = Math.round(metrics.reduce((sum, metric) => sum + metric.value, 0) / metrics.length);
    const top = [...projects].sort((a, b) => b.budget - a.budget).slice(0, 5);

    return { total, completed: completed.length, avgProgress, byStatus, metrics, overall, top };
  }, [projects]);

  const stats = [
    { label: "Revenue", value: formatCurrency(periodRevenue, settings.currency), icon: "dollar", change: revenueChange },
    { label: "Total projects", value: String(data.total), icon: "folder" },
    { label: "Completed", value: String(data.completed), icon: "check-circle" },
    { label: "Average progress", value: `${data.avgProgress}%`, icon: "trending-up" },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Analytics</h1>
          <p>Monitor business performance and project delivery.</p>
        </div>

        <div className="segmented" role="group" aria-label="Revenue period">
          {PERIODS.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={period === item.value}
              onClick={() => setPeriod(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <section className="stats-grid" aria-label="Key figures">
        {stats.map((stat) => (
          <div className="card stat-card" key={stat.label}>
            <div className="stat-icon">
              <Icon name={stat.icon} size={20} />
            </div>

            <div className="stat-body">
              <span className="stat-title">{stat.label}</span>
              <strong className="stat-value">{stat.value}</strong>
              {stat.change != null && (
                <span className={`stat-note ${stat.change >= 0 ? "up" : "down"}`}>
                  <Icon name={stat.change >= 0 ? "trending-up" : "trending-down"} size={14} />
                  {stat.change >= 0 ? "+" : ""}
                  {stat.change.toFixed(1)}% vs previous {period} months
                </span>
              )}
            </div>
          </div>
        ))}
      </section>

      <div className="analytics-main-grid">
        <Card title="Revenue overview" description={`Revenue for the last ${period} months`}>
          <RevenueChart data={revenueData} currency={settings.currency} />
        </Card>

        <Card title="Project status" description="Current distribution of projects">
          {data.total === 0 ? (
            <EmptyState title="No data" description="Add projects to see their status breakdown." />
          ) : (
            <ul className="status-list">
              {data.byStatus.map((item) => (
                <li key={item.status}>
                  <div className="status-list-head">
                    <Badge variant={item.variant} dot>
                      {item.status}
                    </Badge>
                    <span>
                      <strong>{item.count}</strong> · {item.share}%
                    </span>
                  </div>
                  <ProgressBar
                    value={item.share}
                    variant={item.variant === "default" ? "default" : item.variant}
                    label={`${item.status} share`}
                  />
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <div className="analytics-bottom-grid">
        <Card title="Top projects" description="Highest budgets">
          {data.top.length === 0 ? (
            <EmptyState title="No projects" description="Projects you create will be ranked here." />
          ) : (
            <ol className="top-list">
              {data.top.map((project, index) => (
                <li key={project.id}>
                  <Link to={`/app/projects/${project.id}`} className="top-row">
                    <span className="top-rank">{index + 1}</span>

                    <div className="top-info">
                      <strong>{project.name}</strong>
                      <span>{project.client}</span>
                      <ProgressBar value={project.progress} label={`${project.name} progress`} />
                    </div>

                    <div className="top-value">
                      <strong>{formatCurrency(project.budget, settings.currency)}</strong>
                      <span>{project.progress}%</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </Card>

        <Card title="Performance summary" description="Calculated from your projects">
          <div className="performance">
            <div
              className="donut"
              style={{ "--value": `${data.overall}%` }}
              role="img"
              aria-label={`Overall score ${data.overall} percent`}
            >
              <div>
                <strong>{data.overall}%</strong>
                <span>Overall</span>
              </div>
            </div>

            <dl className="performance-items">
              {data.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt>{metric.label}</dt>
                  <dd>{metric.value}%</dd>
                </div>
              ))}
            </dl>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Analytics;
