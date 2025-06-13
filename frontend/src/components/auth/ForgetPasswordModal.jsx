import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import '../../styles/components/ForgetPasswordModal.css';

const ForgetPasswordModal = ({ open, onClose }) => {
  const [step, setStep] = useState(1); // 1: nhập email, 2: nhập mã xác nhận, 3: nhập mật khẩu mới
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Vui lòng nhập email');
      return;
    }
    // Giả lập loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (!code) {
      setError('Vui lòng nhập mã xác nhận');
      return;
    }
    // Giả lập loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1000);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!newPassword) {
      setError('Vui lòng nhập mật khẩu mới');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }
    // Giả lập loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1000);
  };

  if (!open) return null;

  return (
    <div className="forget-password-overlay" onClick={onClose}>
      <div className="forget-password-content" onClick={e => e.stopPropagation()}>
        <button className="forget-password-close" onClick={onClose}>&times;</button>
        <h2>Quên mật khẩu</h2>
        
        {step === 1 ? (
          <form onSubmit={handleSendCode}>
            <p>Nhập email của bạn để nhận mã xác nhận</p>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
            />
            <Button 
              type="submit" 
              variant="primary" 
              loading={loading}
              disabled={loading}
            >
              Gửi mã xác nhận
            </Button>
          </form>
        ) : step === 2 ? (
          <form onSubmit={handleVerifyCode}>
            <p>Nhập mã xác nhận đã được gửi đến email của bạn</p>
            <Input
              type="text"
              placeholder="Mã xác nhận"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              error={error}
            />
            <Button 
              type="submit" 
              variant="primary" 
              loading={loading}
              disabled={loading}
            >
              Xác nhận
            </Button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <p>Nhập mật khẩu mới của bạn</p>
            <Input
              type="password"
              placeholder="Mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={error}
            />
            <Input
              type="password"
              placeholder="Xác nhận mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={error}
            />
            <Button 
              type="submit" 
              variant="primary" 
              loading={loading}
              disabled={loading}
            >
              Đặt lại mật khẩu
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgetPasswordModal; 