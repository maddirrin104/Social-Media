import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/axiosInstance'; 

// Hook lấy danh sách bạn bè, lời mời đã nhận, đã gửi
export default function useFriendLists(userId) {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [friendsRes, receivedRes, sentRes, suggestionRes] = await Promise.all([
        api.get('/friends'),
        api.get('/friends/requests/received'),
        api.get('/friends/requests/sent'),
        api.get('/friends/suggestions')
      ]);
      setFriends(friendsRes.data || []);
      setReceived(receivedRes.data || []);
      setSent(sentRes.data || []);
      setSuggestions(suggestionRes.data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    fetchAll();
  }, [fetchAll, userId, user]);

  return {
    friends,
    received,
    sent,
    loading,
    suggestions,
    refetch: fetchAll,
  };
}