import { CircleX } from "lucide-react";
import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

// Portal implementation to improve accessibility and DOM structure
const modalRoot = document.getElementById("modal-root");

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen || !modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-content"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <CircleX />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
