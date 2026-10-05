function Card({
  children,
  title,
  description,
  actions,
  className = "",
}) {
  return (
    <section className={`ui-card ${className}`}>
      {(title || description || actions) && (
        <div className="ui-card-header">
          <div>
            {title && (
              <h2 className="ui-card-title">
                {title}
              </h2>
            )}

            {description && (
              <p className="ui-card-description">
                {description}
              </p>
            )}
          </div>

          {actions && (
            <div className="ui-card-actions">
              {actions}
            </div>
          )}
        </div>
      )}

      <div className="ui-card-body">
        {children}
      </div>
    </section>
  );
}

export default Card;