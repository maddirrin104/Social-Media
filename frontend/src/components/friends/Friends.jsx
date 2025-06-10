import React, { useState } from 'react';
import { friendships, getReceivedFriendRequests, getSentFriendRequests, getFriendList } from '../../data/friendships';
import { users } from '../../data/users';
import FriendButton from './FriendButton';
import useFriendActions from '../../hooks/useFriendActions';

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
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ width: 420, maxWidth: '95vw', maxHeight: '90vh', padding: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Đóng">&times;</button>
        <div className="modal-title" style={{marginBottom:0, padding:'20px 0 0 0', textAlign:'center'}}>Kết bạn</div>
        <div style={{display:'flex', borderBottom:'1px solid #eee', margin:'0 20px'}}>
          {tabList.map(t => (
            <div
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                flex:1,
                textAlign:'center',
                padding:'12px 0',
                cursor:'pointer',
                fontWeight: tab === t.key ? 700 : 400,
                borderBottom: tab === t.key ? '2px solid #3ec6e0' : '2px solid transparent',
                color: tab === t.key ? '#3ec6e0' : '#333',
                transition: 'all 0.2s'
              }}
            >
              {t.label}
            </div>
          ))}
        </div>
        <div style={{padding:20, maxHeight: '60vh', overflowY:'auto'}}>
          {list.length === 0 ? (
            <div style={{color:'#aaa', textAlign:'center', marginTop:30}}>Không có dữ liệu</div>
          ) : (
            list.map(u => (
              <div key={u.id} style={{display:'flex', alignItems:'center', marginBottom:18}}>
                <img src={u.avatar} alt={u.name} style={{width:44, height:44, borderRadius:'50%', marginRight:14}} />
                <div style={{flex:1}}>
                  <div style={{fontWeight:600}}>{u.name}</div>
                  {tab === TAB_FRIENDS && <div style={{fontSize:13, color:'#888'}}>Bạn bè</div>}
                  {tab === TAB_RECEIVED && <div style={{fontSize:13, color:'#888'}}>Đã gửi cho bạn</div>}
                  {tab === TAB_SENT && <div style={{fontSize:13, color:'#888'}}>Bạn đã gửi</div>}
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