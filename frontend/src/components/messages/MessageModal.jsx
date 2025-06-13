import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import useFriendLists from '../../hooks/useFriendLists';
import { getMessage, sendMessage } from '../../utils/api';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import '../../styles/components/MessageModal.css';

const MessageModal = ({ open, onClose }) => {
  const { user: currentUser } = useAuth();
  const [selectedChatId, setSelectedChatId] = useState(null);
  const { friends, loading: friendsLoading } = useFriendLists(currentUser?.id);

  if (!open) return null;

  return (
    <div className="message-modal-overlay" onClick={onClose}>
      <div className="message-modal-content" onClick={e => e.stopPropagation()}>
        <button className="message-modal-close" onClick={onClose} aria-label="Đóng">&times;</button>
        
        <div className="message-modal-container">
          <ChatSidebar 
            selectedId={selectedChatId} 
            onSelect={setSelectedChatId} 
            userId={currentUser?.id} 
          />
          <ChatWindow 
            userId={selectedChatId} 
            user={friends.find(f => f.id === selectedChatId)} 
          />
        </div>
      </div>
    </div>
  );
};

export default MessageModal; 