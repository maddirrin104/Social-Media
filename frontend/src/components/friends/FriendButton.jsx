import React from 'react';
import Button from '../common/Button';

/**
 * status: 'none' | 'pending' | 'accepted'
 * isSent: true nếu là lời mời đã gửi, false nếu là lời mời đã nhận
 * onClick: hàm xử lý khi nhấn
 * loading: trạng thái loading (nếu cần)
 * className: class CSS tùy chỉnh
 */
const FriendButton = ({ status = 'none', isSent = false, onClick, loading = false, className }) => {
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
    <Button
      onClick={onClick}
      disabled={loading}
      className={className}
      style={{ width: '100%', height: '100%' }}
    >
      {loading ? 'Đang xử lý...' : label}
    </Button>
  );
};

export default FriendButton; 