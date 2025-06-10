import React, { useState } from 'react';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components/PostCreator.css';

const PostCreator = () => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    // TODO: Implement post creation
    console.log('Creating post:', { content, image });
    
    // Reset form
    setContent('');
    setImage(null);
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
            <Button type="submit" variant="primary">
              Đăng
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
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default PostCreator; 