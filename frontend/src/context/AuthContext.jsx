import { createContext, useContext, useState, useEffect } from 'react';
// import { users } from '../data/users';
import { loginAPI, registerAPI, logoutAPI, getMeAPI, api } from '../utils/api';  

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
          }
      try {
        const res = await getMeAPI();
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   } else {setLoading(true);}

  //   const token = localStorage.getItem("access_token");
  //   if (token) {
  //     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //   } else {
  //     delete api.defaults.headers.common['Authorization'];
  //   }
  // }, []);

  //đăng nhập
  const login = async ({ email, password }) => {
    const data = await loginAPI(email, password);
    setUser(data.user);
    setIsAuthenticated(true);
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
    setIsAuthenticated(true);
    setUser(data.user);
    return data;
  };

  //đăng xuất
  const logout = async () => {
    await logoutAPI();
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    setUser(null);
    setIsAuthenticated(false);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user,setUser,  login, logout, register, isAdmin, isAuthenticated, setIsAuthenticated }}>
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