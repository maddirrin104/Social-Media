import React, { useState } from 'react';
import FriendButton from './FriendButton';
import useFriendActions from '../../hooks/useFriendActions';
import useFriendLists from '../../hooks/useFriendLists';
import '../../styles/components/Friends.css';
import { Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/';

function getAvatarUrl(avatarPath) {
  if (!avatarPath) return '/images/default-avatar.png';
  if (avatarPath.startsWith('http')) return avatarPath;
  return BASE_URL + 'storage/' + avatarPath;
}

const TAB_RECEIVED = 'received';
const TAB_SENT = 'sent';
const TAB_FRIENDS = 'friends';
const TAB_SUGGEST = 'suggest';

const tabList = [
  { key: TAB_RECEIVED, label: 'Lời mời đã nhận' },
  { key: TAB_SENT, label: 'Lời mời đã gửi' },
  { key: TAB_FRIENDS, label: 'Tất cả bạn bè' },
  { key: TAB_SUGGEST, label: 'Gợi ý kết bạn' }
];

const Friends = ({ open, onClose, userId }) => {
  const [tab, setTab] = useState(TAB_RECEIVED);
  const { sendRequest, cancelRequest, acceptRequest, unfriend, loadingId } = useFriendActions();
  const { friends, received, sent, suggestions, loading, refetch } = useFriendLists(userId);

  // Hàm xử lý action, gọi lại refetch sau khi xong
  const handleAction = async (user, tab) => {
    if (tab === TAB_RECEIVED) {
      await acceptRequest(user);
    } else if (tab === TAB_SENT) {
      await cancelRequest(user);
    } else if (tab === TAB_FRIENDS) {
      await unfriend(user);
    } else if (tab === TAB_SUGGEST) {
      await sendRequest(user);
    }
    refetch();
  };

  // Dữ liệu cho từng tab
  let list = [];
  if (tab === TAB_RECEIVED) list = received;
  if (tab === TAB_SENT) list = sent;
  if (tab === TAB_FRIENDS) list = friends;
  if (tab === TAB_SUGGEST) list = suggestions;

  // Xác định trạng thái bạn bè để truyền vào FriendButton
  const getFriendStatus = (user) => {
    if (tab === TAB_FRIENDS) return { status: 'accepted', isSent: false };
    if (tab === TAB_RECEIVED) return { status: 'pending', isSent: false };
    if (tab === TAB_SENT) return { status: 'pending', isSent: true };
    if (tab === TAB_SUGGEST) {
      // Kiểm tra xem user có nằm trong danh sách đã gửi lời mời không
      const isSentRequest = sent.some(sentUser => sentUser.id === user.id);
      return { 
        status: isSentRequest ? 'pending' : 'none',
        isSent: isSentRequest
      };
    }
    return { status: 'none', isSent: false };
  };

  return open ? (
    <div className="friends-modal-overlay" onClick={onClose}>
      <div className="friends-modal-content" onClick={e => e.stopPropagation()}>
        <button className="friends-modal-close" onClick={onClose} aria-label="Đóng">&times;</button>
        <div className="friends-modal-title">Kết bạn</div>
        <div className="friends-modal-tabs">
          {tabList.map(t => (
            <div
              key={t.key}
              className={`friends-modal-tab ${tab === t.key ? 'active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </div>
          ))}
        </div>
        <div className="friends-modal-list">
          {loading ? (
            <div className="friends-modal-empty">Đang tải...</div>
          ) : list.length === 0 ? (
            <div className="friends-modal-empty">Không có dữ liệu</div>
          ) : (
            list.map(u => {
              const friendStatus = getFriendStatus(u);
              return (
                <div key={u.id} className="friends-modal-item">
                  <img src={getAvatarUrl(u.avatar)} alt={u.name} className="friends-modal-avatar" />
                  <div className="friends-modal-info">
                    <Link to={`/profile/${u.id}`} className="friends-modal-name">{u.name}</Link>
                    {u.email && (
                    <div className="friends-modal-email" style={{ fontSize: 13, color: "#888" }}>
                      {u.email}
                    </div>)}
                    {tab === TAB_FRIENDS && <div className="friends-status">Bạn bè</div>}
                    {tab === TAB_RECEIVED && <div className="friends-status">Đã gửi cho bạn</div>}
                    {tab === TAB_SENT && <div className="friends-status">Bạn đã gửi</div>}
                    {tab === TAB_SUGGEST && friendStatus.isSent && (
                      <div className="friends-status">Bạn đã gửi lời mời</div>
                    )}
                  </div>
                  <FriendButton
                    status={friendStatus.status}
                    isSent={friendStatus.isSent}
                    loading={loadingId === u.id}
                    onClick={() => handleAction(u, tab)}
                    className="profile-btn-friend"
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Friends;