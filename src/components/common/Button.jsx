function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  block = false,
  disabled = false,
  loading = false,
  className = "",
  ...rest
}) {
  const classes = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    block ? "btn-block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} disabled={disabled || loading} {...rest}>
      {loading && <span className="btn-spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}

export default Button;
