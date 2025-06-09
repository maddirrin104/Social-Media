import React from 'react';
import NotificationItem from './NotificationItem';
import '../../styles/components/NotificationList.css';

const NotificationList = ({ notifications = [], userId }) => {
  const filtered = userId ? notifications.filter(n => n.receiverId === userId) : notifications;
  if (filtered.length === 0) {
    return <div className="notification-empty">Không có thông báo nào.</div>;
  }
  return (
    <div className="notification-list">
      {filtered.map((noti, idx) => (
        <NotificationItem key={noti.id || idx} notification={noti} />
      ))}
    </div>
  );
};

export default NotificationList; 