import React from 'react';
import { getFriendList, friendships } from '../../data/friendships';
import { users } from '../../data/users';

const ChatSidebar = ({ selectedId, onSelect, userId }) => {
  const [search, setSearch] = React.useState('');
  // Lấy danh sách bạn bè thật
  const friends = userId ? getFriendList(userId, friendships) : [];
  const filtered = friends.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{width: 260, background: '#f7f9fa', borderRight: '1px solid #eee', height: '100%', display: 'flex', flexDirection: 'column'}}>
      <input
        type="text"
        placeholder="Search contact"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{margin: 16, padding: 8, borderRadius: 8, border: '1px solid #ddd'}}
      />
      <div style={{flex: 1, overflowY: 'auto'}}>
        {filtered.map(u => (
          <div
            key={u.id}
            onClick={() => onSelect(u.id)}
            style={{display: 'flex', alignItems: 'center', padding: '10px 16px', cursor: 'pointer', background: selectedId === u.id ? '#e6f7ff' : 'transparent'}}
          >
            <img src={u.avatar} alt={u.name} style={{width: 40, height: 40, borderRadius: '50%', marginRight: 12}} />
            <div>
              <div style={{fontWeight: 600}}>{u.name}</div>
              {/* Có thể bổ sung trạng thái online nếu muốn */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar; 