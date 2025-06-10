import React, { useState } from 'react';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import TimeAgo from '../common/TimeAgo';
import ConfirmModal from '../common/ConfirmModal';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components/PostCard.css';
import CommentList from './CommentList';

const PostCard = ({ post }) => {
  const { user: currentUser } = useAuth();
  const [commentList, setCommentList] = useState(() => post.commentList || []);
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isOwnPost = currentUser.id === post.author.id;

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  const handleDelete = () => {
    // TODO: Implement delete post logic
    console.log('Deleting post:', post.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-header-left">
          <Link to={`/profile/${post.author.id}`} className="post-avatar-link">
            <Avatar src={post.author.avatar} alt={post.author.name} size="small" />
          </Link>
          <div className="post-info">
            <Link to={`/profile/${post.author.id}`} className="post-author-link">
              <h3>{post.author.name}</h3>
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
            <Button variant="text" className={`action-button${liked ? ' liked' : ''}`} onClick={handleLike}>
              <i className="fas fa-heart"></i>
              <span>{likes}</span>
            </Button>
            <Button variant="text" className="action-button">
              <i className="fas fa-comment"></i>
              <span>{commentList.length}</span>
            </Button>
          </div>
          <CommentList className="comments-list" commentList={commentList} setCommentList={setCommentList} />
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