import { useState, useEffect } from 'react';
import api from '../utils/axiosInstance';

export default function useUsersByIds(ids = []) {
  const [users, setUsers] = useState({});
  useEffect(() => {
    if (!ids.length) return;
    api.get('/users/noti', { params: { ids: ids.join(',') } })
      .then(res => {
        // Giả sử API trả về mảng user [{id, name, avatar, ...}]
        const usersObj = {};
        res.data.forEach(u => { usersObj[u.id] = u; });
        setUsers(usersObj);
      })
      .catch(() => setUsers({}));
  }, [ids]); 
  return users;
}