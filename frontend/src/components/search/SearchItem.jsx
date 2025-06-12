import React from 'react';
import Button from '../common/Button';
import '../../styles/components/SearchItem.css';

const SearchItem = ({ user }) => (
  <div className="user-search-item">
    <img className="user-search-avatar" src={user.avatar} alt={user.name} />
    <div className="user-search-info">
      <div className="user-search-name">{user.name}</div>
      {user.hometown && <div className="user-search-desc">{user.hometown}</div>}
    </div>
    <div className="user-search-action">
      <Button variant="primary">Thêm bạn bè</Button>
    </div>
  </div>
);

export default SearchItem; 