import React, { useState } from 'react';
import AuthForm from '../components/auth/AuthForm';
import Button from '../components/common/Button';
import '../styles/pages/AuthPage.css';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSwitch = (signUp) => setIsSignUp(signUp);

  return (
    <div className={`auth-container${isSignUp ? ' right-panel-active' : ''}`} id="container">
      <div className="form-container sign-up-container">
        <AuthForm mode="register" onSwitch={() => handleSwitch(false)} />
      </div>
      <div className="form-container sign-in-container">
        <AuthForm mode="login" onSwitch={() => handleSwitch(true)} />
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <img src='../../public/assets/LLlogoWhite-01.png' alt="Logo" className="auth-logo" />
            <h1>Đã có tài khoản?</h1>
            <p>Để kết nối với chúng tôi, vui lòng đăng nhập bằng thông tin cá nhân của bạn</p>
            <Button className="ghost" id="signIn" onClick={() => handleSwitch(false)}>
              Đăng nhập
            </Button>
          </div>
          <div className="overlay-panel overlay-right">
            <img src='../../public/assets/LLlogoWhite-01.png' alt="Logo" className="auth-logo" />
            <h1>Chưa có tài khoản?</h1>
            <p>Nhập thông tin cá nhân để bắt đầu hành trình cùng chúng tôi</p>
            <Button className="ghost" id="signUp" onClick={() => handleSwitch(true)}>
              Đăng ký
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 