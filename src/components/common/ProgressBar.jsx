function ProgressBar({ value, variant = "", large = false, label }) {
  const safe = Math.min(100, Math.max(0, Number(value) || 0));

  return (
    <div
      className={`progress ${large ? "progress-lg" : ""}`}
      role="progressbar"
      aria-valuenow={safe}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className={`progress-fill ${variant ? `progress-fill-${variant}` : ""}`}
        style={{ width: `${safe}%` }}
      />
    </div>
  );
}

export default ProgressBar;
