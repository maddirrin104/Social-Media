import React, { useState, useEffect } from 'react';
import FriendButton from '../friends/FriendButton';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/axiosInstance';
import useFriendActions from '../../hooks/useFriendActions';
import '../../styles/components/SearchItem.css';

const SearchItem = ({ user }) => {
  const { user: currentUser } = useAuth();
  const [friendStatus, setFriendStatus] = useState({ status: 'none', isSent: false });
  const [loadingId, setLoadingId] = useState(null);
  const [fetchingStatus, setFetchingStatus] = useState(true);

  const { sendRequest, cancelRequest, acceptRequest, unfriend } = useFriendActions();

  useEffect(() => {
    const fetchFriendStatus = async () => {
      if (!currentUser || currentUser.id === user.id) return;
      try {
        setFetchingStatus(true);
        const response = await api.get(`/friends/status/${user.id}`);
        setFriendStatus(response.data);
      } catch (error) {
        console.error('Error fetching friend status:', error);
      } finally {
        setFetchingStatus(false);
      }
    };

    fetchFriendStatus();
  }, [currentUser, user.id]);

  const handleFriendAction = async () => {
    if (!currentUser || currentUser.id === user.id) return;
    setLoadingId(user.id);
    try {
      if (friendStatus.status === 'none') {
        await sendRequest(user);
      } else if (friendStatus.status === 'pending' && friendStatus.isSent) {
        await cancelRequest(user);
      } else if (friendStatus.status === 'pending' && !friendStatus.isSent) {
        await acceptRequest(user);
      } else if (friendStatus.status === 'accepted') {
        await unfriend(user);
      }
      // Sau bất kỳ thao tác nào, fetch lại trạng thái mới
      const res = await api.get(`/friends/status/${user.id}`);
      setFriendStatus(res.data);
    } catch (error) {
      console.error('Error updating friend status:', error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="user-search-item">
      <Link to={`/profile/${user.id}`}>
        <img className="user-search-avatar" src={user.avatar} alt={user.name} />
      </Link>
      <div className="user-search-info">
        <Link to={`/profile/${user.id}`}>
          <div className="user-search-name">{user.name}</div>
        </Link>
        {user.hometown && <div className="user-search-desc">{user.hometown}</div>}
      </div>
      <div className="user-search-action">
        {currentUser && currentUser.id !== user.id && (
          <FriendButton
            status={friendStatus.status}
            isSent={friendStatus.isSent}
            loading={loadingId === user.id || fetchingStatus}
            onClick={handleFriendAction}
            className="friend-button-search"
          />
        )}
      </div>
    </div>
  );
};

export default SearchItem; 