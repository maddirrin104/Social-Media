import React from 'react';

/**
 * status: 'none' | 'pending' | 'accepted'
 * isSent: true nếu là lời mời đã gửi, false nếu là lời mời đã nhận
 * onClick: hàm xử lý khi nhấn
 * loading: trạng thái loading (nếu cần)
 */
const FriendButton = ({ status = 'none', isSent = false, onClick, loading = false }) => {
  let label = 'Kết bạn';
  let color = '#3ec6e0';

  if (status === 'pending') {
    if (isSent) {
      label = 'Huỷ lời mời';
      color = '#aaa';
    } else {
      label = 'Chấp nhận';
      color = '#4caf50';
    }
  } else if (status === 'accepted') {
    label = 'Huỷ kết bạn';
    color = '#f44336';
  }

  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        padding: '8px 18px',
        borderRadius: 20,
        border: 'none',
        background: color,
        color: '#fff',
        fontWeight: 600,
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1,
        transition: 'all 0.2s',
        minWidth: 100
      }}
    >
      {loading ? 'Đang xử lý...' : label}
    </button>
  );
};

export default FriendButton; 