import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostCard from '../components/post/PostCard';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import SearchItem from '../components/search/SearchItem';
import { postAPI } from '../utils/api';
import { getAllUsersAPI } from '../utils/api';
import '../styles/pages/SearchResult.css';

const SearchResult = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      console.log('Fetching posts...');
      setLoading(true);
      setError(null);
      const postList = await postAPI.getPosts();
      console.log('Posts response:', postList);
      setPosts(Array.isArray(postList) ? postList : []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Lỗi tải danh sách bài viết!');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      console.log('Fetching users...');
      setLoading(true);
      setError(null);
      let data = await getAllUsersAPI();
      console.log('Users response:', data);
      if (data && data.data) data = data.data;
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Lỗi tải danh sách người dùng!');
    } finally {
      setLoading(false);
    }
  };

  // Hàm tìm kiếm trong posts
  const searchPosts = (posts, query) => {
    if (!query) return posts;
    const searchTerm = query.toLowerCase();
    return posts.filter(post => 
      post.content.toLowerCase().includes(searchTerm)
    );
  };

  // Hàm tìm kiếm trong users
  const searchUsers = (users, query) => {
    if (!query) return users;
    const searchTerm = query.toLowerCase();
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm)
    );
  };

  // Effect để fetch data
  useEffect(() => {
    console.log('Is authenticated:', isAuthenticated);
    console.log('User:', user);
    console.log('Active tab:', activeTab);
    
    if (!isAuthenticated) {
      setLoading(false);
      setError('Vui lòng đăng nhập để xem kết quả tìm kiếm');
      return;
    }

    if (activeTab === 'posts') {
      fetchPosts();
    } else {
      fetchUsers();
    }
  }, [isAuthenticated, user, activeTab]);

  // Effect để lọc kết quả khi query hoặc data thay đổi
  useEffect(() => {
    setFilteredPosts(searchPosts(posts, query));
    setFilteredUsers(searchUsers(users, query));
  }, [query, posts, users]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (loading) return <div className="search-loading">Đang tải...</div>;
  if (error) return <div className="search-error">{error}</div>;

  return (
    <div className="search-result-page">
      <div className="search-result-container">
        <div className="search-header">
          <h1>Kết quả tìm kiếm: {query}</h1>
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
        <div className="search-results">
          {activeTab === 'posts' ? (
            filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="no-results">
                <i className="fas fa-search"></i>
                <p>Không tìm thấy bài viết nào</p>
              </div>
            )
          ) : (
            filteredUsers.length > 0 ? (
              <div className="user-search-list">
                {filteredUsers.map(user => (
                  <SearchItem key={user.id} user={user} />
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
      </div>
    </div>
  );
};

export default SearchResult; 