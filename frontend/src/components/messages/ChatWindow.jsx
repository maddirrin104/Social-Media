import React from 'react';

const users = [
  { id: 1, name: 'Margot Robbie', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', online: true },
  { id: 2, name: 'Katy Pery', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', online: true },
  { id: 3, name: 'Will Smith', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', online: false, lastActive: '5 min' },
  { id: 4, name: 'Jeremy Clarkson', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', online: false, lastActive: '7 min' },
  { id: 5, name: 'James Anderson', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', online: false },
  { id: 6, name: 'Charlotte Lebon', avatar: 'https://randomuser.me/api/portraits/women/6.jpg', online: false },
  { id: 7, name: 'Beth Behrs', avatar: 'https://randomuser.me/api/portraits/women/7.jpg', online: false },
  { id: 8, name: 'Tom Selleck', avatar: 'https://randomuser.me/api/portraits/men/8.jpg', online: false },
];

const messagesData = {
  1: [
    { fromMe: false, text: 'Hi Jenny how are you today ?', time: '9:34 PM' },
    { fromMe: false, text: 'Did you train yesterday ?', time: '9:34 PM' },
    { fromMe: true, text: 'Great. What about you ?', time: '9:34 PM' },
    { fromMe: true, text: 'Of course I did. Speaking of which check this out', time: '9:34 PM' },
    { fromMe: false, text: 'Good job, you look good and healthy!', time: '9:34 PM' },
    { fromMe: false, text: 'Keep it up. See you next week', time: '9:34 PM' },
  ],
  // Thêm dữ liệu mẫu cho các user khác nếu muốn
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

  if (!user) return <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:'#aaa'}}>Chọn một người để bắt đầu trò chuyện</div>;

  return (
    <div style={{flex:1, display:'flex', flexDirection:'column', height:'100%'}}>
      {/* ChatHeader */}
      <div style={{display:'flex', alignItems:'center', borderBottom:'1px solid #eee', padding:'12px 20px', background:'#fff'}}>
        <img src={user.avatar} alt={user.name} style={{width:40, height:40, borderRadius:'50%', marginRight:12}} />
        <div>
          <div style={{fontWeight:600, fontSize:18}}>{user.name}</div>
          <div style={{fontSize:13, color:user.online?'#4caf50':'#aaa'}}>{user.online?'online':user.lastActive?`active ${user.lastActive}`:'offline'}</div>
        </div>
      </div>
      {/* ChatMessages */}
      <div style={{flex:1, padding:20, overflowY:'auto', background:'#f9f9fb'}}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{display:'flex', justifyContent:msg.fromMe?'flex-end':'flex-start', marginBottom:8}}>
            <div style={{
              background: msg.fromMe ? '#3ec6e0' : '#f1f1f1',
              color: msg.fromMe ? '#fff' : '#333',
              borderRadius: 18,
              padding: '10px 16px',
              maxWidth: 320,
              fontSize: 15,
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
            }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      {/* ChatInput */}
      <div style={{display:'flex', alignItems:'center', padding:'12px 20px', borderTop:'1px solid #eee', background:'#fff'}}>
        <input
          type="text"
          placeholder={`Reply to ${user.name}...`}
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{flex:1, padding:10, borderRadius:20, border:'1px solid #ddd', marginRight:12}}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
        />
        <button onClick={handleSend} style={{background:'#3ec6e0', color:'#fff', border:'none', borderRadius:'50%', width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, cursor:'pointer'}}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatWindow; 