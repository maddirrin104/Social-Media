import React, { useState } from 'react';
import AdminHeadbar from '../components/admin/AdminHeadbar';
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
      <AdminHeadbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="admin-main">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard; 