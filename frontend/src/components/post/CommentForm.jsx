import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components/CommentForm.css';

const CommentForm = ({ commentList, setCommentList }) => {
  const [content, setContent] = useState('');
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    const newComment = {
      id: commentList.length > 0 ? commentList[commentList.length-1].id + 1 : 1,
      userId: user.id,
      content,
      createdAt: Date.now(),
    };
    setCommentList([...commentList, newComment]);
    setContent('');
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
      />
      <button className="comment-post-btn" type="submit">
        <IoSend size={20} />
      </button>
    </form>
  );
};

export default CommentForm; 