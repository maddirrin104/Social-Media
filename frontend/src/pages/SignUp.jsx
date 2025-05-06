import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Mật khẩu không khớp");
    }

    try {
      await signup(formData.email, formData.password, formData.name);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="signup-form-section">
          <div className="signup-header">
            <h2 className="signup-title">Đăng ký</h2>
            <p className="signup-subtitle">Tạo tài khoản để kết nối với bạn bè!</p>
          </div>
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                placeholder="Họ và tên"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="new-password"
                placeholder="Xác nhận mật khẩu"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="signup-button">
              Đăng ký
            </button>
          </form>
          <div className="login-link">
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </div>
        </div>
        <div className="signup-art-section">
          <div className="art-content">
            <div className="art-circle">
              <img src="assets/art/social-connect.svg" alt="Social Connection" className="art-image" />
            </div>
            <h3>Tham gia cộng đồng</h3>
            <p>Khám phá và chia sẻ khoảnh khắc tuyệt vời cùng với mọi người</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 