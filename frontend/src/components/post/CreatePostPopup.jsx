import { useState, useContext } from 'react';
import { FaPlus, FaCamera, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import './CreatePostPopup.css';

const CreatePostPopup = ({ onCreatePost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() && !image) {
      setError("Vui lòng nhập nội dung hoặc chọn ảnh!");
      return;
    }

    setError("");

    const postData = {
      userId: user.id,
      user: user.name,
      avatar: user.avatar,
      content,
      image: preview,
    };

    onCreatePost(postData);
    setContent('');
    setImage(null);
    setPreview('');
    setIsOpen(false);
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
                className="post-content"
              />

              {preview && (
                <div className="preview-container">
                  <img src={preview} alt="Preview" className="preview-image" />
                  <button 
                    type="button" 
                    className="remove-image"
                    onClick={() => {
                      setPreview('');
                      setImage(null);
                    }}
                  >
                    <FaTimes className="remove-icon" />
                  </button>
                </div>
              )}

              <div className="post-actions">
                <label className="upload-image">
                  <FaCamera className="camera-icon" />
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
                    disabled={!content.trim() && !image}
                  >
                    Đăng
                  </button>
                </div>
              </div>

              {error && <p className="error-message">{error}</p>}
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default CreatePostPopup; 