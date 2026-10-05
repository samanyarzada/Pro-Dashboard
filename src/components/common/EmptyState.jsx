function EmptyState({
  icon = "📭",
  title = "No data found",
  description = "There is nothing to display here.",
  action = null,
}) {
  return (
    <div className="ui-empty-state">
      <div className="ui-empty-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      {action && (
        <div className="ui-empty-action">
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyState;