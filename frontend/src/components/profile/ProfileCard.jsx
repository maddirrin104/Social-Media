import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import Card from '../common/Card';
import { FaUserFriends, FaInstagram, FaEnvelope, FaTiktok, FaMapMarkerAlt } from 'react-icons/fa';
import '../../styles/components/ProfileCard.css';

const ProfileCard = ({ profile }) => {
  const { user: currentUser } = useAuth();
  const isOwnProfile = currentUser.id === profile.id;

  return (
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
          <Button className="profile-btn-edit" variant="primary">Chỉnh sửa thông tin</Button>
        ) : (
          <div className="profile-actions-row">
            <Button variant="primary" className="profile-btn-friend">Kết bạn</Button>
            <Button variant="outline" className="profile-btn-message" >Nhắn tin</Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProfileCard; 