import React, { useState, useEffect } from 'react';
import ConfirmModal from '../common/ConfirmModal';
import PostCard from '../post/PostCard';
import { postAPI } from '../../utils/api';
import '../../styles/components/admin/PostManagement.css';

const PostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [deletePostId, setDeletePostId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchPosts = async () => {
    const postList = await postAPI.getPosts();
    setPosts(postList);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostDeleted = (postId) => {
    setPosts(prev => prev.filter(item => item.id !== postId));
    setIsDeleteModalOpen(false);
    setDeletePostId(null);
  };

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
      <div className="admin-post-list">
        {posts.length === 0 ? (
          <div className="admin-empty">Không có bài viết nào.</div>
        ) : (
          posts.map(post => (
            <div key={post.id} style={{ marginBottom: '2rem' }}>
              <PostCard post={post} onDeleted={handlePostDeleted} />
            </div>
          ))
        )}
      </div>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        message="Bạn có chắc chắn muốn xóa bài viết này?"
        onConfirm={() => handlePostDeleted(deletePostId)}
        onCancel={() => { setIsDeleteModalOpen(false); setDeletePostId(null); }}
      />
    </div>
  );
};

export default PostManagement; 