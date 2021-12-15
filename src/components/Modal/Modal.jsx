import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import cs from "./Modal.module.css";

const rootModal = document.querySelector("#rootModal");

export default function Modal({ onClose, children }) {
  const firstRender = useRef(true);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (firstRender.current) {
      firstRender.current = false;
    }
    return window.removeEventListener("keydown", handleKeyDown);
  });

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={cs.Overlay} onClick={handleBackdropClick}>
      <div className={cs.Modal}>{children}</div>
    </div>,
    rootModal
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
};
