import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/post/PostCard';
import ProfileCard from '../components/profile/ProfileCard';
import Button from '../components/common/Button';
import '../styles/pages/SearchResult.css';

const SearchResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' or 'users'
  const [searchResults, setSearchResults] = useState({
    posts: [],
    users: []
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    const page = parseInt(searchParams.get('page')) || 1;
    const type = searchParams.get('type') || 'posts';

    if (query) {
      setCurrentPage(page);
      setActiveTab(type);
      fetchSearchResults(query, type, page);
    }
  }, [location.search]);

  const fetchSearchResults = async (query, type, page) => {
    setLoading(true);
    try {
      // TODO: Thay thế bằng API thật
      // const response = await searchAPI.search(query, type, page);
      // setSearchResults(prev => ({
      //   ...prev,
      //   [type]: response.data
      // }));
      // setTotalPages(response.totalPages);

      // Mock data tạm thời
      setTimeout(() => {
        setSearchResults({
          posts: [
            {
              id: 1,
              content: 'Bài viết tìm kiếm 1',
              user: { id: 1, username: 'user1', avatar: 'https://via.placeholder.com/40' },
              createdAt: new Date().toISOString(),
              likes: 10,
              comments: 5
            }
          ],
          users: [
            {
              id: 1,
              username: 'user1',
              avatar: 'https://via.placeholder.com/40',
              bio: 'User bio'
            }
          ]
        });
        setTotalPages(1);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', newPage);
    navigate(`/search-result?${searchParams.toString()}`);
  };

  const handleTabChange = (tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('type', tab);
    searchParams.set('page', '1');
    navigate(`/search-result?${searchParams.toString()}`);
  };

  return (
    <div className="search-result-page">
      <div className="search-result-container">
        <div className="search-header">
          <h1>Kết quả tìm kiếm</h1>
          <div className="search-tabs">
            <Button
              variant={activeTab === 'posts' ? 'primary' : 'secondary'}
              onClick={() => handleTabChange('posts')}
            >
              Bài viết
            </Button>
            <Button
              variant={activeTab === 'users' ? 'primary' : 'secondary'}
              onClick={() => handleTabChange('users')}
            >
              Người dùng
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="search-loading">
            <i className="fas fa-spinner fa-spin"></i>
            <span>Đang tìm kiếm...</span>
          </div>
        ) : (
          <>
            <div className="search-results">
              {activeTab === 'posts' ? (
                searchResults.posts.length > 0 ? (
                  searchResults.posts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <div className="no-results">
                    <i className="fas fa-search"></i>
                    <p>Không tìm thấy bài viết nào</p>
                  </div>
                )
              ) : (
                searchResults.users.length > 0 ? (
                  <div className="users-grid">
                    {searchResults.users.map(user => (
                      <ProfileCard key={user.id} user={user} />
                    ))}
                  </div>
                ) : (
                  <div className="no-results">
                    <i className="fas fa-search"></i>
                    <p>Không tìm thấy người dùng nào</p>
                  </div>
                )
              )}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <Button
                  variant="secondary"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left"></i>
                </Button>
                <span className="page-info">
                  Trang {currentPage} / {totalPages}
                </span>
                <Button
                  variant="secondary"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <i className="fas fa-chevron-right"></i>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResult; 