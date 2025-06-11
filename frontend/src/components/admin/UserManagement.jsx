import { useState, useEffect } from 'react';
import Button from '../common/Button';
import ConfirmModal from '../common/ConfirmModal';
import '../../styles/components/admin/UserManagement.css';
import { getAllUsersAPI, deleteUserAPI } from '../../utils/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null); // để disable nút khi đang xóa
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // Lấy users từ API thật
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      let data = await getAllUsersAPI();
      if (data && data.data) data = data.data;
      setUsers(Array.isArray(data) ? data : []);
    } catch  {
      setError('Lỗi tải danh sách người dùng!');
    } finally {
      setLoading(false);
    }
  };

  // Hàm xóa user thật sự trên backend
  const handleDeleteUser = async (userId) => {
    setIsDeleteModalOpen(false);
    setDeletingId(userId);
    try {
      await deleteUserAPI(userId);
      setUsers(users => users.filter(user => user.id !== userId));
    } catch {
      alert('Xóa user thất bại!');
    } finally {
      setDeletingId(null);
      setDeleteUserId(null);
    }
  };

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
                    disabled={deletingId === user.id}
                    onClick={() => {
                      setDeleteUserId(user.id);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    {deletingId === user.id ? 'Đang xóa...' : 'Xóa'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        message="Bạn có chắc chắn muốn xóa người dùng này?"
        onConfirm={() => handleDeleteUser(deleteUserId)}
        onCancel={() => { setIsDeleteModalOpen(false); setDeleteUserId(null); }}
      />
    </div>
  );
};

export default UserManagement;