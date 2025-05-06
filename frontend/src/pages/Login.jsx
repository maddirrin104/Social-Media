import { useState, useContext } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ConfirmModal from "../components/common/ConfirmModal";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const navigate = useNavigate();

  // Nếu đã đăng nhập, chuyển hướng về trang chủ
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/");
    } else {
      setError("Email hoặc mật khẩu không chính xác");
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-form-section">
          <div className="login-header">
            <h2 className="login-title">Đăng nhập</h2>
            <p className="login-subtitle">Chào mừng bạn quay trở lại!</p>
          </div>
          <form onSubmit={handleLogin}>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="forgot-password">
              <button 
                type="button" 
                className="forgot-password-button"
                onClick={() => setShowForgotPasswordModal(true)}
              >
                Quên mật khẩu?
              </button>
            </div>
            <button type="submit" className="login-button">
              Đăng nhập
            </button>
          </form>
          <div className="signup-link">
            Chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
          </div>
        </div>
        <div className="login-art-section">
          <div className="art-content">
            <div className="art-circle">
              <img src="assets/art/social-connect.svg" alt="Social Connection" className="art-image" />
            </div>
            <h3>Kết nối - Chia sẻ - Giao lưu</h3>
            <p>Nơi bạn có thể kết nối với bạn bè và chia sẻ những khoảnh khắc đáng nhớ</p>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showForgotPasswordModal}
        message="Chức năng này chúng tôi vẫn chưa phát triển, quên thì mình chịu khó tạo tài khoản mới nha. Xin cảm ơn!"
        onConfirm={() => setShowForgotPasswordModal(false)}
        onCancel={() => setShowForgotPasswordModal(false)}
      />
    </div>
  );
};

// CSS đơn giản
const styles = {
  container: { textAlign: "center", marginTop: "50px" },
  form: { display: "flex", flexDirection: "column", width: "300px", margin: "auto" },
  input: { marginBottom: "10px", padding: "8px", fontSize: "16px" },
  button: { background: "#007bff", color: "white", padding: "10px", border: "none", cursor: "pointer" },
};

export default Login;
