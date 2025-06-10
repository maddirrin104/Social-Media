import React from 'react';
import PostCreator from '../components/post/PostCreator';
import PostCard from '../components/post/PostCard';
import { useAuth } from '../context/AuthContext';
import '../styles/pages/Home.css';
import { posts as postData } from '../data/posts';
import { users } from '../data/users';

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    // Map userId sang author (name, avatar)
    const mappedPosts = postData.map(post => {
      const author = users.find(u => u.id === post.userId);
      return {
        ...post,
        author: author ? { id: author.id, name: author.name, avatar: author.avatar } : {},
      };
    });
    setPosts(mappedPosts);
  }, []);

  return (
    <div className="home-page">
      <div className="posts-container">
        <PostCreator />
        <div className="posts-list">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; 