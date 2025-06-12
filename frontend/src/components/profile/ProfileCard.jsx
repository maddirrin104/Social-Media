import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import Card from '../common/Card';
import { FaUserFriends, FaInstagram, FaEnvelope, FaTiktok, FaMapMarkerAlt } from 'react-icons/fa';
import '../../styles/components/ProfileCard.css';
import FriendButton from '../friends/FriendButton';
import useFriendActions from '../../hooks/useFriendActions';
import EditProfileModal from './EditProfileModal';
import { updateUser } from '../../utils/api';
import api from '../../utils/axiosInstance'; // Để gọi API kiểm tra trạng thái

const ProfileCard = ({ profile, onProfileUpdated, className }) => {
  const { user: currentUser, setUser } = useAuth();
  const isOwnProfile = currentUser.id === profile.id;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { sendRequest, cancelRequest, acceptRequest, unfriend, loadingId } = useFriendActions();

  // State lưu trạng thái kết bạn thực tế với profile này
  // status: 'none' | 'pending' | 'accepted'
  // isSent: true nếu mình là người gửi lời mời
  const [friendStatus, setFriendStatus] = useState({ status: 'none', isSent: false });
  const [fetchingStatus, setFetchingStatus] = useState(false);

  // Lấy trạng thái kết bạn thật từ API
  useEffect(() => {
    if (!currentUser || !profile || currentUser.id === profile.id) return;
    let ignore = false;
    const fetchStatus = async () => {
      setFetchingStatus(true);
      try {
        // Gọi API để lấy trạng thái kết bạn giữa currentUser và profile
        // Ví dụ giả định: /friends/status/:userId trả về {status: 'pending/accepted/none', isSent: true/false}
        const res = await api.get(`/friends/status/${profile.id}`);
        if (!ignore) setFriendStatus(res.data);
      } catch {
        if (!ignore) setFriendStatus({ status: 'none', isSent: false });
      }
      setFetchingStatus(false);
    };
    fetchStatus();
    return () => { ignore = true };
  }, [profile, currentUser]);

  // Khi thực hiện action, gọi lại API lấy trạng thái để update UI
  const handleFriendAction = async () => {
    if (friendStatus.status === 'none') {
      await sendRequest(profile);
    } else if (friendStatus.status === 'pending' && friendStatus.isSent) {
      await cancelRequest(profile);
    } else if (friendStatus.status === 'pending' && !friendStatus.isSent) {
      await acceptRequest(profile);
    } else if (friendStatus.status === 'accepted') {
      await unfriend(profile);
    }
    // Sau khi thao tác, lấy lại trạng thái
    try {
      const res = await api.get(`/friends/status/${profile.id}`);
      setFriendStatus(res.data);
    } catch {
      setFriendStatus({ status: 'none', isSent: false });
    }
  };

  // Xử lý lưu thông tin chỉnh sửa
  const handleSaveProfile = async (formData) => {
    setLoading(true);
    try {
      const res = await updateUser(formData);
      if (setUser && isOwnProfile) setUser(res.user);
      if (onProfileUpdated) onProfileUpdated(res.user);
      setIsEditModalOpen(false);
    } catch {
      alert("Cập nhật thông tin thất bại!");
    }
    setLoading(false);
  };

  return (
    <>
      <Card className={`profile-card-sidebar${className ? ' ' + className : ''}`}>
        <div className="profile-avatar-sidebar">
          <Avatar src={profile.avatar} alt={profile.name} size="xlarge" />
        </div>
        <div className="profile-details-sidebar">
          <h1>{profile.name}</h1>
          <p className="bio-sidebar">{profile.bio}</p>
          <div className="profile-extra-info">
            <div className="profile-info-row"><FaUserFriends className="profile-info-icon" /> {profile.friendCount !== undefined && profile.friendCount !== null ? profile.friendCount : <span className="profile-info-empty">chưa cập nhật</span>} bạn bè</div>
            <div className="profile-info-row"><FaMapMarkerAlt className="profile-info-icon" /> Đến từ {profile.hometown ? profile.hometown : <span className="profile-info-empty">chưa cập nhật</span>}</div>
            <div className="profile-info-row"><FaInstagram className="profile-info-icon" /> {profile.instagram ? profile.instagram : <span className="profile-info-empty">chưa cập nhật</span>}</div>
            <div className="profile-info-row"><FaEnvelope className="profile-info-icon" /> {profile.email ? profile.email : <span className="profile-info-empty">chưa cập nhật</span>}</div>
            <div className="profile-info-row"><FaTiktok className="profile-info-icon" /> {profile.tiktok ? profile.tiktok : <span className="profile-info-empty">chưa cập nhật</span>}</div>
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
              <FriendButton
                status={friendStatus.status}
                isSent={friendStatus.isSent}
                loading={loadingId === profile.id || fetchingStatus}
                onClick={handleFriendAction}
                className="profile-btn-friend"
              />
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