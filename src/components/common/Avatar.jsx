import { getInitials } from "../../utils/format";

function Avatar({ name, initials, size = "md", title }) {
  const label = initials || getInitials(name);

  return (
    <span className={`avatar avatar-${size}`} title={title || name} aria-label={title || name}>
      {label}
    </span>
  );
}

export default Avatar;
