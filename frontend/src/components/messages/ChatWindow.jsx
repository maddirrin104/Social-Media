import React from 'react';
import { users } from '../../data/users';
import { messages } from '../../data/messages';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components/ChatWindow.css';

const ChatWindow = ({ userId }) => {
  const { user: currentUser } = useAuth();
  const user = users.find(u => u.id === userId);
  const [input, setInput] = React.useState('');

  // Lọc tin nhắn giữa currentUser và userId
  const filteredMessages = React.useMemo(() => {
    if (!currentUser || !userId) return [];
    return messages
      .filter(
        m =>
          (m.senderId === currentUser.id && m.receiverId === userId) ||
          (m.senderId === userId && m.receiverId === currentUser.id)
      )
      .sort((a, b) => a.createdAt - b.createdAt);
  }, [currentUser, userId]);

  const [localMessages, setLocalMessages] = React.useState([]);

  React.useEffect(() => {
    setLocalMessages(filteredMessages);
  }, [filteredMessages]);

  // Tự động cuộn xuống dưới cùng khi có tin nhắn mới
  const messagesEndRef = React.useRef(null);
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [localMessages]);

  const handleSend = () => {
    if (input.trim() && currentUser && userId) {
      const newMsg = {
        id: Date.now(),
        senderId: currentUser.id,
        receiverId: userId,
        content: input,
        createdAt: Date.now(),
        isRead: false
      };
      setLocalMessages([...localMessages, newMsg]);
      setInput('');
    }
  };

  if (!userId || !user) return <div className="chat-window-empty">Chọn một người để bắt đầu trò chuyện</div>;

  return (
    <div className="chat-window">
      {/* ChatHeader */}
      <div className="chat-window-header">
        <img src={user.avatar} alt={user.name} className="chat-window-avatar" />
        <div>
          <div className="chat-window-name">{user.name}</div>
          {/* Có thể bổ sung trạng thái online nếu muốn */}
        </div>
      </div>
      {/* ChatMessages */}
      <div className="chat-window-messages">
        {localMessages.map((msg, idx) => (
          <div
            key={msg.id || idx}
            className={`chat-message-row${msg.senderId === currentUser.id ? ' me' : ''}`}
          >
            <div className={`chat-message-bubble${msg.senderId === currentUser.id ? ' me' : ''}`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* ChatInput */}
      <div className="chat-window-input-row">
        <input
          type="text"
          className="chat-window-input"
          placeholder={`Reply to ${user.name}...`}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
        />
        <button className="chat-window-send-btn" onClick={handleSend}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow; 