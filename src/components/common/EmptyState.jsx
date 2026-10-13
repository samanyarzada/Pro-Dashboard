import Icon from "./Icon";

function EmptyState({
  icon = "folder-open",
  title = "Nothing here yet",
  description = "There is nothing to display.",
  action = null,
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Icon name={icon} size={26} />
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      {action && <div className="empty-action">{action}</div>}
    </div>
  );
}

export default EmptyState;
