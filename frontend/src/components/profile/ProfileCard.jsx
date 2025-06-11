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
      {isOwnProfile && (
        <div className="profile-actions-sidebar">
          <Button 
            className="profile-btn-edit" 
            variant="primary"
            onClick={() => alert("Chức năng chỉnh sửa sẽ cập nhật sau")}
          >
            Chỉnh sửa thông tin
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ProfileCard;