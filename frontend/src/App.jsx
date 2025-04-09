import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <ErrorBoundary>
        <FriendProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
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
