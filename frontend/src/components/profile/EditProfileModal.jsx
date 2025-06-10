import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Avatar from '../common/Avatar';
import '../../styles/components/EditProfileModal.css';

const EditProfileModal = ({ isOpen, onClose, profile, onSave }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    avatar: profile.avatar || '',
    name: profile.name || '',
    bio: profile.bio || '',
    hometown: profile.hometown || '',
    instagram: profile.instagram || '',
    email: profile.email || '',
    tiktok: profile.tiktok || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (activeTab === 'profile') {
      if (!formData.name.trim()) {
        newErrors.name = 'Vui lòng nhập tên';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Vui lòng nhập email';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email không hợp lệ';
      }
    } else {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại';
      }
      if (!formData.newPassword) {
        newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="edit-profile-modal-overlay">
      <div className="edit-profile-modal-content">
        <div className="edit-profile-modal-header">
          <h2>Chỉnh sửa thông tin</h2>
          <button className="edit-profile-modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="edit-profile-modal-tabs">
          <button
            className={`edit-profile-modal-tab-button ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Thông tin cá nhân
          </button>
          <button
            className={`edit-profile-modal-tab-button ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => setActiveTab('password')}
          >
            Đổi mật khẩu
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-profile-modal-form">
          {activeTab === 'profile' ? (
            <div className="edit-profile-modal-profile-tab">
              <div className="edit-profile-modal-avatar-upload">
                <Avatar src={formData.avatar} alt="Avatar" size="large" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  id="avatar-input"
                  className="hidden"
                />
                <Button
                  size="small"
                  variant="primary"
                  onClick={() => document.getElementById('avatar-input').click()}
                >
                  Thay đổi ảnh đại diện
                </Button>
              </div>

              <Input
                label="Tên"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={errors.name}
              />

              <Input
                label="Tiểu sử"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                multiline
                rows={3}
              />

              <Input
                label="Quê quán"
                name="hometown"
                value={formData.hometown}
                onChange={handleInputChange}
              />

              <Input
                label="Instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
              />

              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
              />

              <Input
                label="TikTok"
                name="tiktok"
                value={formData.tiktok}
                onChange={handleInputChange}
              />
            </div>
          ) : (
            <div className="edit-profile-modal-password-tab">
              <Input
                label="Mật khẩu hiện tại"
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleInputChange}
                error={errors.currentPassword}
              />

              <Input
                label="Mật khẩu mới"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleInputChange}
                error={errors.newPassword}
              />

              <Input
                label="Xác nhận mật khẩu mới"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
              />
            </div>
          )}

          <div className="edit-profile-modal-actions">
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" variant="primary">
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal; 