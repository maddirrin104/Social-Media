import { createContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../utils/api';
import { initEcho, destroyEcho } from '../utils/echo';

// Tạo context
const AuthContext = createContext();

// AuthProvider component
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sử dụng useCallback để tránh re-render không cần thiết
  const logout = useCallback(async () => {
    try {
      if (token) {
        await authAPI.logout();
      }
    } catch (err) {
      console.error('Lỗi đăng xuất:', err);
    } finally {
      destroyEcho();
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
    }
  }, [token]);

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await authAPI.getUser();
      setUser(response.data);
      setError(null);
    } catch (err) {
      console.error('Lỗi khi lấy thông tin người dùng:', err);
      setError('Không thể lấy thông tin người dùng');
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  // Khởi tạo Echo khi token tồn tại
  useEffect(() => {
    if (token) {
      initEcho(token);
      fetchUserData();
    } else {
      setLoading(false);
    }
    
    return () => {
      destroyEcho();
    };
  }, [token, fetchUserData]);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authAPI.login(email, password);
      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('token', newToken);
      
      initEcho(newToken);
      
      return true;
    } catch (err) {
      console.error('Lỗi đăng nhập:', err);
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      const { token: newToken, user: newUser } = response.data;
      
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('token', newToken);
      
      initEcho(newToken);
      
      return true;
    } catch (err) {
      console.error('Lỗi đăng ký:', err);
      setError(err.response?.data?.message || 'Đăng ký thất bại');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    refreshUser: fetchUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };