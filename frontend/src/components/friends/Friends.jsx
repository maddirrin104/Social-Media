import React, { useState } from 'react';
import { friendships, getReceivedFriendRequests, getSentFriendRequests, getFriendList } from '../../data/friendships';
import { users } from '../../data/users';
import FriendButton from './FriendButton';
import useFriendActions from '../../hooks/useFriendActions';
import '../../styles/components/Friends.css';

const TAB_RECEIVED = 'received';
const TAB_SENT = 'sent';
const TAB_FRIENDS = 'friends';

const tabList = [
  { key: TAB_RECEIVED, label: 'Lời mời đã nhận' },
  { key: TAB_SENT, label: 'Lời mời đã gửi' },
  { key: TAB_FRIENDS, label: 'Tất cả bạn bè' },
];

const Friends = ({ open, onClose, userId }) => {
  const [tab, setTab] = useState(TAB_RECEIVED);
  const { sendRequest, cancelRequest, acceptRequest, unfriend, loadingId } = useFriendActions();

  // Lấy dữ liệu cho từng tab
  const received = getReceivedFriendRequests(userId, friendships).map(f => {
    const user = users.find(u => u.id === f.user1Id);
    return { ...user, requestId: f.id };
  });
  const sent = getSentFriendRequests(userId, friendships).map(f => {
    const user = users.find(u => u.id === f.user2Id);
    return { ...user, requestId: f.id };
  });
  const friends = getFriendList(userId, friendships);

  let list = [];
  if (tab === TAB_RECEIVED) list = received;
  if (tab === TAB_SENT) list = sent;
  if (tab === TAB_FRIENDS) list = friends;

  // Sử dụng hook để xử lý action
  const handleFriendAction = (user, tab) => {
    if (tab === TAB_RECEIVED) acceptRequest(user);
    else if (tab === TAB_SENT) cancelRequest(user);
    else if (tab === TAB_FRIENDS) unfriend(user);
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
          {list.length === 0 ? (
            <div className="friends-modal-empty">Không có dữ liệu</div>
          ) : (
            list.map(u => (
              <div key={u.id} className="friends-modal-item">
                <img src={u.avatar} alt={u.name} className="friends-modal-avatar" />
                <div className="friends-modal-info">
                  <div className="friends-modal-name">{u.name}</div>
                  {tab === TAB_FRIENDS && <div className="friends-status">Bạn bè</div>}
                  {tab === TAB_RECEIVED && <div className="friends-status">Đã gửi cho bạn</div>}
                  {tab === TAB_SENT && <div className="friends-status">Bạn đã gửi</div>}
                </div>
                <FriendButton
                  status={tab === TAB_FRIENDS ? 'accepted' : 'pending'}
                  isSent={tab === TAB_SENT}
                  loading={loadingId === u.id}
                  onClick={() => handleFriendAction(u, tab)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Friends; 