import React, { useMemo } from 'react';
import NotificationItem from './NotificationItem';
import useNotifications from '../../hooks/useNotifications';
import useUsersByIds from '../../hooks/useUsersByIds';
import '../../styles/components/NotificationModal.css';

const NotificationModal = ({ open, onClose, userId, title = 'Thông báo', width = 550 }) => {
  const { notifications, loading } = useNotifications(open);

  // Lấy tất cả sender_id duy nhất từ notifications
  const senderIds = useMemo(
    () => [...new Set(notifications.map(n => n.sender_id))].filter(Boolean),
    [notifications]
  );
  const userMap = useUsersByIds(senderIds);

  if (!open) return null;

  return (
    <div className="notification-modal-overlay" onClick={onClose}>
      <div
        className="notification-modal-content"
        style={{ width }}
        onClick={e => e.stopPropagation()}
      >
        <button className="notification-modal-close" onClick={onClose} aria-label="Đóng">&times;</button>
        {title && <div className="notification-modal-title">{title}</div>}
        <div className="notification-modal-body">
          {loading ? (
            <div className="notification-modal-empty">Đang tải...</div>
          ) : notifications.length === 0 ? (
            <div className="notification-modal-empty">Không có thông báo nào.</div>
          ) : (
            <div className="notification-modal-list">
              {notifications.map((noti, idx) => (
                <NotificationItem
                  key={noti.id || idx}
                  notification={noti}
                  sender={userMap[noti.sender_id]}
                  onClose={onClose}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;