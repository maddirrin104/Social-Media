import React from 'react';
import NotificationList from '../components/notifications/NotificationModal';
import '../styles/pages/Notifications.css';
import { notifications as sampleNotifications } from '../data/notification';

const Notifications = () => {
  const [notifications, setNotifications] = React.useState([]);

  React.useEffect(() => {
    // Sử dụng dữ liệu mẫu
    setNotifications(sampleNotifications);
  }, []);

  return (
    <div className="notifications-page">
      <h1>Thông báo</h1>
      <NotificationList notifications={notifications} />
    </div>
  );
};

export default Notifications; 