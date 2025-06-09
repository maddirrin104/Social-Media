import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Pages
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Notifications from '../pages/Notifications';
import SearchResult from '../pages/SearchResult';
import AdminDashboard from '../pages/AdminDashboard';
import AuthPage from '../pages/AuthPage'; //login&register

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
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
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <SearchResult />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes; 