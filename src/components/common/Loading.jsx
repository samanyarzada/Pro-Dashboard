function Loading({ text = "Loading…", fullScreen = false }) {
  return (
    <div className={`loading ${fullScreen ? "loading-fullscreen" : ""}`} role="status">
      <div className="spinner" />
      <span>{text}</span>
    </div>
  );
}

export default Loading;
