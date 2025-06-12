import React, { useState } from 'react';
import ConfirmModal from '../common/ConfirmModal';
import '../../styles/components/FriendButton.css';

/**
 * status: 'none' | 'pending' | 'accepted'
 * isSent: true nếu là lời mời đã gửi, false nếu là lời mời đã nhận
 * loading: trạng thái loading (nếu cần)
 * onClick: callback cho mọi thao tác (sẽ tự động xác định action)
 * className: class CSS tùy chỉnh
 */
const FriendButton = ({
  status = 'none',
  isSent = false,
  loading = false,
  onClick,
  className,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  let label = 'Kết bạn';
  let buttonClass = 'friend-button none';

  // pending mình gửi thì click hỏi confirm hủy
  // pending mình nhận thì click là accept luôn
  // accepted thì click hỏi confirm hủy kết bạn
  let needConfirm = false;
  let confirmMessage = '';
  if (status === 'pending' && isSent) {
    label = 'Đã gửi lời mời';
    buttonClass = 'friend-button pending';
    needConfirm = true;
    confirmMessage = 'Bạn có muốn hủy lời mời kết bạn này?';
  } else if (status === 'pending' && !isSent) {
    label = 'Chấp nhận';
    buttonClass = 'friend-button accept';
  } else if (status === 'accepted') {
    label = 'Bạn bè';
    buttonClass = 'friend-button accepted';
    needConfirm = true;
    confirmMessage = 'Bạn có chắc chắn muốn hủy kết bạn không?';
  }

  const handleClick = () => {
    if (needConfirm) setModalOpen(true);
    else if (onClick) onClick();
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`${buttonClass} ${className || ''}`}
      >
        {loading ? 'Đang xử lý...' : label}
      </button>
      <ConfirmModal
        isOpen={modalOpen}
        message={confirmMessage}
        onConfirm={async () => {
          setModalOpen(false);
          if (onClick) await onClick();
        }}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};

export default FriendButton;