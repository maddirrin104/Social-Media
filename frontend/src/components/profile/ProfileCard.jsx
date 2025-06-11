import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import Card from '../common/Card';
import { FaUserFriends, FaInstagram, FaEnvelope, FaTiktok, FaMapMarkerAlt } from 'react-icons/fa';
import '../../styles/components/ProfileCard.css';
import { getFriendshipStatus, friendships } from '../../data/friendships';
import FriendButton from '../friends/FriendButton';
import useFriendActions from '../../hooks/useFriendActions';
import EditProfileModal from './EditProfileModal';
import { updateUser } from '../../utils/api';

const ProfileCard = ({ profile, onProfileUpdated }) => {
  const { user: currentUser, setUser } = useAuth();
  const isOwnProfile = currentUser.id === profile.id;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Xử lý lưu thông tin chỉnh sửa
  const handleSaveProfile = async (formData) => {
    setLoading(true);
    try {
      const res = await updateUser(formData);
      // Cập nhật user ở context nếu là profile của chính mình
      if (setUser && isOwnProfile) setUser(res.user);
      // Cập nhật profile hiển thị ở ProfileCard
      if (onProfileUpdated) onProfileUpdated(res.user);
      setIsEditModalOpen(false);
    } catch {
      alert("Cập nhật thông tin thất bại!");
    }
    setLoading(false);
  };

  return (
    <>
      <Card className="profile-card-sidebar">
        <div className="profile-avatar-sidebar">
          <Avatar src={profile.avatar} alt={profile.name} size="xlarge" />
        </div>
        <div className="profile-details-sidebar">
          <h1>{profile.name}</h1>
          <p className="bio-sidebar">{profile.bio}</p>
          <div className="profile-extra-info">
            <div className="profile-info-row"><FaUserFriends className="profile-info-icon" /> {profile.friendCount} bạn bè</div>
            <div className="profile-info-row"><FaMapMarkerAlt className="profile-info-icon" /> Đến từ {profile.hometown}</div>
            <div className="profile-info-row"><FaInstagram className="profile-info-icon" /> {profile.instagram}</div>
            <div className="profile-info-row"><FaEnvelope className="profile-info-icon" /> {profile.email}</div>
            <div className="profile-info-row"><FaTiktok className="profile-info-icon" /> {profile.tiktok}</div>
          </div>
        </div>
        <div className="profile-actions-sidebar">
          {isOwnProfile ? (
            <Button
              className="profile-btn-edit"
              variant="primary"
              onClick={() => setIsEditModalOpen(true)}
            >
              Chỉnh sửa thông tin
            </Button>
          ) : (
            <div className="profile-actions-row">
              {/* FriendButton và Button nhắn tin nếu bạn có */}
              {/* <FriendButton ... /> */}
              <Button variant="outline" className="profile-btn-message">Nhắn tin</Button>
            </div>
          )}
        </div>
      </Card>

      {isOwnProfile && (
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          profile={profile}
          onSave={handleSaveProfile}
          loading={loading}
        />
      )}
    </>
  );
};


export default ProfileCard;