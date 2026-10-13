// Small inline icon set (24×24, stroke-based). Avoids an extra dependency.
// Strings are <path d>; objects describe other shapes.

const circle = (cx, cy, r) => ({ t: "circle", cx, cy, r });
const rect = (x, y, width, height, rx = 0) => ({ t: "rect", x, y, width, height, rx });

const ICONS = {
  logo: ["M7 20V4h6a4.5 4.5 0 0 1 0 9H7"],
  dashboard: [rect(3, 3, 7, 9, 1), rect(14, 3, 7, 5, 1), rect(14, 12, 7, 9, 1), rect(3, 16, 7, 5, 1)],
  folder: ["M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"],
  "folder-open": ["m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"],
  "trending-up": ["M22 7 13.5 15.5 8.5 10.5 2 17", "M16 7h6v6"],
  "trending-down": ["M22 17 13.5 8.5 8.5 13.5 2 7", "M16 17h6v-6"],
  user: ["M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", circle(12, 7, 4)],
  users: ["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", circle(9, 7, 4), "M22 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"],
  sliders: ["M21 4h-7", "M10 4H3", "M21 12h-9", "M8 12H3", "M21 20h-5", "M12 20H3", "M14 2v4", "M8 10v4", "M16 18v4"],
  bell: ["M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9", "M10.3 21a1.94 1.94 0 0 0 3.4 0"],
  sun: [circle(12, 12, 4), "M12 2v2", "M12 20v2", "m4.93 4.93 1.41 1.41", "m17.66 17.66 1.41 1.41", "M2 12h2", "M20 12h2", "m6.34 17.66-1.41 1.41", "m19.07 4.93-1.41 1.41"],
  moon: ["M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"],
  menu: ["M4 12h16", "M4 6h16", "M4 18h16"],
  x: ["M18 6 6 18", "m6 6 12 12"],
  search: [circle(11, 11, 8), "m21 21-4.3-4.3"],
  plus: ["M5 12h14", "M12 5v14"],
  trash: ["M3 6h18", "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"],
  pencil: ["M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z", "m15 5 4 4"],
  check: ["M20 6 9 17l-5-5"],
  "check-circle": ["M22 11.08V12a10 10 0 1 1-5.93-9.14", "m9 11 3 3L22 4"],
  "alert-circle": [circle(12, 12, 10), "M12 8v4", "M12 16h.01"],
  "alert-triangle": ["m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3", "M12 9v4", "M12 17h.01"],
  info: [circle(12, 12, 10), "M12 16v-4", "M12 8h.01"],
  "log-out": ["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", "m16 17 5-5-5-5", "M21 12H9"],
  eye: ["M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z", circle(12, 12, 3)],
  "eye-off": ["M9.88 9.88a3 3 0 1 0 4.24 4.24", "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68", "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61", "m2 2 20 20"],
  "chevron-right": ["m9 18 6-6-6-6"],
  "chevron-down": ["m6 9 6 6 6-6"],
  "arrow-left": ["m12 19-7-7 7-7", "M19 12H5"],
  calendar: [rect(3, 4, 18, 18, 2), "M16 2v4", "M8 2v4", "M3 10h18"],
  dollar: ["M12 2v20", "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"],
  clock: [circle(12, 12, 10), "M12 6v6l4 2"],
  shield: ["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"],
  lock: [rect(3, 11, 18, 11, 2), "M7 11V7a5 5 0 0 1 10 0v4"],
  briefcase: [rect(2, 7, 20, 14, 2), "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"],
  mail: [rect(2, 4, 20, 16, 2), "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"],
  refresh: ["M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", "M21 3v5h-5", "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", "M8 16H3v5"],
};

function Icon({ name, size = 18, strokeWidth = 2, className = "" }) {
  const shapes = ICONS[name];
  if (!shapes) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {shapes.map((shape, index) => {
        if (typeof shape === "string") return <path key={index} d={shape} />;
        const { t, ...props } = shape;
        return t === "circle" ? <circle key={index} {...props} /> : <rect key={index} {...props} />;
      })}
    </svg>
  );
}

export default Icon;
