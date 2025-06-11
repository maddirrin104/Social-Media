import React, { useState } from 'react';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import TimeAgo from '../common/TimeAgo';
import ConfirmModal from '../common/ConfirmModal';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components/PostCard.css';
import CommentList from './CommentList';
import { postAPI } from '../../utils/api';

const PostCard = ({ post, onDeleted }) => {
  const { user: currentUser } = useAuth();
  const [commentList, setCommentList] = useState(post.commentList || []);
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(post.liked);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);

  const isOwnPost = currentUser.id === (post.author?.id ?? post.userId);

  const handleLike = async () => {
    setLoadingLike(true);
    try {
      if (liked) {
        const res = await postAPI.unlikePost(post.id);
        setLikes(res.likes); // Backend trả về số lượng likes mới
        setLiked(false);
      } else {
        const res = await postAPI.likePost(post.id);
        setLikes(res.likes);
        setLiked(true);
      } 
    } finally {
      setLoadingLike(false);
    }
  };

  const handleDelete = async () => {
    try {
      await postAPI.deletePost(post.id);
      setIsDeleteModalOpen(false);
      if (onDeleted) onDeleted(post.id);
    } catch {
      // Show error nếu cần
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-header-left">
          <Link to={`/profile/${post.author?.id || post.userId}`} className="post-avatar-link">
            <Avatar src={post.author?.avatar} alt={post.author?.name} size="small" />
          </Link>
          <div className="post-info">
            <Link to={`/profile/${post.author?.id || post.userId}`} className="post-author-link">
              <h3>{post.author?.name}</h3>
            </Link>
            <span className="post-time"><TimeAgo dateString={post.createdAt} /></span>
          </div>
        </div>
        {isOwnPost && (
          <div className="post-header-right">
            <Button 
              variant="text" 
              className="post-delete-button"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <i className="fas fa-trash"></i>
            </Button>
          </div>
        )}
      </div>
      <div className="post-content-wrapper">
        {post.image && (
          <div className="post-image-container">
            <div className="post-image">
              <img src={post.image} alt="Post content" />
            </div>
          </div>
        )}
        <div className="post-right-content">
          <div className="post-content">
            <p>{post.content}</p>
          </div>
          <div className="post-actions">
            <Button
              variant="text"
              className={`action-button${liked ? ' liked' : ''}`}
              onClick={handleLike}
              disabled={loadingLike}
            >
              <i className="fas fa-heart"></i>
              <span>{likes}</span>
            </Button>
            <Button variant="text" className="action-button">
              <i className="fas fa-comment"></i>
              <span>{commentList.length}</span>
            </Button>
          </div>
          <CommentList
            className="comments-list"
            postId={post.id}
            commentList={commentList}
            setCommentList={setCommentList}
          />
        </div>
      </div>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        message="Bạn có chắc chắn muốn xóa bài viết này?"
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

export default PostCard;