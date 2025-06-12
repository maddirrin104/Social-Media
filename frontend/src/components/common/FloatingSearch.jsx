import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import '../../styles/components/FloatingSearch.css';

const FloatingSearch = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef(null);

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search-result?q=${encodeURIComponent(searchTerm.trim())}`);
      setIsExpanded(false);
    }
  };

  return (
    <div 
      ref={searchRef}
      className={`floating-search ${isExpanded ? 'expanded' : ''}`}
    >
      <div className="search-icon" onClick={() => setIsExpanded(true)}>
        <i className="fas fa-search"></i>
      </div>
      <form className="search-form" onSubmit={handleSearch}>
        <Input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoFocus={isExpanded}
        />
      </form>
    </div>
  );
};

export default FloatingSearch; 