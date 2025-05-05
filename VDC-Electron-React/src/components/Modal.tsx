import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  // Optional: add props for title, custom styles, etc.
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // Use React Portal to render the modal outside the main component hierarchy
  // This helps with stacking context and styling.
  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}> {/* Close on overlay click */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}> {/* Prevent closing when clicking inside content */}
        <button className={styles.closeButton} onClick={onClose}>
          &times; {/* Unicode multiplication sign for 'X' */}
        </button>
        {children}
      </div>
    </div>,
    document.body // Render modal directly into the body element
  );
};

export default Modal;
