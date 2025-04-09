import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/layout/Navbar";
import EditProfile from "./pages/EditProfile";
import { FriendProvider } from "./context/FriendContext";
import { AuthContext } from "./context/AuthContext";
import FriendRequestsPopup from "./components/social/FriendRequestsPopup";
import ErrorBoundary from "./components/common/ErrorBoundary";
import MessagesPopup from './components/social/MessagesPopup';
import ProfilePopup from './components/social/ProfilePopup';

// Tạo component ProtectedRoute để bảo vệ các route cần đăng nhập
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <ErrorBoundary>
        <FriendProvider>
          <Navbar />
          <Routes>
            {/* Trang chủ được bảo vệ, cần đăng nhập */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            {/* Các route không cần đăng nhập */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* Các route khác cũng cần đăng nhập */}
            <Route 
              path="/profile/:userId" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit-profile" 
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              } 
            />
          </Routes>
          {user && (
            <>
              <FriendRequestsPopup currentUserId={user.id} />
              <MessagesPopup />
              <ProfilePopup />
            </>
          )}
        </FriendProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;