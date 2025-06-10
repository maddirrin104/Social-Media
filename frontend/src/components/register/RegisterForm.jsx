import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import '../../styles/components/RegisterForm.css';

const RegisterForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (!formData.name) {
      newErrors.name = 'Vui lòng nhập họ tên';
    }
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email';
    }
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp';
    }

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Đăng ký</h1>
        <div className="form-group">
          <Input
            type="text"
            name="name"
            label="Họ tên"
            placeholder="Nhập họ tên của bạn"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
        </div>
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
        <div className="form-group">
          <Input
            type="password"
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu của bạn"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
        </div>
        <Button type="submit" variant="primary" size="large">
          Đăng ký
        </Button>
        <p className="login-link">
          Đã có tài khoản?{' '}
          <a href="/login">Đăng nhập ngay</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm; 