import React, { useState } from 'react';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import TimeAgo from '../common/TimeAgo';
import '../../styles/components/PostCard.css';
import CommentList from './CommentList';

const PostCard = ({ post }) => {
  const [commentList, setCommentList] = useState(() => post.commentList || []);
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
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
    </div>
  );
};

export default PostCard; 