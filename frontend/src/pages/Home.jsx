import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePost } from "../context/PostContext";
import Post from "../components/post/Post";
import CreatePost from "../components/post/CreatePost";
import "../styles/Home.css";
import "../index.css";

const Home = () => {
  const { user } = useAuth();
  const { allPosts, handleLike, handleComment, handleDelete, handleCreatePost } = usePost();
  const navigate = useNavigate();
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="create-post-section">
          <CreatePost onCreatePost={handleCreatePost} />
        </div>
        <div className="posts-section">
          {allPosts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
