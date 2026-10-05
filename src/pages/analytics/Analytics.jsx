
import { useMemo, useState } from "react";

import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";

import "./Analytics.css";

function Analytics() {
  const [period, setPeriod] = useState("6 Months");

  const revenueData = useMemo(
    () => [
      { month: "May", value: 58 },
      { month: "Jun", value: 72 },
      { month: "Jul", value: 64 },
      { month: "Aug", value: 86 },
      { month: "Sep", value: 78 },
      { month: "Oct", value: 94 },
    ],
    []
  );

  const projectStats = [
    {
      label: "Total Projects",
      value: "128",
      change: "+12.5%",
      icon: "📁",
    },
    {
      label: "Completed",
      value: "86",
      change: "+8.2%",
      icon: "✅",
    },
    {
      label: "In Progress",
      value: "28",
      change: "+4.6%",
      icon: "🔄",
    },
    {
      label: "Revenue",
      value: "$24,580",
      change: "+18.4%",
      icon: "💰",
    },
  ];

  const projectStatus = [
    {
      label: "Completed",
      value: 67,
      count: 86,
      variant: "success",
    },
    {
      label: "In Progress",
      value: 22,
      count: 28,
      variant: "info",
    },
    {
      label: "Review",
      value: 7,
      count: 9,
      variant: "warning",
    },
    {
      label: "Planning",
      value: 4,
      count: 5,
      variant: "default",
    },
  ];

  const topProjects = [
    {
      name: "E-Commerce Platform",
      client: "Acme Corporation",
      revenue: "$18,000",
      progress: 72,
    },
    {
      name: "Mobile Banking App",
      client: "FinTech Inc.",
      revenue: "$32,000",
      progress: 100,
    },
    {
      name: "CRM Dashboard",
      client: "Tech Solutions",
      revenue: "$21,500",
      progress: 86,
    },
    {
      name: "Analytics Platform",
      client: "Data Labs",
      revenue: "$27,000",
      progress: 63,
    },
  ];

  return (
    <div className="analytics-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Analytics</h1>
          <p>
            Monitor your business performance and project
            analytics.
          </p>
        </div>

        <select
          className="analytics-period"
          value={period}
          onChange={(event) =>
            setPeriod(event.target.value)
          }
        >
          <option value="7 Days">7 Days</option>
          <option value="30 Days">30 Days</option>
          <option value="6 Months">6 Months</option>
          <option value="1 Year">1 Year</option>
        </select>
      </div>

      {/* Statistics */}
      <div className="analytics-stats-grid">
        {projectStats.map((stat) => (
          <Card key={stat.label}>
            <div className="analytics-stat-card">
              <div className="analytics-stat-top">
                <div className="analytics-stat-icon">
                  {stat.icon}
                </div>

                <Badge variant="success">
                  {stat.change}
                </Badge>
              </div>

              <div className="analytics-stat-value">
                {stat.value}
              </div>

              <div className="analytics-stat-label">
                {stat.label}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Analytics */}
      <div className="analytics-main-grid">
        {/* Revenue Chart */}
        <Card
          title="Revenue Overview"
          description={`Revenue performance for ${period.toLowerCase()}.`}
        >
          <div className="revenue-chart">
            <div className="chart-y-axis">
              <span>$30k</span>
              <span>$20k</span>
              <span>$10k</span>
              <span>$0</span>
            </div>

            <div className="chart-area">
              <div className="chart-grid-lines">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="chart-bars">
                {revenueData.map((item) => (
                  <div
                    className="chart-column"
                    key={item.month}
                  >
                    <div
                      className="chart-bar"
                      style={{
                        height: `${item.value}%`,
                      }}
                      title={`$${item.value * 300}`}
                    />

                    <span className="chart-label">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Project Status */}
        <Card
          title="Project Status"
          description="Current distribution of projects."
        >
          <div className="project-status-list">
            {projectStatus.map((status) => (
              <div
                className="project-status-item"
                key={status.label}
              >
                <div className="project-status-header">
                  <div>
                    <span
                      className={`status-dot status-dot-${status.variant}`}
                    />

                    <span>
                      {status.label}
                    </span>
                  </div>

                  <strong>
                    {status.count}
                  </strong>
                </div>

                <div className="status-progress">
                  <div
                    className={`status-progress-fill status-progress-${status.variant}`}
                    style={{
                      width: `${status.value}%`,
                    }}
                  />
                </div>

                <span className="status-percentage">
                  {status.value}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="analytics-bottom-grid">
        <Card
          title="Top Projects"
          description="Projects with the highest revenue."
        >
          <div className="top-projects-list">
            {topProjects.map((project, index) => (
              <div
                className="top-project-item"
                key={project.name}
              >
                <div className="top-project-rank">
                  #{index + 1}
                </div>

                <div className="top-project-info">
                  <strong>{project.name}</strong>
                  <span>{project.client}</span>

                  <div className="top-project-progress">
                    <div
                      style={{
                        width: `${project.progress}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="top-project-revenue">
                  <strong>
                    {project.revenue}
                  </strong>

                  <span>
                    {project.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Performance Summary"
          description="Overall business performance."
        >
          <div className="performance-summary">
            <div className="performance-circle">
              <div>
                <strong>84%</strong>
                <span>Overall</span>
              </div>
            </div>

            <div className="performance-items">
              <div>
                <span>Project Success</span>
                <strong>92%</strong>
              </div>

              <div>
                <span>Client Satisfaction</span>
                <strong>89%</strong>
              </div>

              <div>
                <span>On-time Delivery</span>
                <strong>81%</strong>
              </div>

              <div>
                <span>Team Efficiency</span>
                <strong>86%</strong>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Analytics;
