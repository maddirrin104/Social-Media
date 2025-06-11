import React from 'react';
import PostCreator from '../components/post/PostCreator';
import PostCard from '../components/post/PostCard';
import { useAuth } from '../context/AuthContext';
import '../styles/pages/Home.css';
import { postAPI } from '../utils/api';

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = React.useState([]);

  const fetchPosts = async () => {
    const postList = await postAPI.getPosts();
    setPosts(postList);
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  // Hàm reload sau khi tạo bài viết mới
  const handlePostCreated = () => {
    fetchPosts();
  };

  // Hàm xử lý xoá bài viết khỏi danh sách (không cần fetch lại hết nếu muốn tối ưu)
  const handlePostDeleted = (postId) => {
    setPosts((prev) => prev.filter((item) => item.id !== postId));
  };

  return (
    <div className="home-page">
      <div className="posts-container">
        <PostCreator onPostCreated={handlePostCreated} />
        <div className="posts-list">
          {posts.map(post => (
            <PostCard key={post.id} post={post} onDeleted={handlePostDeleted} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;