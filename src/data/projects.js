export const TEAM = [
  { id: "AM", name: "Alex Morgan", role: "Frontend Developer" },
  { id: "SW", name: "Sarah Wilson", role: "Product Designer" },
  { id: "MB", name: "Michael Brown", role: "Backend Developer" },
  { id: "ED", name: "Emma Davis", role: "Project Manager" },
  { id: "JD", name: "James Doe", role: "QA Engineer" },
];

export const initialProjects = [
  {
    id: "1",
    name: "E-Commerce Platform",
    client: "Acme Corporation",
    description:
      "A modern e-commerce platform with product management, payments and order tracking.",
    status: "In Progress",
    category: "Web Application",
    progress: 72,
    budget: 18000,
    deadline: "2026-11-24",
    team: ["AM", "SW", "MB"],
  },
  {
    id: "2",
    name: "Mobile Banking App",
    client: "FinTech Inc.",
    description:
      "A secure mobile banking experience for managing accounts, transfers and payments.",
    status: "Completed",
    category: "Mobile App",
    progress: 100,
    budget: 32000,
    deadline: "2026-10-10",
    team: ["ED", "AM", "JD"],
  },
  {
    id: "3",
    name: "Marketing Website",
    client: "Creative Studio",
    description:
      "A high-performance marketing website focused on conversions and brand identity.",
    status: "In Progress",
    category: "Website",
    progress: 48,
    budget: 9500,
    deadline: "2026-12-08",
    team: ["SW", "MB"],
  },
  {
    id: "4",
    name: "CRM Dashboard",
    client: "Tech Solutions",
    description:
      "A complete CRM dashboard for managing customers, sales and business analytics.",
    status: "Review",
    category: "Dashboard",
    progress: 86,
    budget: 21500,
    deadline: "2026-11-02",
    team: ["AM", "ED", "JD"],
  },
  {
    id: "5",
    name: "HR Management System",
    client: "Global Corp",
    description:
      "An HR platform for employee management, payroll and internal processes.",
    status: "Planning",
    category: "Web Application",
    progress: 15,
    budget: 14000,
    deadline: "2027-01-15",
    team: ["MB", "SW"],
  },
  {
    id: "6",
    name: "Analytics Platform",
    client: "Data Labs",
    description:
      "An analytics platform for monitoring business metrics and generating reports.",
    status: "In Progress",
    category: "SaaS",
    progress: 63,
    budget: 27000,
    deadline: "2026-12-20",
    team: ["AM", "JD", "ED"],
  },
];

// Monthly revenue (USD) shown on Dashboard and Analytics.
export const monthlyRevenue = [
  { month: "Nov", value: 14200 },
  { month: "Dec", value: 16800 },
  { month: "Jan", value: 15100 },
  { month: "Feb", value: 18400 },
  { month: "Mar", value: 17300 },
  { month: "Apr", value: 20900 },
  { month: "May", value: 19800 },
  { month: "Jun", value: 22400 },
  { month: "Jul", value: 21100 },
  { month: "Aug", value: 23600 },
  { month: "Sep", value: 22800 },
  { month: "Oct", value: 24580 },
];

export const activities = [
  { id: 1, user: "Alex Morgan", action: "completed a task in", project: "E-Commerce Platform", time: "10 minutes ago" },
  { id: 2, user: "Sarah Wilson", action: "created", project: "CRM Dashboard", time: "32 minutes ago" },
  { id: 3, user: "Michael Brown", action: "updated the design of", project: "Marketing Website", time: "1 hour ago" },
  { id: 4, user: "Emma Davis", action: "commented on", project: "Mobile Banking App", time: "2 hours ago" },
];

export const initialNotifications = [
  { id: 1, text: "CRM Dashboard moved to Review", time: "12 min ago", unread: true },
  { id: 2, text: "Sarah Wilson commented on Marketing Website", time: "1 hour ago", unread: true },
  { id: 3, text: "Mobile Banking App was marked as completed", time: "Yesterday", unread: false },
];
