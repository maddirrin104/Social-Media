import React from 'react';
import FriendList from '../components/friends/FriendList';
import { useAuth } from '../context/AuthContext';
import '../styles/pages/Friends.css';

const Friends = () => {
  const { user } = useAuth();

  return (
    <div className="friends-page">
      <div className="friends-container">
        <h1>Bạn bè</h1>
        <FriendList userId={user.id} />
      </div>
    </div>
  );
};

export default Friends;
