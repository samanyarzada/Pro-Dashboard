function Button({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`ui-button ui-button-${variant} ui-button-${size} ${className}`}
    >
      {loading ? (
        <>
          <span className="ui-button-spinner" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;