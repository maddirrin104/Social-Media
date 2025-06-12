import { useState, useEffect, useCallback } from 'react';
import api from '../utils/axiosInstance'; 

// Hook lấy danh sách bạn bè, lời mời đã nhận, đã gửi
export default function useFriendLists(userId) {
  const [friends, setFriends] = useState([]);
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [friendsRes, receivedRes, sentRes] = await Promise.all([
        api.get('/friends'),
        api.get('/friends/requests/received'),
        api.get('/friends/requests/sent'),
      ]);
      setFriends(friendsRes.data || []);
      setReceived(receivedRes.data || []);
      setSent(sentRes.data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll, userId]);

  return {
    friends,
    received,
    sent,
    loading,
    refetch: fetchAll,
  };
}