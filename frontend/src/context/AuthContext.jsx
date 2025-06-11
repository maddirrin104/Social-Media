import { createContext, useContext, useState, useEffect } from 'react';
// import { users } from '../data/users';
import { loginAPI, registerAPI, logoutAPI, getMeAPI, api } from '../utils/api';  

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Khôi phục user nếu đã lưu trong localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {setLoading(true);}

    const token = localStorage.getItem("access_token");
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, []);

  //đăng nhập
  const login = async ({ email, password }) => {
    const data = await loginAPI(email, password);
    setUser(data.user);
    return data;
  };
  
  //đăng kí
  const register = async ({ name, email, password, password_confirmation }) => {
    const data = await registerAPI(
      name,
      email,
      password,
      password_confirmation
    );

    setUser(data.user);
    return data;
  };

  //đăng xuất
  const logout = async () => {
    await logoutAPI();
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setUser(null);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 