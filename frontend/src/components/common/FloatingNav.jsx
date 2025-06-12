import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components/FloatingNav.css';

const FloatingNav = ({ onOpenNotification, onOpenMessages, onOpenFriendRequest }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isHome = location.pathname === '/';
  const isOwnProfile = location.pathname === `/profile/${user?.id}`;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleHomeClick = () => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleProfileClick = () => {
    if (isOwnProfile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(`/profile/${user.id}`);
    }
  };

  const navItems = [
    {
      icon: 'fas fa-envelope',
      label: 'Tin nhắn',
      onClick: onOpenMessages,
      position: 'bottom-right',
      hoverWidth: '130px'
    },
    {
      icon: 'fas fa-user-friends',
      label: 'Lời mời kết bạn',
      onClick: onOpenFriendRequest,
      position: 'bottom-right',
      hoverWidth: '180px'
    },
    {
      icon: 'fas fa-bell',
      label: 'Thông báo',
      onClick: onOpenNotification,
      position: 'bottom-right',
      hoverWidth: '145px'
    },
    {
      icon: 'fas fa-user',
      label: 'Trang cá nhân',
      onClick: handleProfileClick,
      position: 'bottom-right',
      hoverWidth: '170px'
    },
    {
      icon: 'fas fa-home',
      label: 'Trang chủ',
      onClick: handleHomeClick,
      position: 'bottom-right',
      hoverWidth: '142px'
    }
  ];

  return (
    <>
      {navItems.map((item, index) => (
        <div
          key={index}
          className={`floating-nav-item ${item.position}`}
          onClick={item.onClick}
          style={{ 
            bottom: `${ 40 + index * 80}px`,
            '--hover-width': item.hoverWidth
          }}
        >
          <i className={item.icon}></i>
          <span className="nav-tooltip">{item.label}</span>
        </div>
      ))}
    </>
  );
};

export default FloatingNav; 