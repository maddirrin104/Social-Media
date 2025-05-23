import { createContext, useEffect, useState, useCallback } from 'react';
import { chatAPI } from '../utils/api';
import { getEcho } from '../utils/echo';
import { useAuth } from './useAuth';

// Tạo context
const ChatContext = createContext();

// ChatProvider component
function ChatProvider({ children }) {
  const { user, token } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversationsLoaded, setConversationsLoaded] = useState(false);

  // Các hàm xử lý sự kiện được bọc trong useCallback để tránh re-render không cần thiết
  const fetchConversations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await chatAPI.getConversations();
      
      // Sắp xếp cuộc trò chuyện theo tin nhắn mới nhất
      const sortedConversations = response.data.sort((a, b) => {
        const timeA = a.latest_message ? new Date(a.latest_message.created_at) : new Date(a.created_at);
        const timeB = b.latest_message ? new Date(b.latest_message.created_at) : new Date(b.created_at);
        return timeB - timeA;
      });
      
      setConversations(sortedConversations);
      setConversationsLoaded(true);
      setError(null);
    } catch (err) {
      console.error('Lỗi khi lấy danh sách cuộc trò chuyện:', err);
      setError('Không thể tải danh sách cuộc trò chuyện');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMessages = useCallback(async (conversationId) => {
    try {
      setLoading(true);
      const response = await chatAPI.getMessages(conversationId);
      setMessages(response.data);
      setError(null);
    } catch (err) {
      console.error(`Lỗi khi lấy tin nhắn cho cuộc trò chuyện ${conversationId}:`, err);
      setError('Không thể tải tin nhắn');
    } finally {
      setLoading(false);
    }
  }, []);

  const markConversationAsRead = useCallback(async (conversationId) => {
    try {
      await chatAPI.markAllAsRead(conversationId);
      
      // Cập nhật số tin nhắn chưa đọc trong state
      setConversations((prev) => {
        return prev.map((conv) => {
          if (conv.id === conversationId) {
            return { ...conv, unread_count: 0 };
          }
          return conv;
        });
      });
    } catch (err) {
      console.error('Lỗi khi đánh dấu tin nhắn đã đọc:', err);
    }
  }, []);

  const updateConversationWithLatestMessage = useCallback((conversationId, message) => {
    setConversations((prev) => {
      return prev.map((conv) => {
        if (conv.id === conversationId) {
          // Cập nhật tin nhắn mới nhất
          const updatedConv = { ...conv, latest_message: message };
          
          // Cập nhật số tin nhắn chưa đọc nếu tin nhắn là từ người khác
          if (message.sender_id !== user?.id) {
            updatedConv.unread_count = (conv.unread_count || 0) + 1;
          }
          
          return updatedConv;
        }
        return conv;
      });
    });
  }, [user]);

  // Lấy danh sách cuộc trò chuyện khi người dùng đã đăng nhập
  useEffect(() => {
    if (user && token) {
      fetchConversations();
    } else {
      setConversations([]);
      setActiveConversation(null);
      setMessages([]);
      setConversationsLoaded(false);
    }
  }, [user, token, fetchConversations]);

  // Theo dõi tin nhắn mới khi conversation active thay đổi
  useEffect(() => {
    if (!activeConversation || !user) return;

    fetchMessages(activeConversation.id);
    markConversationAsRead(activeConversation.id);
    
    // Thiết lập listener cho tin nhắn mới
    const echo = getEcho();
    if (echo) {
      // Sử dụng presence channel với Reverb
      const channel = echo.join(`conversation.${activeConversation.id}`);
      
      channel.here((users) => {
        console.log('Users in the channel:', users);
      });
      
      // Lắng nghe event "new.message" từ server
      channel.listen('.new.message', (data) => {
        console.log('New message received:', data);
        
        // Thêm tin nhắn mới vào state
        setMessages((prevMessages) => {
          // Kiểm tra xem tin nhắn đã tồn tại chưa
          const messageExists = prevMessages.some(msg => msg.id === data.id);
          if (messageExists) {
            return prevMessages;
          }
          return [...prevMessages, data];
        });
        
        // Nếu tin nhắn không phải từ người dùng hiện tại, đánh dấu là đã đọc
        if (data.sender_id !== user.id) {
          markConversationAsRead(activeConversation.id);
        }
        
        // Cập nhật trạng thái cuộc trò chuyện
        updateConversationWithLatestMessage(activeConversation.id, data);
      });
      
      // Cleanup listener khi component unmount hoặc conversation thay đổi
      return () => {
        channel.unsubscribe();
      };
    }
  }, [activeConversation, user, fetchMessages, markConversationAsRead, updateConversationWithLatestMessage]);

  const createConversation = async (userId) => {
    try {
      setLoading(true);
      const response = await chatAPI.createConversation(userId);
      
      // Cập nhật danh sách cuộc trò chuyện và chọn cuộc trò chuyện mới
      setConversations((prev) => {
        // Kiểm tra xem cuộc trò chuyện đã tồn tại chưa
        const existingIndex = prev.findIndex((conv) => conv.id === response.data.id);
        
        if (existingIndex >= 0) {
          // Nếu đã tồn tại, cập nhật thông tin mới nhất
          const updated = [...prev];
          updated[existingIndex] = response.data;
          return updated;
        } else {
          // Nếu chưa tồn tại, thêm vào đầu danh sách
          return [response.data, ...prev];
        }
      });
      
      setActiveConversation(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Lỗi khi tạo cuộc trò chuyện:', err);
      setError('Không thể tạo cuộc trò chuyện');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (conversationId, content, media = null) => {
    try {
      setLoading(true);
      const response = await chatAPI.sendMessage(conversationId, content, media);
      
      // Cập nhật tin nhắn mới vào state
      setMessages((prev) => [...prev, response.data]);
      
      // Cập nhật tin nhắn mới nhất vào cuộc trò chuyện
      updateConversationWithLatestMessage(conversationId, response.data);
      
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Lỗi khi gửi tin nhắn:', err);
      setError('Không thể gửi tin nhắn');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      setLoading(true);
      await chatAPI.deleteMessage(messageId);
      
      // Xóa tin nhắn khỏi state
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
      
      setError(null);
      return true;
    } catch (err) {
      console.error('Lỗi khi xóa tin nhắn:', err);
      setError('Không thể xóa tin nhắn');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async (query) => {
    try {
      setLoading(true);
      const response = await chatAPI.searchUsers(query);
      setError(null);
      return response.data;
    } catch (err) {
      console.error('Lỗi khi tìm kiếm người dùng:', err);
      setError('Không thể tìm kiếm người dùng');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const selectConversation = async (conversationId) => {
    // Tìm cuộc trò chuyện trong danh sách
    const conversation = conversations.find((conv) => conv.id === conversationId);
    
    if (conversation) {
      setActiveConversation(conversation);
      return conversation;
    } else {
      try {
        // Nếu không tìm thấy, fetch từ API
        const response = await chatAPI.getConversation(conversationId);
        setActiveConversation(response.data);
        return response.data;
      } catch (err) {
        console.error('Lỗi khi chọn cuộc trò chuyện:', err);
        setError('Không thể tải thông tin cuộc trò chuyện');
        return null;
      }
    }
  };

  const value = {
    conversations,
    activeConversation,
    messages,
    loading,
    error,
    conversationsLoaded,
    fetchConversations,
    fetchMessages,
    createConversation,
    sendMessage,
    markConversationAsRead,
    deleteMessage,
    searchUsers,
    selectConversation,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export { ChatContext, ChatProvider };