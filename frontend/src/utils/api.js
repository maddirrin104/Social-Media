import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
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
    const message = error.response?.data?.message || error.message || "Something went wrong";
    return Promise.reject(message);
    }
);

//login
const login = async (email, password) => {
  try {
    const response = await api.post("api/auth/login", { email, password });
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


export {
    api,
    login,
}

