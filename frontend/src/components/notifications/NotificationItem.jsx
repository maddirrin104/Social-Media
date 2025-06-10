import React from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../../data/users';
import Avatar from '../common/Avatar';
import TimeAgo from '../common/TimeAgo';
import '../../styles/components/NotificationItem.css';

const NotificationItem = ({ notification, onClose }) => {
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
    onClose?.();
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
          <TimeAgo dateString={notification.createdAt} />
        </div>
      </div>
    </div>
  );
};

export default NotificationItem; 