import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AuthForm = ({ mode, onSwitch }) => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const newErrors = {};
    if (mode === 'register') {
      if (!formData.name) newErrors.name = 'Vui lòng nhập họ tên';
      if (!formData.email) newErrors.email = 'Vui lòng nhập email';
      if (!formData.password) newErrors.password = 'Vui lòng nhập mật khẩu';
      if (formData.password !== formData.password_confirmation) newErrors.password_confirmation = 'Mật khẩu không khớp';
      if (Object.keys(newErrors).length === 0) {
        try {
          await register(formData);
          navigate('/');
        } catch (err) {
          setErrorMsg(err.message || 'Đăng ký thất bại');
        }
      } else setErrors(newErrors);
    } else {
      if (!formData.email) newErrors.email = 'Vui lòng nhập email';
      if (!formData.password) newErrors.password = 'Vui lòng nhập mật khẩu';
      if (Object.keys(newErrors).length === 0) {
        try {
          await login({
            email: formData.email,
            password: formData.password
          });
          navigate('/');
        } catch (err) {
          setErrorMsg(err.message || 'Đăng nhập thất bại');
        }
      } else setErrors(newErrors);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>{mode === 'register' ? 'Đăng ký' : 'Đăng nhập'}</h1>
      <div className="social-container">
        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
      </div>
      <span>{mode === 'register' ? 'hoặc sử dụng email để đăng ký' : 'hoặc sử dụng tài khoản của bạn'}</span>
      {mode === 'register' && (
        <Input
          id="register-name"
          type="text"
          name="name"
          placeholder="Họ tên"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
      )}
      <Input
        id={mode === 'register' ? 'register-email' : 'login-email'}
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      <Input
        id={mode === 'register' ? 'register-password' : 'login-password'}
        type="password"
        name="password"
        placeholder="Mật khẩu"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />
      {mode === 'register' && (
        <Input
          id="register-confirm-password"
          type="password"
          name="password_confirmation"
          placeholder="Xác nhận mật khẩu"
          value={formData.password_confirmation}
          onChange={handleChange}
          error={errors.password_confirmation}
        />
      )}
      {mode === 'login' && <a href="#" style={{margin: '10px 0'}}>Quên mật khẩu?</a>}
      {errorMsg && <div style={{ color: 'red', margin: '0.5rem 0' }}>{errorMsg}</div>}
      <Button type="submit" variant="primary" size="large">
        {mode === 'register' ? 'Đăng ký' : 'Đăng nhập'}
      </Button>
    </form>
  );
};

export default AuthForm; 