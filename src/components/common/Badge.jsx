function Badge({ children, variant = "default", dot = false }) {
  return (
    <span className={`badge badge-${variant} ${dot ? "badge-dot" : ""}`}>{children}</span>
  );
}

export default Badge;
