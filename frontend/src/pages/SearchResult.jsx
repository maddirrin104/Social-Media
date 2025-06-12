import React, { useState, useEffect } from 'react';
import PostCard from '../components/post/PostCard';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import SearchItem from '../components/search/SearchItem';
import { postAPI } from '../utils/api';
import { getAllUsersAPI } from '../utils/api';
import '../styles/pages/SearchResult.css';

const SearchResult = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (loading) return <div className="search-loading">Đang tải...</div>;
  if (error) return <div className="search-error">{error}</div>;

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
        <div className="search-results">
          {activeTab === 'posts' ? (
            posts.length > 0 ? (
              posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="no-results">
                <i className="fas fa-search"></i>
                <p>Không tìm thấy bài viết nào</p>
              </div>
            )
          ) : (
            users.length > 0 ? (
              <div className="user-search-list">
                {users.map(user => (
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