import React, { useState } from 'react';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import { useAuth } from '../../context/AuthContext';
import { postAPI } from '../../utils/api';
import '../../styles/components/PostCreator.css';

const PostCreator = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('content', content);
      if (image) formData.append('image', image);

      await postAPI.createPost(formData);

      setContent('');
      setImage(null);
      if (onPostCreated) onPostCreated(); // gọi reload danh sách bài viết
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="post-creator">
      <form onSubmit={handleSubmit}>
        <Avatar src={user.avatar} alt={user.name} size="small" />
        <div className="post-input">
          <textarea
            placeholder="Bạn đang nghĩ gì?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
          />
          <div className="post-actions">
            <div className="post-attachments">
              <label htmlFor="image-upload" className="attachment-button">
                <i className="fas fa-image"></i>
                <span className="post-attachments-text">Thêm ảnh</span>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </div>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Đang đăng...' : 'Đăng'}
            </Button>
          </div>
        </div>
        {image && (
          <div className="image-preview">
            <img src={URL.createObjectURL(image)} alt="Preview" />
            <button
              type="button"
              className="remove-image"
              onClick={() => setImage(null)}
              disabled={loading}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}
        {error && <div className="post-error">{error}</div>}
      </form>
    </div>
  );
};

export default PostCreator;