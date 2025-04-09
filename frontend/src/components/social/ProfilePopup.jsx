import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import './ProfilePopup.css';

const ProfilePopup = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleProfileClick = () => {
    if (user) {
      navigate(`/profile/${user.id}`);
    }
  };

  return (
    <div className="profile-popup-container">
      <button className="profile-button" onClick={handleProfileClick}>
        <div className="icon">
          <FaUser />
        </div>
        <span className='profile-popup-text'>
          <span className="text">Trang cá nhân</span>
        </span>
      </button>
    </div>
  );
};

export default ProfilePopup; 