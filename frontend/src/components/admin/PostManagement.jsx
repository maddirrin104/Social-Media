import React, { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import Button from '../common/Button';
import '../../styles/components/admin/PostManagement.css';

const PostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/admin/posts');
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Không thể tải danh sách bài viết');
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      return;
    }

    try {
      await api.delete(`/admin/posts/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      setError('Không thể xóa bài viết');
    }
  };

  if (loading) return <div className="admin-loading">Đang tải...</div>;
  if (error) return <div className="admin-error">{error}</div>;

  return (
    <div className="admin-post-management">
      <div className="admin-post-header">
        <h2>Quản lý bài viết</h2>
        <div className="admin-post-stats">
          <div className="admin-stat-card">
            <span className="admin-stat-label">Tổng số bài viết</span>
            <span className="admin-stat-value">{posts.length}</span>
          </div>
        </div>
      </div>

      <div className="admin-post-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tiêu đề</th>
              <th>Tác giả</th>
              <th>Ngày đăng</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td className="admin-post-title">{post.title}</td>
                <td>{post.author.name}</td>
                <td>{new Date(post.created_at).toLocaleDateString('vi-VN')}</td>
                <td>
                  <span className={`admin-post-status ${post.status}`}>
                    {post.status === 'published' ? 'Đã đăng' : 'Đang chờ duyệt'}
                  </span>
                </td>
                <td>
                  <div className="admin-post-actions">
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => window.open(`/post/${post.id}`, '_blank')}
                    >
                      Xem
                    </Button>
                    <Button
                      variant="danger"
                      size="small"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      Xóa
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostManagement; 