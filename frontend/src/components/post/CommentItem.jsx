import React from 'react';
import { Link } from 'react-router-dom';
import { users } from '../../data/users';
import '../../styles/components/CommentItem.css';

const CommentItem = ({ comment }) => {
  const user = users.find(u => u.id === comment.userId);
  return (
    <div className="comment-item">
      <img className="comment-avatar" src={user?.avatar} alt={user?.name} />
      <div className="comment-content">
        <Link to={`/profile/${comment.userId}`} className="comment-author">
          {user?.name}
        </Link>
        <span className="comment-text">{comment.content}</span>
      </div>
    </div>
  );
};

export default CommentItem; 