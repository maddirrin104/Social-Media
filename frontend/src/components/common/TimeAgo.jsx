import React, { useState, useEffect } from 'react';

const TimeAgo = ({ dateString }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const calculateTimeAgo = () => {
      const date = new Date(dateString);
      const now = new Date();
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);

      if (diffInMinutes < 60) {
        setTimeAgo(`${diffInMinutes} phút trước`);
      } else if (diffInHours < 24) {
        setTimeAgo(`${diffInHours} giờ trước`);
      } else if (diffInDays < 4) {
        setTimeAgo(`${diffInDays} ngày trước`);
      } else {
        // Format: DD/MM/YYYY
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        setTimeAgo(`${day}/${month}/${year}`);
      }
    };

    calculateTimeAgo();
    // Cập nhật mỗi phút
    const interval = setInterval(calculateTimeAgo, 60000);

    return () => clearInterval(interval);
  }, [dateString]);

  return <span>{timeAgo}</span>;
};

export default TimeAgo; 