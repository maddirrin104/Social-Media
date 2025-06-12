import { useState } from 'react';
import api from '../utils/axiosInstance' // Nếu đã export mặc định, hoặc import các hàm friendAPI nếu bạn tách riêng

/**
 * Custom hook xử lý các hành động kết bạn với backend thực.
 * Sau khi thực hiện thao tác, nên fetch lại danh sách (ở component cha) nếu muốn dữ liệu luôn mới nhất.
 */
export default function useFriendActions() {
  const [loadingId, setLoadingId] = useState(null);

  // Gửi lời mời kết bạn
  const sendRequest = async (user) => {
    setLoadingId(user.id);
    try {
      const response = await api.post(`/friends/request/${user.id}`);
      console.log('Đã gửi lời mời kết bạn tới', user.name);
      return response.data;
    } finally {
      setLoadingId(null);
    }
  };

  // Huỷ lời mời đã gửi
  const cancelRequest = async (user) => {
    setLoadingId(user.id);
    try {
      const response = await api.delete(`/friends/request/${user.id}`);
      console.log('Đã huỷ lời mời kết bạn với', user.name);
      return response.data;
    } finally {
      setLoadingId(null);
    }
  };

  // Chấp nhận lời mời
  const acceptRequest = async (user) => {
    setLoadingId(user.id);
    try {
      const response = await api.post(`/friends/accept/${user.id}`);
      console.log('Đã chấp nhận lời mời kết bạn từ', user.name);
      return response.data;
    } finally {
      setLoadingId(null);
    }
  };

  // Huỷ kết bạn
  const unfriend = async (user) => {
    setLoadingId(user.id);
    try {
      const response = await api.delete(`/friends/${user.id}`);
      console.log('Đã huỷ kết bạn với', user.name);
      return response.data;
    } finally {
      setLoadingId(null);
    }
  };

  return {
    sendRequest,
    cancelRequest,
    acceptRequest,
    unfriend,
    loadingId
  };
}