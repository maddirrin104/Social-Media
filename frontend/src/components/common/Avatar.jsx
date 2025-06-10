import React from 'react';
import '../../styles/components/Avatar.css';

const Avatar = ({ 
  src, 
  alt, 
  size = 'medium',
  className = '',
  onClick
}) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div 
      className={`avatar avatar-${size} ${className}`}
      onClick={onClick}
    >
      {src ? (
        <img src={src} alt={alt} />
      ) : (
        <div className="avatar-fallback">
          {getInitials(alt || 'User')}
        </div>
      )}
    </div>
  );
};

export default Avatar; 