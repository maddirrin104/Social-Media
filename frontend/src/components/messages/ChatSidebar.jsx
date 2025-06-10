import React from 'react';
import { getFriendList, friendships } from '../../data/friendships';
import { users } from '../../data/users';
import '../../styles/components/ChatSidebar.css';

const ChatSidebar = ({ selectedId, onSelect, userId }) => {
  const [search, setSearch] = React.useState('');
  // Lấy danh sách bạn bè thật
  const friends = userId ? getFriendList(userId, friendships) : [];
  const filtered = friends.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="chat-sidebar">
      <input
        type="text"
        className="chat-sidebar-search"
        placeholder="Search contact"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="chat-sidebar-list">
        {filtered.map(u => (
          <div
            key={u.id}
            onClick={() => onSelect(u.id)}
            className={`chat-sidebar-item${selectedId === u.id ? ' selected' : ''}`}
          >
            <img src={u.avatar} alt={u.name} className="chat-sidebar-avatar" />
            <div>
              <div className="chat-sidebar-name">{u.name}</div>
              {/* Có thể bổ sung trạng thái online nếu muốn */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar; 