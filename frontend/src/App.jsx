import React, { useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import FloatingNav from './components/common/FloatingNav';
import FloatingSearch from './components/common/FloatingSearch';
import { useAuth } from './context/AuthContext';
import ScrollToTop from './components/common/ScrollToTop';
import Modal from './components/common/Modal';
import { notifications } from './data/notification';
import NotificationList from './components/notifications/NotificationList';
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
      <Modal
        open={openNotificationModal}
        onClose={() => setOpenNotificationModal(false)}
        title="Thông báo"
        width={550}
      >
        <NotificationList notifications={notifications} userId={user?.id} />
      </Modal>
    </div>
  );
}

export default App;
