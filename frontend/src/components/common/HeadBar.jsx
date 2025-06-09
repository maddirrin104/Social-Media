import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FloatingSearch from './FloatingSearch';
import Avatar from './Avatar';
import '../../styles/components/HeadBar.css';

const HeadBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleProfileClick = () => {
    navigate(`/profile/${user?.id}`);
  };

  return (
    <div className="headbar">
      <div className="headbar-left">
        <FloatingSearch />
      </div>
      <div className="headbar-right">
        <div className="user-info" onClick={handleProfileClick}>
          <span className="username">{user?.name}</span>
          <Avatar 
            src={user?.avatar} 
            alt={user?.name || 'User avatar'}
            size="small"
          />
        </div>
        <button onClick={handleLogout} className="logout-btn" title="Đăng xuất">
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </div>
  );
};

export default HeadBar; 