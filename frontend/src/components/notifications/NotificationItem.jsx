import React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../common/Avatar';
import TimeAgo from '../common/TimeAgo';
import '../../styles/components/NotificationItem.css';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/';

function getAvatarUrl(avatarPath) {
  if (!avatarPath) return '/images/default-avatar.png';
  // Nếu backend trả 'avatars/user1.jpg', cần thêm '/storage/' hoặc domain tùy cấu hình BE
  // Nếu public_path('storage'), thì ảnh sẽ ở '/storage/avatars/user1.jpg'
  if (avatarPath.startsWith('http')) return avatarPath;
  return BASE_URL + 'storage/' + avatarPath;
}

const NotificationItem = ({ notification, sender, onClose }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (notification.type === 'friend_request') {
      navigate('/friends');
    } else if (notification.type === 'like' || notification.type === 'comment') {
      navigate(`/profile/${sender?.id}`);
    } else {
      navigate('/notifications');
    }
    onClose?.();
  };

  return (
    <div
      className={`notification-item ${notification.is_read ? 'read' : 'unread'}`}
      onClick={handleClick}
      tabIndex={0}
      role="button"
    >
      <Avatar src={getAvatarUrl(sender?.avatar)} alt={sender?.name} size="small" className="notification-avatar" />
      <div className="notification-content">
        <div className="notification-title">{notification.title}</div>
        <div className="notification-time">
          <TimeAgo dateString={notification.created_at} />
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;