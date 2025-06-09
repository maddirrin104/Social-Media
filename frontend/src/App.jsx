import React, { useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import FloatingNav from './components/common/FloatingNav';
import { useAuth } from './context/AuthContext';
import ScrollToTop from './components/common/ScrollToTop';
import NotificationModal from './components/notifications/NotificationModal';
import { notifications } from './data/notification';
import HeadBar from './components/common/HeadBar';
import './App.css';

function App() {
  const { user } = useAuth();
  const [openNotificationModal, setOpenNotificationModal] = useState(false);

  return (
    <div className="app">
      {user && (
        <>
          <HeadBar />
          <FloatingNav onOpenNotification={() => setOpenNotificationModal(true)} />
        </>
      )}
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
    </div>
  );
}

export default App;
