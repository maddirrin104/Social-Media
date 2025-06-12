import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Pages
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import SearchResult from '../pages/SearchResult';
import AdminDashboard from '../pages/AdminDashboard';
import AuthPage from '../pages/AuthPage'; //login&register

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (
    isAdmin() &&
    location.pathname !== '/admin' &&
    !location.pathname.startsWith('/profile/')
  ) {
    return <Navigate to="/admin" />;
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" />;
  }

  return children;
};

const AppRoutes = () => {
  const { user, isAdmin } = useAuth();
  return (
    <Routes>
      <Route
        path="/login"
        element={
          user ? (
            isAdmin() ? <Navigate to="/admin" /> : <Navigate to="/" />
          ) : (
            <AuthPage />
          )
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:userId"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/search-result"
        element={
          <ProtectedRoute>
            <SearchResult />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes; 
export { ProtectedRoute }; 