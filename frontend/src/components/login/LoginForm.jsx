import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import Input from '../common/Input';
import '../../styles/components/LoginForm.css';
import {loginAPI, register} from '../../utils/api'

const LoginForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email';
    }
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    }

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Đăng nhập</h1>
        <div className="form-group">
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="Nhập email của bạn"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>
        <div className="form-group">
          <Input
            type="password"
            name="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu của bạn"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
        </div>
        <Button type="submit" variant="primary" size="large">
          Đăng nhập
        </Button>
        <p className="register-link">
          Chưa có tài khoản?{' '}
          <a href="/register">Đăng ký ngay</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm; 