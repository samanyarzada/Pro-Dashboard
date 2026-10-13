export const STATUSES = ["Planning", "In Progress", "Review", "Completed"];

export const CATEGORIES = [
  "Web Application",
  "Mobile App",
  "Website",
  "Dashboard",
  "SaaS",
  "Other",
];

export function getStatusVariant(status) {
  switch (status) {
    case "Completed":
      return "success";
    case "Review":
      return "warning";
    case "In Progress":
      return "info";
    default:
      return "default";
  }
}
