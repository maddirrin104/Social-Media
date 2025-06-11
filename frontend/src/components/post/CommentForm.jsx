import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components/CommentForm.css';
import { postAPI } from '../../utils/api';

const CommentForm = ({ postId, setCommentList }) => {
  const [content, setContent] = useState('');
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || loading) return;
    setLoading(true);
    try {
      // Gọi API comment
      const res = await postAPI.commentPost(postId, { content });
      // res.comment là comment mới, res.comments là số lượng mới
      setCommentList(prev => [...prev, {
        ...res.comment,
        // Nếu API không trả về tên/avatar user, bạn có thể bổ sung từ context user
        name: user.name,
        avatar: user.avatar
      }]);
      setContent('');
    } catch  {
      // thông báo lỗi nếu muốn
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        className="comment-textarea"
        placeholder="Write a comment..."
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={2}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <button className="comment-post-btn" type="submit" disabled={loading || !content.trim()}>
        <IoSend size={20} />
      </button>
    </form>
  );
};

export default CommentForm; 