import React from 'react';
import useFriendLists from '../../hooks/useFriendLists'; // Đường dẫn tùy thuộc vào cấu trúc thư mục
import '../../styles/components/ChatSidebar.css';

const ChatSidebar = ({ selectedId, onSelect, userId, }) => {
  const [search, setSearch] = React.useState('');
  const { friends, loading } = useFriendLists(userId);

  const filtered = friends.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/';

  function getAvatarUrl(avatarPath) {
    if (!avatarPath) return '/images/default-avatar.png';
    if (avatarPath.startsWith('http')) return avatarPath;
    return BASE_URL + 'storage/' + avatarPath;
  }

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
        {loading ? (
          <div className="chat-sidebar-loading">Loading...</div>
        ) : (
          filtered.map(u => (
            <div
              key={u.id}
              onClick={() => onSelect(u.id)}
              className={`chat-sidebar-item${selectedId === u.id ? ' selected' : ''}`}
            >
              <img src={getAvatarUrl(u.avatar)} alt={u.name} className="chat-sidebar-avatar" />
              <div>
                <div className="chat-sidebar-name">{u.name}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
