import React from 'react';
import '../../styles/components/MessageModal.css';

const MessageModal = ({ open, onClose, children, width = 800, title = 'Tin nhắn' }) => {
  if (!open) return null;
  return (
    <div className="message-modal-overlay" onClick={onClose}>
      <div
        className="message-modal-content"
        style={{ width, maxWidth: '95vw' }}
        onClick={e => e.stopPropagation()}
      >
        <button className="message-modal-close" onClick={onClose} aria-label="Đóng">&times;</button>
        {title && <div className="message-modal-title">{title}</div>}
        <div className="message-modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MessageModal; 