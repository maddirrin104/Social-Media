import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import './ProfilePopup.css';

const ProfilePopup = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleProfileClick = () => {
    if (user) {
      navigate(`/profile/${user.id}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-popup-container">
      <div className="profile-buttons-group">
        <button className="profile-button" onClick={handleProfileClick}>
          <div className="icon">
            <FaUser />
          </div>
          <span className='profile-popup-text'>
            <span className="text">Trang cá nhân</span>
            <span className="logout-button" onClick={handleLogout}>
                <FaSignOutAlt />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePopup; 