import { useEffect } from "react";

function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
}) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="ui-modal-overlay"
      onMouseDown={onClose}
    >
      <div
        className={`ui-modal ui-modal-${size}`}
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <div className="ui-modal-header">
          <h2>{title}</h2>

          <button
            type="button"
            className="ui-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="ui-modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;