import React, { useRef, useEffect } from 'react';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import '../../styles/components/CommentList.css';
import { postAPI } from '../../utils/api';

const CommentList = ({ postId, commentList, setCommentList, allowComment = true }) => {
  const commentsListRef = useRef(null);

  // Auto scroll to bottom when commentList changes
  useEffect(() => {
    if (commentsListRef.current) {
      commentsListRef.current.scrollTop = commentsListRef.current.scrollHeight;
    }
  }, [commentList]);

  // Lọc comment hợp lệ (có id)
  const validComments = commentList.filter(comment => comment && comment.id);

  // Hàm xoá comment
  const handleDeleteComment = async (comment) => {
    try {
      await postAPI.deleteComment(postId, comment.id);
      setCommentList(prev => prev.filter(c => c.id !== comment.id));
    } catch (err) {
      // Có thể hiện thông báo lỗi nếu muốn
    }
  };

  return (
    <div className="comments-container">
      <div className="comment-title">Bình luận</div>
      <div className="comments-list" ref={commentsListRef}>
        {validComments.length === 0 ? (
          <div className="no-comments">Chưa có bình luận</div>
        ) : (
          validComments.map(comment => (
            <CommentItem key={comment.id} comment={comment} onDelete={handleDeleteComment} />
          ))
        )}
      </div>
      {allowComment && (
        <div className="comment-input-wrapper">
          <CommentForm postId={postId} setCommentList={setCommentList} />
        </div>
      )}
    </div>
  );
};

export default CommentList; 