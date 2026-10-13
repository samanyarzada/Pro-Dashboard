function Card({ children, title, description, actions, className = "", bodyClassName = "" }) {
  const hasHeader = title || description || actions;

  return (
    <section className={`card ${className}`}>
      {hasHeader && (
        <div className="card-header">
          <div>
            {title && <h2 className="card-title">{title}</h2>}
            {description && <p className="card-description">{description}</p>}
          </div>

          {actions}
        </div>
      )}

      <div className={`card-body ${bodyClassName}`}>{children}</div>
    </section>
  );
}

export default Card;
