import React, { useRef, useEffect } from 'react';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import '../../styles/components/CommentList.css';

const CommentList = ({ commentList, setCommentList }) => {
  const commentsListRef = useRef(null);

  // Auto scroll to bottom when commentList changes
  useEffect(() => {
    if (commentsListRef.current) {
      commentsListRef.current.scrollTop = commentsListRef.current.scrollHeight;
    }
  }, [commentList]);

  // Lọc comment hợp lệ (có id)
  const validComments = commentList.filter(comment => comment && comment.id);

  return (
    <div className="comments-container">
      <div className="comment-title">Bình luận</div>
      <div className="comments-list" ref={commentsListRef}>
        {validComments.length === 0 ? (
          <div className="no-comments">Chưa có bình luận</div>
        ) : (
          validComments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
      <div className="comment-input-wrapper">
      <CommentForm commentList={commentList} setCommentList={setCommentList} />
      </div>
    </div>
  );
};

export default CommentList; 