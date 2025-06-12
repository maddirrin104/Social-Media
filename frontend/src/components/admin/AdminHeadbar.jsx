import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import '../../styles/components/admin/AdminHeadbar.css';

const AdminHeadbar = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleTabClick = (tab) => {
    if (location.pathname !== '/admin') {
      navigate('/admin');
    }
    onTabChange(tab);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="admin-headbar">
      <div className="admin-headbar-header">
        <Link to="/admin" className="admin-headbar-header-link">
          <h2>Admin Dashboard</h2>
        </Link>
      </div>
      
      <nav className="admin-headbar-nav">
        <button 
          className={`admin-headbar-nav-item ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => handleTabClick('users')}
        >
          <i className="fas fa-users"></i>
          Quản lý người dùng
        </button>
        
        <button 
          className={`admin-headbar-nav-item ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => handleTabClick('posts')}
        >
          <i className="fas fa-newspaper"></i>
          Quản lý bài viết
        </button>
        
      </nav>

      <Button
        variant="danger"
        onClick={handleLogout}
        className="admin-headbar-logout"
      >
        Đăng xuất
        <i className="fas fa-sign-out-alt"></i>
      </Button>
    </div>
  );
};

export default AdminHeadbar; 