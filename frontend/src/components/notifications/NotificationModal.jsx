import React from 'react';
import NotificationItem from './NotificationItem';
import '../../styles/components/NotificationModal.css';

const NotificationModal = ({ open, onClose, notifications = [], userId, title = 'Thông báo', width = 550 }) => {
  if (!open) return null;
  const filtered = userId ? notifications.filter(n => n.receiverId === userId) : notifications;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="notification-modal-content"
        style={{ width }}
        onClick={e => e.stopPropagation()}
      >
        <button className="notification-modal-close" onClick={onClose} aria-label="Đóng">&times;</button>
        {title && <div className="notification-modal-title">{title}</div>}
        <div className="notification-modal-body">
          {filtered.length === 0 ? (
            <div className="notification-empty">Không có thông báo nào.</div>
          ) : (
            <div className="notification-list">
              {filtered.map((noti, idx) => (
                <NotificationItem key={noti.id || idx} notification={noti} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal; 