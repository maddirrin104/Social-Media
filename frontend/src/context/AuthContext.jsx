import { createContext, useContext, useState } from 'react';
// import { users } from '../data/users';
import { loginAPI, registerAPI, logoutAPI } from '../utils/api';  

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //đăng nhập
  const login = async ({ email, password }) => {
    const data = await loginAPI(email, password);
    setUser(data.user);
    return data;
  };
  
  //đăng kí
  const register = async ({ full_name, email, password, password_confirmation }) => {
    const data = await registerAPI(
      full_name,
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
    setUser(null);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

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