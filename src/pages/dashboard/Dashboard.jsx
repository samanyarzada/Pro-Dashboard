import "./Dashboard.css";

const stats = [
  {
    title: "Total Revenue",
    value: "$24,580",
    change: "+12.5%",
    trend: "up",
    icon: "💰",
  },
  {
    title: "Total Projects",
    value: "128",
    change: "+8.2%",
    trend: "up",
    icon: "📁",
  },
  {
    title: "Active Users",
    value: "8,549",
    change: "+15.8%",
    trend: "up",
    icon: "👥",
  },
  {
    title: "Pending Tasks",
    value: "24",
    change: "-4.3%",
    trend: "down",
    icon: "⏳",
  },
];

const projects = [
  {
    name: "E-Commerce Platform",
    client: "Acme Corporation",
    status: "In Progress",
    progress: 72,
  },
  {
    name: "Mobile Banking App",
    client: "FinTech Inc.",
    status: "Completed",
    progress: 100,
  },
  {
    name: "Marketing Website",
    client: "Creative Studio",
    status: "In Progress",
    progress: 48,
  },
  {
    name: "CRM Dashboard",
    client: "Tech Solutions",
    status: "Review",
    progress: 86,
  },
];

const activities = [
  {
    user: "Alex Morgan",
    action: "completed a task",
    project: "E-Commerce Platform",
    time: "10 minutes ago",
    avatar: "AM",
  },
  {
    user: "Sarah Wilson",
    action: "created a project",
    project: "CRM Dashboard",
    time: "32 minutes ago",
    avatar: "SW",
  },
  {
    user: "Michael Brown",
    action: "updated the design",
    project: "Marketing Website",
    time: "1 hour ago",
    avatar: "MB",
  },
  {
    user: "Emma Davis",
    action: "commented on",
    project: "Mobile Banking App",
    time: "2 hours ago",
    avatar: "ED",
  },
];

function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            Here's what's happening with your projects today.
          </p>
        </div>

        <button className="primary-button">
          + New Project
        </button>
      </div>

      {/* Stats */}
      <section className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.title}>

            <div className="stat-card-top">
              <div className="stat-icon">
                {stat.icon}
              </div>

              <span
                className={`stat-change ${stat.trend}`}
              >
                {stat.change}
              </span>
            </div>

            <div className="stat-value">
              {stat.value}
            </div>

            <div className="stat-title">
              {stat.title}
            </div>

          </div>
        ))}
      </section>

      {/* Main Grid */}
      <section className="dashboard-grid">

        {/* Revenue Chart */}
        <div className="dashboard-card revenue-card">

          <div className="card-header">
            <div>
              <h2>Revenue Overview</h2>
              <p>Monthly revenue performance</p>
            </div>

            <select defaultValue="6">
              <option value="6">Last 6 months</option>
              <option value="12">Last 12 months</option>
            </select>
          </div>

          <div className="chart">

            <div className="chart-y-axis">
              <span>$30k</span>
              <span>$20k</span>
              <span>$10k</span>
              <span>$0</span>
            </div>

            <div className="chart-area">

              <div className="chart-grid-line" />
              <div className="chart-grid-line" />
              <div className="chart-grid-line" />
              <div className="chart-grid-line" />

              <div className="bars">
                <div className="bar-wrapper">
                  <div
                    className="bar"
                    style={{ height: "45%" }}
                  />
                  <span>May</span>
                </div>

                <div className="bar-wrapper">
                  <div
                    className="bar"
                    style={{ height: "62%" }}
                  />
                  <span>Jun</span>
                </div>

                <div className="bar-wrapper">
                  <div
                    className="bar"
                    style={{ height: "55%" }}
                  />
                  <span>Jul</span>
                </div>

                <div className="bar-wrapper">
                  <div
                    className="bar"
                    style={{ height: "78%" }}
                  />
                  <span>Aug</span>
                </div>

                <div className="bar-wrapper">
                  <div
                    className="bar"
                    style={{ height: "68%" }}
                  />
                  <span>Sep</span>
                </div>

                <div className="bar-wrapper">
                  <div
                    className="bar"
                    style={{ height: "92%" }}
                  />
                  <span>Oct</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Projects */}
        <div className="dashboard-card">

          <div className="card-header">
            <div>
              <h2>Recent Projects</h2>
              <p>Your latest projects</p>
            </div>

            <button className="text-button">
              View all
            </button>
          </div>

          <div className="projects-list">

            {projects.map((project) => (
              <div
                className="project-item"
                key={project.name}
              >
                <div className="project-info">
                  <div className="project-icon">
                    📁
                  </div>

                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.client}</p>
                  </div>
                </div>

                <div className="project-right">

                  <span
                    className={`status ${project.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {project.status}
                  </span>

                  <div className="progress-container">
                    <div className="progress-bar">
                      <div
                        className="progress-value"
                        style={{
                          width: `${project.progress}%`,
                        }}
                      />
                    </div>

                    <span>{project.progress}%</span>
                  </div>

                </div>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Activity */}
      <section className="dashboard-card activity-card">

        <div className="card-header">
          <div>
            <h2>Recent Activity</h2>
            <p>Latest actions from your team</p>
          </div>

          <button className="text-button">
            View all
          </button>
        </div>

        <div className="activity-list">

          {activities.map((activity) => (
            <div
              className="activity-item"
              key={`${activity.user}-${activity.time}`}
            >

              <div className="activity-avatar">
                {activity.avatar}
              </div>

              <div className="activity-content">
                <p>
                  <strong>{activity.user}</strong>{" "}
                  {activity.action}{" "}
                  <strong>{activity.project}</strong>
                </p>

                <span>{activity.time}</span>
              </div>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Dashboard;