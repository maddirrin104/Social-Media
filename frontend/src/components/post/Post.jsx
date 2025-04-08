import { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa";
import { FaRegHeart, FaRegComment } from "react-icons/fa6";
import { AuthContext } from "../../context/AuthContext";
import CommentSection from "./CommentSection";
import ConfirmModal from "../common/ConfirmModal";
import { users } from "../../data/users";
import "./Post.css";

const Post = ({ post, onLike, onComment, onDelete }) => {
  const { user } = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowMore, setShouldShowMore] = useState(false);
  const contentRef = useRef(null);
  const commentInputRef = useRef(null);

  // Tìm thông tin user từ users.js
  const postUser = users.find(u => u.id === post.userId);

  useEffect(() => {
    const checkTextHeight = () => {
      if (contentRef.current) {
        // Tạm thời bỏ giới hạn max-height để đo chiều cao thực
        contentRef.current.style.maxHeight = 'none';
        const actualHeight = contentRef.current.scrollHeight;
        const lineHeight = parseInt(window.getComputedStyle(contentRef.current).lineHeight);
        // Đặt lại max-height
        contentRef.current.style.maxHeight = isExpanded ? '300px' : '4.5em';
        
        // Tính số dòng thực tế
        const lines = actualHeight / lineHeight;
        setShouldShowMore(lines > 3);
      }
    };

    checkTextHeight();
    // Thêm event listener để check lại khi window resize
    window.addEventListener('resize', checkTextHeight);
    return () => window.removeEventListener('resize', checkTextHeight);
  }, [post.content, isExpanded]);

  const formatTime = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) {
      return "Vừa xong";
    } else if (hours < 1) {
      return `${minutes} phút`;
    } else if (days < 1) {
      return `${hours} giờ`;
    } else {
      const date = new Date(timestamp);
      return date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  const handleDelete = () => {
    onDelete(post.id);
    setShowDeleteModal(false);
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = post.commentList.filter(comment => comment.id !== commentId);
    onComment(post.id, "", commentId);
  };

  const handleEditComment = (commentId, newContent) => {
    const updatedComments = post.commentList.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, content: newContent };
      }
      return comment;
    });
    onComment(post.id, newContent, commentId);
  };

  const handleCommentClick = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  return (
    <>
      <div className="post">
        <div className="post-header">
          <div className="post-header-left">
            <img src={postUser?.avatar || '/default-avatar.png'} alt={postUser?.name || 'User'} className="avatar" />
            <Link to={`/profile/${post.userId}`} className="user-link">
              <h3>{postUser?.name || 'Người dùng ẩn danh'}</h3>
            </Link>
          </div>
          <div className="post-header-right">
            <span className="post-time">{formatTime(post.createdAt)}</span>
            {user && user.id === post.userId && (
              <button 
                onClick={() => setShowDeleteModal(true)} 
                className="delete-button" 
                title="Xóa bài viết"
              >
                <FaTrash />
              </button>
            )}
          </div>
        </div>

        <div className="post-content-wrapper">
          {post.image && (
            <div className="post-image-container">
              <img 
                src={post.image} 
                alt="post" 
                className="post-image" 
                onClick={() => setShowImageModal(true)}
              />
            </div>
          )}
          
          <div className="post-right-content">
            <div className="post-content">
              <div 
                className={`post-content-text ${isExpanded ? 'expanded' : ''}`}
                ref={contentRef}
              >
                {post.content}
              </div>
              {shouldShowMore && (
                <button 
                  className="show-more-btn"
                  onClick={() => setShowContentModal(true)}
                >
                  Xem thêm
                </button>
              )}
            </div>

            <div className="post-actions">
              <button
                className={`action-button ${post.likedBy.includes(user?.id) ? "liked" : ""}`}
                onClick={() => onLike(post.id, post.likedBy.includes(user?.id))}
              >
                {post.likedBy.includes(user?.id) ? (
                  <FaHeart className="heart-icon" />
                ) : (
                  <FaRegHeart className="heart-icon" />
                )}
                <span>{post.likes}</span>
              </button>
              <button className="action-button" onClick={handleCommentClick}>
                <FaRegComment className="comment-icon" />
                <span>{post.commentList?.length || 0}</span>
              </button>
            </div>

            <CommentSection 
              postId={post.id} 
              comments={post.commentList || []} 
              onComment={onComment}
              onDeleteComment={handleDeleteComment}
              onEditComment={handleEditComment}
              commentInputRef={commentInputRef}
            />
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Xóa bài viết"
        message="Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không thể hoàn tác."
      />

      {showImageModal && post.image && (
        <div className="modal-overlay image-modal-overlay" onClick={() => setShowImageModal(false)}>
          <div className="image-modal" onClick={e => e.stopPropagation()}>
            <img src={post.image} alt="post" className="full-image" />
            <button 
              className="close-image-button"
              onClick={() => setShowImageModal(false)}
              title="Đóng"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {showContentModal && (
        <div className="content-modal-overlay" onClick={() => setShowContentModal(false)}>
          <div className="content-modal" onClick={e => e.stopPropagation()}>
            {post.image && (
              <div className="content-modal-left">
                <img src={post.image} alt="post" className="content-modal-image" />
              </div>
            )}
            <div className="content-modal-right">
              <div className="content-modal-header">
                <div className="content-modal-user-info">
                  <img src={postUser?.avatar || '/default-avatar.png'} alt={postUser?.name || 'User'} className="avatar" />
                  <Link to={`/profile/${post.userId}`} className="user-link">
                    <h3>{postUser?.name || 'Người dùng ẩn danh'}</h3>
                  </Link>
                </div>
                <span className="post-time">{formatTime(post.createdAt)}</span>
              </div>
              <div className="content-modal-content">
                {post.content}
              </div>
            </div>
            <button 
              className="content-modal-close"
              onClick={() => setShowContentModal(false)}
              title="Đóng"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Post; 