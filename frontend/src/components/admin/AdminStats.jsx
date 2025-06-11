import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import '../../styles/components/admin/AdminStats.css';

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    activeUsers: 0,
    publishedPosts: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data);
      setLoading(false);
    } catch (err) {
      setError('Không thể tải thống kê');
      setLoading(false);
    }
  };

  if (loading) return <div className="admin-loading">Đang tải...</div>;
  if (error) return <div className="admin-error">{error}</div>;

  return (
    <div className="admin-stats">
      <div className="admin-stats-header">
        <h2>Thống kê hệ thống</h2>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stats-card">
          <div className="admin-stats-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="admin-stats-info">
            <span className="admin-stats-label">Tổng số người dùng</span>
            <span className="admin-stats-value">{stats.totalUsers}</span>
          </div>
        </div>

        <div className="admin-stats-card">
          <div className="admin-stats-icon">
            <i className="fas fa-user-check"></i>
          </div>
          <div className="admin-stats-info">
            <span className="admin-stats-label">Người dùng đang hoạt động</span>
            <span className="admin-stats-value">{stats.activeUsers}</span>
          </div>
        </div>

        <div className="admin-stats-card">
          <div className="admin-stats-icon">
            <i className="fas fa-newspaper"></i>
          </div>
          <div className="admin-stats-info">
            <span className="admin-stats-label">Tổng số bài viết</span>
            <span className="admin-stats-value">{stats.totalPosts}</span>
          </div>
        </div>

        <div className="admin-stats-card">
          <div className="admin-stats-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="admin-stats-info">
            <span className="admin-stats-label">Bài viết đã đăng</span>
            <span className="admin-stats-value">{stats.publishedPosts}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats; 