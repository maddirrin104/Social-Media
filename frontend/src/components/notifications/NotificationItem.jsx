import React from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../../data/users';
import Avatar from '../common/Avatar';
import '../../styles/components/NotificationItem.css';

const NotificationItem = ({ notification }) => {
  const navigate = useNavigate();
  const sender = users.find(u => u.id === notification.senderId);

  const handleClick = () => {
    if (notification.type === 'friend_request') {
      navigate('/friends');
    } else if (notification.type === 'like' || notification.type === 'comment') {
      navigate(`/profile/${notification.senderId}`);
    } else {
      navigate('/notifications');
    }
  };

  return (
    <div
      className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
      onClick={handleClick}
      tabIndex={0}
      role="button"
    >
      <Avatar src={sender?.avatar} alt={sender?.name} size="small" className="notification-avatar" />
      <div className="notification-content">
        <div className="notification-title">{notification.title}</div>
        <div className="notification-time">
          {new Date(notification.createdAt).toLocaleString('vi-VN', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem; 