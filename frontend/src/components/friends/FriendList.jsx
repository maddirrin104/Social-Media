import React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import { getFriendList } from '../../data/friendships.js';
import { friendships } from '../../data/friendships.js';
import '../../styles/components/FriendList.css';

const FriendList = ({ userId }) => {
  const navigate = useNavigate();
  const [friends, setFriends] = React.useState([]);

  React.useEffect(() => {
    console.log('Current userId:', userId);
    console.log('All friendships:', friendships);
    
    // Lấy danh sách bạn bè từ friendships.js
    const friendList = getFriendList(userId, friendships);
    console.log('Friend list after filtering:', friendList);
    
    setFriends(friendList);
  }, [userId]);

  console.log('Current friends state:', friends);

  return (
    <div className="friend-list">
      <h2>Bạn bè</h2>
      <div className="friends-grid">
        {friends.map(friend => (
          <div key={friend.id} className="friend-card">
            <Avatar
              src={friend.avatar}
              alt={friend.name}
              size="medium"
              onClick={() => navigate(`/profile/${friend.id}`)}
            />
            <h3>{friend.name}</h3>
            <Button variant="secondary" size="small">
              Nhắn tin
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList; 