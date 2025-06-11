import axios from "axios";

const api = axios.create({
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

export default api;