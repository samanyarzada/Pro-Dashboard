function Loading({
  text = "Loading...",
  fullScreen = false,
}) {
  return (
    <div
      className={`ui-loading ${
        fullScreen ? "ui-loading-fullscreen" : ""
      }`}
    >
      <div className="ui-spinner" />

      <span>{text}</span>
    </div>
  );
}

export default Loading;