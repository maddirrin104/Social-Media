import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

let echo = null;

export const initEcho = (token) => {
  if (!token) {
    console.error('Không thể khởi tạo Echo: Token không tồn tại');
    return null;
  }

  window.Pusher = Pusher;

  echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST || 'localhost',
    wsPort: import.meta.env.VITE_REVERB_PORT || 8080,
    wssPort: import.meta.env.VITE_REVERB_PORT || 8080,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME || 'http') === 'https',
    encrypted: (import.meta.env.VITE_REVERB_SCHEME || 'http') === 'https',
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    cluster: 'mt1',
    authEndpoint: 'http://localhost:8000/broadcasting/auth',
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  });

  // Kiểm tra kết nối
  echo.connector.pusher.connection.bind('connected', () => {
    console.log('Đã kết nối với WebSocket');
  });

  echo.connector.pusher.connection.bind('disconnected', () => {
    console.log('Đã ngắt kết nối khỏi WebSocket');
  });

  echo.connector.pusher.connection.bind('error', (error) => {
    console.error('Lỗi kết nối WebSocket:', error);
  });

  return echo;
};

export const getEcho = () => echo;

export const destroyEcho = () => {
  if (echo) {
    echo.disconnect();
    echo = null;
  }
};

export default {
  initEcho,
  getEcho,
  destroyEcho,
};