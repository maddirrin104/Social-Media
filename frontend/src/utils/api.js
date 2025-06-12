import api from "./axiosInstance";

//register
const registerAPI = async (name, email, password) => {
  try {
    const response = await api.post("/users/register", {
      name,
      email,
      password,
      password_confirmation: password,
    });
    const data = response.data;
    if (data?.token) {
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); 
    }

    return data;
  } catch (error) {
      console.error("Register error:", error);
      throw error;
  };
}

//login
const loginAPI = async (email, password) => {
  try {
    const response = await api.post("/users/login", { email, password });
    const data = response.data;

    if (data?.token) {
      localStorage.setItem("access_token", data.token);     // Lưu token
      localStorage.setItem("user", JSON.stringify(data.user)); // Lưu user
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

//logout
const logoutAPI = async () => {
  try {
    await api.post("/users/logout");
    localStorage.removeItem("access_token"); // Xóa token
    localStorage.removeItem("user"); // Xóa user
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

//Reset password
const resetPasswordAPI =  {
  requestPasswordReset: async (email) => {
    try {
      const response = await api.post('/reset-password', { email });
      return response.data;
    } catch (error) {
      console.error('Request password reset error:', error);
      throw error;
    }
  },

  // Đặt lại mật khẩu mới với token
  resetPassword: async (token, password, password_confirmation) => {
    try {
      const response = await api.put(`/reset-password/${token}`, {
        password,
        password_confirmation
      });
      return response.data;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }
};

//lấy thông tin người dùng hiện tại
const getMeAPI = async () => {
  try {
    const response = await api.get("/users/me");
    return response.data;
  } catch (error) {
    if (error?.statusCode !== 401) {
      console.error("getMeAPI error:", error);
    }
    throw error;
  }
};

//lấy thông tin người dùng theo id
const getUserByIdAPI = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("getUserByIdAPI error:", error);
    throw error;
  }
};

// Lấy thông tin tất cả người dùng 
const getAllUsersAPI = async () => {
  const response = await api.get('/users');
  return response.data; // trả về danh sách người dùng
}

// Cập nhật thông tin người dùng
const updateUser = async (data) => {
  const response = await api.put('/user', data);
  return response.data; // trả về { message, user }
};

// Xóa user
const deleteUserAPI = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data; 
}

//bài viết nha bro
const postAPI = {
  // Đăng bài
  createPost: async (formData) => {
    const response = await api.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Lấy danh sách bài viết
  getPosts: async () => {
    const response = await api.get("/posts");
    return response.data.data;
  },

  // Lấy bài viết theo user
  getPostByUser: async (userId) => {
    const response = await api.get(`/posts/${userId}`);
    return response.data;
  },

  // Xóa bài viết
  deletePost: async (postId) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  },

  // Like bài viết
  likePost: async (postId) => {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  },

  // Bỏ like bài viết
  unlikePost: async (postId) => {
    const response = await api.delete(`/posts/${postId}/like`);
    return response.data;
  },

  // Bình luận bài viết
  commentPost: async (postId, commentData) => {
    // commentData là object: { content: "Nội dung", ... }
    const response = await api.post(`/posts/${postId}/comment`, commentData);
    return response.data;
  },

  // Xóa comment
  deleteComment: async (postId, commentId) => {
    const response = await api.delete(`/posts/${postId}/comment/${commentId}`);
    return response.data;
  },

  adminDeletePost: async (postId) => {
    const response = await api.delete(`/posts/${postId}/admin`);
    return response.data;
  },
};

// Gửi lời mời kết bạn
const sendRequest = async (user) => {
    const response =await api.post(`/friends/request/${user.id}`);
    console.log('Đã gửi lời mời kết bạn tới', user.name);
    return response.data;
};

// Huỷ lời mời đã gửi
const cancelRequest = async (user) => {
    const response = await api.delete(`/friends/request/${user.id}`);
    console.log('Đã huỷ lời mời kết bạn với', user.name);
    return response.data;
};

// Chấp nhận lời mời
const acceptRequest = async (user) => {
  const response = await api.post(`/friends/accept/${user.id}`);
  console.log('Đã chấp nhận lời mời kết bạn từ', user.name);
  return response.data;
};

// Huỷ kết bạn
const unfriend = async (user) => {
  const response = await api.delete(`/friends/${user.id}`);
  console.log('Đã huỷ kết bạn với', user.name)
  return response.data;
};

// Lấy danh sách bạn bè
const getFriends = async () => {
  const response = await api.get('/friends');
  return response.data;
};

// Lấy danh sách lời mời đã nhận
const getReceivedRequests = async () => {
  const response = await api.get('/friends/requests/received');
  return response.data;
};

// Lấy danh sách lời mời đã gửi
const getSentRequests = async () => {
  const response = await api.get('/friends/requests/sent');
  return response.data;
};

// Lấy danh sách thông báo
const getNotifications = async () => {
  const response = await api.get('/notifications');
  return response.data;
};

export {
    api,
    loginAPI,
    logoutAPI,
    registerAPI,
    resetPasswordAPI,
    postAPI,
    getMeAPI,
    getUserByIdAPI,
    sendRequest,
    cancelRequest,
    acceptRequest,
    unfriend,
    getFriends,
    getReceivedRequests,
    getSentRequests,
    updateUser,
    getAllUsersAPI,
    deleteUserAPI,
    getNotifications,
}


