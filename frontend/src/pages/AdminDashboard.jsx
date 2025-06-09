import React, { useState } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import '../styles/pages/AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  // Dummy data
  const users = [
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', status: 'active' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', status: 'inactive' },
  ];

  const posts = [
    { id: 1, title: 'Bài viết 1', author: 'Nguyễn Văn A', status: 'published' },
    { id: 2, title: 'Bài viết 2', author: 'Trần Thị B', status: 'pending' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Quản trị hệ thống</h1>
        <div className="admin-tabs">
          <Button
            variant={activeTab === 'users' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('users')}
          >
            Quản lý người dùng
          </Button>
          <Button
            variant={activeTab === 'posts' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('posts')}
          >
            Quản lý bài viết
          </Button>
        </div>
      </div>

      <div className="admin-content">
        {activeTab === 'users' ? (
          <div className="users-management">
            <h2>Danh sách người dùng</h2>
            <div className="users-list">
              {users.map(user => (
                <Card key={user.id} className="user-card">
                  <div className="user-info">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <span className={`status ${user.status}`}>
                      {user.status === 'active' ? 'Đang hoạt động' : 'Không hoạt động'}
                    </span>
                  </div>
                  <div className="user-actions">
                    <Button variant="secondary" size="small">
                      Chỉnh sửa
                    </Button>
                    <Button variant="danger" size="small">
                      Khóa
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="posts-management">
            <h2>Danh sách bài viết</h2>
            <div className="posts-list">
              {posts.map(post => (
                <Card key={post.id} className="post-card">
                  <div className="post-info">
                    <h3>{post.title}</h3>
                    <p>Tác giả: {post.author}</p>
                    <span className={`status ${post.status}`}>
                      {post.status === 'published' ? 'Đã đăng' : 'Đang chờ duyệt'}
                    </span>
                  </div>
                  <div className="post-actions">
                    <Button variant="secondary" size="small">
                      Xem chi tiết
                    </Button>
                    <Button variant="danger" size="small">
                      Xóa
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 