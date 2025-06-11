import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components/admin/AdminSidebar.css';

const AdminSidebar = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      
      <nav className="admin-sidebar-nav">
        <button 
          className={`admin-sidebar-nav-item ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => onTabChange('users')}
        >
          <i className="fas fa-users"></i>
          Quản lý người dùng
        </button>
        
        <button 
          className={`admin-sidebar-nav-item ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => onTabChange('posts')}
        >
          <i className="fas fa-newspaper"></i>
          Quản lý bài viết
        </button>
        
        <button 
          className={`admin-sidebar-nav-item ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => onTabChange('stats')}
        >
          <i className="fas fa-chart-bar"></i>
          Thống kê
        </button>
      </nav>

      <div className="admin-sidebar-footer">
        <button className="admin-sidebar-logout" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar; 