import React, { useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import FloatingNav from './components/common/FloatingNav';
import { useAuth } from './context/AuthContext';
import ScrollToTop from './components/common/ScrollToTop';
import NotificationModal from './components/notifications/NotificationModal';
import { notifications } from './data/notification';
import HeadBar from './components/common/HeadBar';
import { MessageModal, ChatSidebar, ChatWindow } from './components/messages';
import Friends from './components/friends/Friends';
import './App.css';
import { useLocation } from 'react-router-dom';
import AdminHeadbar from './components/admin/AdminHeadbar';
import useFriendLists from './hooks/useFriendLists';

function App() {
  const { user, isAdmin } = useAuth();
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [openFriendsModal, setOpenFriendsModal] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  const { friends, loading } = useFriendLists(user?.id);

  return (
    <div className="app">
      {user && (
        isAdmin() ? (
          <AdminHeadbar activeTab={isAdminPage ? 'users' : 'posts'} onTabChange={() => {}} />
        ) : (
          <HeadBar />
        )
      )}
      {user && !isAdmin() && <FloatingNav
        onOpenNotification={() => setOpenNotificationModal(true)}
        onOpenMessages={() => setOpenMessageModal(true)}
        onOpenFriendRequest={() => setOpenFriendsModal(true)}
      />}
      <main className="main-content">
        <ScrollToTop />
        <AppRoutes />
      </main>
      <NotificationModal
        open={openNotificationModal}
        onClose={() => setOpenNotificationModal(false)}
        notifications={notifications}
        userId={user?.id}
      />
      <MessageModal
        open={openMessageModal}
        onClose={() => setOpenMessageModal(false)}
      />
      <Friends
        open={openFriendsModal}
        onClose={() => setOpenFriendsModal(false)}
        userId={user?.id}
      />
    </div>
  );
}

export default App;
