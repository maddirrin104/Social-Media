import React from 'react';
import { getMessage, sendMessage } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components/ChatWindow.css';

const ChatWindow = ({ userId, user }) => {
  const { user: currentUser } = useAuth();
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/';

  function getAvatarUrl(avatarPath) {
    if (!avatarPath) return '/images/default-avatar.png';
    if (avatarPath.startsWith('http')) return avatarPath;
    return BASE_URL + 'storage/' + avatarPath;
  }

  // Lấy lịch sử chat khi userId thay đổi (chọn bạn mới)
  React.useEffect(() => {
    const fetchMessages = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const msgs = await getMessage(userId);
        setMessages(msgs);
      } catch {
        setMessages([]);
      }
      setLoading(false);
    };
    fetchMessages();
  }, [userId]);

  // Tự động cuộn xuống khi có tin nhắn mới
  const messagesEndRef = React.useRef(null);
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !currentUser || !userId) return;
    try {
      const msg = await sendMessage(userId, input);
      setMessages(prev => [...prev, msg]);
      setInput('');
    } catch {
      // Có thể handle error ở đây
    }
  };

  if (!userId || !user) return <div className="chat-window-empty">Chọn một người để bắt đầu trò chuyện</div>;

  return (
    <div className="chat-window">
      {/* ChatHeader */}
      <div className="chat-window-header">
        <img src={getAvatarUrl(user.avatar)} alt={user.name} className="chat-window-avatar" />
        <div>
          <div className="chat-window-name">{user.name}</div>
        </div>
      </div>
      {/* ChatMessages */}
      <div className="chat-window-messages">
        {loading ? (
          <div className="chat-window-loading">Đang tải tin nhắn...</div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={msg.id || idx}
              className={`chat-message-row${msg.sender_id === currentUser.id ? ' me' : ''}`}
            >
              <div className={`chat-message-bubble${msg.sender_id === currentUser.id ? ' me' : ''}`}>
                {msg.content}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* ChatInput */}
      <div className="chat-window-input-row">
        <input
          type="text"
          className="chat-window-input"
          placeholder={`Nhắn cho ${user.name}...`}
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