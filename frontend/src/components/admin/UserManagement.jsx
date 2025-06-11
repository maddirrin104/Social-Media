import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import { users as mockUsers } from '../../data/users';
import '../../styles/components/admin/UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUsers(mockUsers);
    setLoading(false);
  }, []);

  // Hàm này chỉ dùng cho dữ liệu giả
  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  // --- CODE API THẬT (giữ lại để sau này dùng) ---
  // const fetchUsers = async () => {
  //   try {
  //     const response = await api.get('/admin/users');
  //     setUsers(response.data);
  //     setLoading(false);
  //   } catch (err) {
  //     setError('Không thể tải danh sách người dùng');
  //     setLoading(false);
  //   }
  // };
  // const handleToggleStatus = async (userId, currentStatus) => {
  //   try {
  //     await api.put(`/admin/users/${userId}/toggle-status`);
  //     setUsers(users.map(user => 
  //       user.id === userId 
  //         ? { ...user, status: currentStatus === 'active' ? 'inactive' : 'active' }
  //         : user
  //     ));
  //   } catch (err) {
  //     setError('Không thể thay đổi trạng thái người dùng');
  //   }
  // };

  if (loading) return <div className="admin-loading">Đang tải...</div>;
  if (error) return <div className="admin-error">{error}</div>;

  return (
    <div className="admin-user-management">
      <div className="admin-user-header">
        <h2>Quản lý người dùng</h2>
        <div className="admin-user-stats">
          <div className="admin-stat-card">
            <span className="admin-stat-label">Tổng số người dùng</span>
            <span className="admin-stat-value">{users.length}</span>
          </div>
        </div>
      </div>

      <div className="admin-user-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    variant="danger"
                    size="small"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement; 