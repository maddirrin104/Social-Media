import React from 'react';
import '../../styles/components/Input.css';

const Input = ({
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  label,
  error,
  className = ''
}) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label htmlFor={id || name}>{label}</label>}
      <input
        type={type}
        id={id || name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={error ? 'error' : ''}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input; 