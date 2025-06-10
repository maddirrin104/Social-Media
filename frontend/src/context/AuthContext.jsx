import { createContext, useContext, useState, useEffect } from 'react';
// import { users } from '../data/users';
import { loginAPI, registerAPI, logoutAPI, api } from '../utils/api';  

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      api.get("/users/me")
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
          setUser(null);
        });
    }
  }, []);

  //đăng nhập
  const login = async ({ email, password }) => {
    const data = await loginAPI(email, password);
    localStorage.setItem("user", JSON.stringify(data.user));
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
    localStorage.setItem("user", JSON.stringify(data.user));
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