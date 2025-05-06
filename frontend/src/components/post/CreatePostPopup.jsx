import { useState, useContext } from 'react';
import { FaPlus } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import './CreatePostPopup.css';

const CreatePostPopup = ({ onCreatePost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    onCreatePost({ content, image });
    setContent('');
    setImage('');
    setIsOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="create-post-popup-container">
      <button className="create-post-button" onClick={() => setIsOpen(true)}>
        <div className="icon">
          <FaPlus />
        </div>
        <span className='create-post-popup-text'>
          <span className="text">Tạo bài viết</span>
        </span>
      </button>

      {isOpen && (
        <>
          <div className="popup-overlay" onClick={() => setIsOpen(false)} />
          <div className="create-post-popup">
            <div className="popup-header">
              <h2>Tạo bài viết</h2>
              <button className="close-button" onClick={() => setIsOpen(false)}>×</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="post-header">
                <img src={user?.avatar} alt={user?.name} className="avatar" />
                <span className="username">{user?.name}</span>
              </div>

              <textarea
                placeholder="Bạn đang nghĩ gì?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />

              {image && (
                <div className="image-preview">
                  <img src={image} alt="Preview" />
                  <button 
                    type="button" 
                    className="remove-image"
                    onClick={() => setImage('')}
                  >
                    ×
                  </button>
                </div>
              )}

              <div className="post-actions">
                <label className="upload-image">
                  Thêm ảnh
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </label>

                <div className="action-buttons">
                  <button 
                    type="button" 
                    className="cancel-button"
                    onClick={() => setIsOpen(false)}
                  >
                    Hủy
                  </button>
                  <button 
                    type="submit" 
                    className="post-button"
                    disabled={!content.trim()}
                  >
                    Đăng
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default CreatePostPopup; 