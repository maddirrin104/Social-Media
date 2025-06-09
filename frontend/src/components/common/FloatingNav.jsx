import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components/FloatingNav.css';

const FloatingNav = ({ onOpenNotification, onOpenMessages, onOpenFriendRequest }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    {
      icon: 'fas fa-sign-out-alt',
      label: 'Đăng xuất',
      onClick: handleLogout,
      position: 'bottom-right',
      hoverWidth: '145px'
    },
    {
      icon: 'fas fa-user-friends',
      label: 'Lời mời kết bạn',
      onClick: onOpenFriendRequest,
      position: 'bottom-right',
      hoverWidth: '180px'
    },
    {
      icon: 'fas fa-envelope',
      label: 'Tin nhắn',
      onClick: onOpenMessages,
      position: 'bottom-right',
      hoverWidth: '130px'
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
      onClick: () => navigate(`/profile/${user.id}`),
      position: 'bottom-right',
      hoverWidth: '170px'
    },
    {
      icon: 'fas fa-home',
      label: 'Trang chủ',
      onClick: () => navigate('/'),
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