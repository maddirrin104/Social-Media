import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/SearchItem.css';

const SearchItem = ({ user }) => (
  <Link to={`/profile/${user.id}`} className="user-search-item">
    <img className="user-search-avatar" src={user.avatar} alt={user.name} />
    <div className="user-search-info">
      <div className="user-search-name">{user.name}</div>
      {user.hometown && <div className="user-search-desc">{user.hometown}</div>}
    </div>
  </Link>
);

export default SearchItem; 