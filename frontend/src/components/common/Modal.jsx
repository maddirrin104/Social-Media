import React from 'react';
import '../../styles/components/Modal.css';

const Modal = ({ open, onClose, title, children, width = 400 }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ width }}
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Đóng">
          &times;
        </button>
        {title && <div className="modal-title">{title}</div>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal; 