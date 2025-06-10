import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  withCredentials: true
});

const api_notInterceptors = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  withCredentials: true
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    const customError = {
      message: error.response?.data?.message || error.message || "Something went wrong",
      statusCode: error.response?.status || 500,
      data: error.response?.data || {},
      originalError: error
    };
    return Promise.reject(customError);
  }
);

//register
const registerAPI = async (name, email, password) => {
  try {
    const response = await api_notInterceptors.post("/auth/register", {
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
    const response = await api_notInterceptors.post("/auth/login", { email, password });
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
    await api.post("/auth/logout");
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
      const response = await api_notInterceptors.post('/reset-password', { email });
      return response.data;
    } catch (error) {
      console.error('Request password reset error:', error);
      throw error;
    }
  },

  // Đặt lại mật khẩu mới với token
  resetPassword: async (token, password, password_confirmation) => {
    try {
      const response = await api_notInterceptors.put(`/reset-password/${token}`, {
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

//chat api
const chatAPI = {
  // Conversations
  getConversations: () => api.get('/conversations'),
  getConversation: (id) => api.get(`/conversations/${id}`),
  createConversation: (userId) => api.post('/conversations', { user_id: userId }),
  
  // Messages
  getMessages: (conversationId) => api.get(`/conversations/${conversationId}/messages`),
  sendMessage: (conversationId, content, media = null) => {
    const formData = new FormData();
    formData.append('content', content);
    
    if (media) {
      formData.append('media', media);
    }
    
    return api.post(`/conversations/${conversationId}/messages`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  markAllAsRead: (conversationId) => api.put(`/conversations/${conversationId}/read`),
  deleteMessage: (messageId) => api.delete(`/messages/${messageId}`),
  
  // Users
  searchUsers: (query) => api.get(`/users/search?query=${query}`),
};


export {
    api_notInterceptors,
    api,
    loginAPI,
    logoutAPI,
    registerAPI,
    resetPasswordAPI,
    chatAPI
}


