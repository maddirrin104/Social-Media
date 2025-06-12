import React, { useState } from 'react';
import Button from '../common/Button';
import ConfirmModal from '../common/ConfirmModal';

/**
 * status: 'none' | 'pending' | 'accepted'
 * isSent: true nếu là lời mời đã gửi, false nếu là lời mời đã nhận
 * onSendRequest: gửi lời mời
 * onCancelRequest: huỷ lời mời đã gửi
 * onAcceptRequest: chấp nhận lời mời đã nhận
 * onUnfriend: huỷ kết bạn
 * loading: trạng thái loading (nếu cần)
 * className: class CSS tùy chỉnh
 */
const FriendButton = ({
  status = 'none',
  isSent = false,
  onSendRequest,
  onCancelRequest,
  onAcceptRequest,
  onUnfriend,
  loading = false,
  className,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  let label = 'Kết bạn';
  let color = '#3ec6e0';
  let onClick = onSendRequest;

  let modalMessage = '';
  let modalConfirm = null;

  if (status === 'pending') {
    if (isSent) {
      label = 'Đã gửi lời mời';
      color = '#aaa';
      onClick = () => setModalOpen(true);
      modalMessage = 'Bạn có muốn hủy lời mời kết bạn này?';
      modalConfirm = onCancelRequest;
    } else {
      label = 'Chấp nhận';
      color = '#4caf50';
      onClick = onAcceptRequest;
    }
  } else if (status === 'accepted') {
    label = 'Bạn bè';
    color = '#f44336';
    onClick = () => setModalOpen(true);
    modalMessage = 'Bạn có chắc chắn muốn hủy kết bạn không?';
    modalConfirm = onUnfriend;
  }

  return (
    <>
      <Button
        onClick={onClick}
        disabled={loading}
        className={className}
        style={{ width: '100%', height: '100%', background: color, color: '#fff' }}
      >
        {loading ? 'Đang xử lý...' : label}
      </Button>
      <ConfirmModal
        isOpen={modalOpen}
        message={modalMessage}
        onConfirm={async () => {
          setModalOpen(false);
          if (modalConfirm) await modalConfirm();
        }}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};

export default FriendButton;