import React from 'react';
import { users } from '../../data/users';
import '../../styles/components/ChatWindow.css';

// Dữ liệu tin nhắn mẫu cho các userId thật
const messagesData = {
  102: [
    { fromMe: false, text: 'Chào bạn!', time: '9:34 PM' },
    { fromMe: true, text: 'Chào bạn, khoẻ không?', time: '9:35 PM' },
  ],
  105: [
    { fromMe: false, text: 'Đi chơi không?', time: '8:00 PM' },
    { fromMe: true, text: 'Ok luôn!', time: '8:01 PM' },
  ],
  // Thêm các userId thật khác nếu muốn
};

const ChatWindow = ({ userId }) => {
  const user = users.find(u => u.id === userId);
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState(messagesData[userId] || []);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { fromMe: true, text: input, time: new Date().toLocaleTimeString() }]);
      setInput('');
    }
  };

  if (!user) return <div className="chat-window-empty">Chọn một người để bắt đầu trò chuyện</div>;

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
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message-row${msg.fromMe ? ' me' : ''}`}>
            <div className={`chat-message-bubble${msg.fromMe ? ' me' : ''}`}>
              {msg.text}
            </div>
          </div>
        ))}
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