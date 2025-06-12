import { useState, useEffect } from 'react';
import api from '../utils/axiosInstance';

export default function useNotifications(open) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return; // chỉ fetch khi modal mở
    setLoading(true);
    api.get('/notifications')
      .then(res => setNotifications(res.data))
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false));
  }, [open]);

  return { notifications, loading, setNotifications };
}