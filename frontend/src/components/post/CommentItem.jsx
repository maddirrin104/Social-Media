import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components/CommentItem.css';

const CommentItem = ({ comment, onDelete }) => {
  const { user: currentUser } = useAuth();
  const isOwnComment = currentUser && comment.userId === currentUser.id;
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    if (!showMenu) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showMenu]);

  return (
    <div className={`comment-item${isOwnComment ? ' own-comment' : ''}`}
      onMouseEnter={() => isOwnComment && setShowMenu(false)}
      onMouseLeave={() => isOwnComment && setShowMenu(false)}
      style={{ position: 'relative' }}
    >
    <img className="comment-avatar" src={comment.avatar} alt={comment.name} />
    <div className="comment-content">
      <Link to={`/profile/${comment.userId}`} className="comment-author">
        {comment.name}
      </Link>
      <span className="comment-text">{comment.content}</span>
    </div>
      {isOwnComment && (
        <div
          className="comment-menu-trigger"
          onClick={() => setShowMenu((v) => !v)}
          tabIndex={0}
          style={{ position: 'absolute', right: -30, top: 10, cursor: 'pointer' }}
        >
          <i className="fas fa-ellipsis-h"></i>
          {showMenu && (
            <div className="comment-menu-dropdown" ref={menuRef}>
              <div className="comment-menu-item" onClick={() => onDelete && onDelete(comment)}>
                Xoá bình luận
              </div>    
            </div>
          )}
        </div>
      )}
  </div>
);
};

export default CommentItem; 