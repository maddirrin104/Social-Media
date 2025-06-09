import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/pages/SearchResult.css';

const SearchResult = () => {
  const location = useLocation();
  // TODO: Lấy query params từ URL và thực hiện tìm kiếm
  // const searchParams = new URLSearchParams(location.search);
  // const query = searchParams.get('q');

  return (
    <div className="search-result-page">
      <div className="search-result-container">
        <h1>Kết quả tìm kiếm</h1>
        
        {/* TODO: Thêm bộ lọc kết quả */}
        <div className="search-filters">
          {/* Filter components will be added here */}
        </div>

        {/* TODO: Thêm danh sách kết quả tìm kiếm */}
        <div className="search-results">
          {/* Search results will be displayed here */}
        </div>

        {/* TODO: Thêm phân trang */}
        <div className="pagination">
          {/* Pagination will be added here */}
        </div>
      </div>
    </div>
  );
};

export default SearchResult; 