import React, { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import UserManagement from '../components/admin/UserManagement';
import PostManagement from '../components/admin/PostManagement';
import '../styles/pages/AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      case 'posts':
        return <PostManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="admin-main">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard; 