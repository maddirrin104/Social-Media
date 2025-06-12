import React from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FloatingSearch from './FloatingSearch';
import Avatar from './Avatar';
import '../../styles/components/HeadBar.css';

const HeadBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams();
  const isHome = location.pathname === '/';
  const isOwnProfile = location.pathname === `/profile/${user?.id}`;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleProfileClick = (e) => {
    if (isOwnProfile) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="headbar">
      <div className="headbar-left">
        <FloatingSearch />
      </div>
      <Link to="/" className="headbar-center" onClick={handleLogoClick}>
        <img src="/assets/LLlogo-02.png" alt="Logo" className="headbar-logo" />
      </Link>
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