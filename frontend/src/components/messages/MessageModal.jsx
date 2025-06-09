import React from 'react';
import '../../styles/components/Modal.css';

const MessageModal = ({ open, onClose, children, width = 800, title = 'Tin nhắn' }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ width, maxWidth: '95vw', height: '80vh', maxHeight: '95vh', display: 'flex', flexDirection: 'row', padding: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Đóng">&times;</button>
        {title && <div className="modal-title" style={{marginBottom:0}}>{title}</div>}
        <div style={{display:'flex', flex:1, height:'100%'}}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MessageModal; 