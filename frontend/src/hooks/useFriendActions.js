import { useState } from 'react';

/**
 * Custom hook xử lý các hành động kết bạn.
 * Sau này khi tích hợp backend, hãy thay các setTimeout bằng gọi API (fetch/axios),
 * và cập nhật lại state (ví dụ: cập nhật danh sách bạn bè, lời mời, v.v.)
 */
export default function useFriendActions() {
  const [loadingId, setLoadingId] = useState(null);

  // Gửi lời mời kết bạn
  const sendRequest = async (user) => {
    setLoadingId(user.id);
    // TODO: Gọi API gửi lời mời kết bạn ở đây
    await new Promise(res => setTimeout(res, 1000));
    setLoadingId(null);
    // Sau khi thành công, cập nhật lại state/danh sách nếu cần
    console.log('Đã gửi lời mời kết bạn tới', user.name);
  };

  // Huỷ lời mời đã gửi
  const cancelRequest = async (user) => {
    setLoadingId(user.id);
    // TODO: Gọi API huỷ lời mời kết bạn ở đây
    await new Promise(res => setTimeout(res, 1000));
    setLoadingId(null);
    console.log('Đã huỷ lời mời kết bạn với', user.name);
  };

  // Chấp nhận lời mời
  const acceptRequest = async (user) => {
    setLoadingId(user.id);
    // TODO: Gọi API chấp nhận lời mời kết bạn ở đây
    await new Promise(res => setTimeout(res, 1000));
    setLoadingId(null);
    console.log('Đã chấp nhận lời mời kết bạn từ', user.name);
  };

  // Huỷ kết bạn
  const unfriend = async (user) => {
    setLoadingId(user.id);
    // TODO: Gọi API huỷ kết bạn ở đây
    await new Promise(res => setTimeout(res, 1000));
    setLoadingId(null);
    console.log('Đã huỷ kết bạn với', user.name);
  };

  return {
    sendRequest,
    cancelRequest,
    acceptRequest,
    unfriend,
    loadingId
  };
} 