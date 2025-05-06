import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { usePostActions } from "../hooks/usePostActions";
import Post from "../components/post/Post";
import "./Home.css";
import "../index.css";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { allPosts, handleLike, handleComment, handleDelete, handleCreatePost } = usePostActions();

  return (
    <div className="container">
      <h1 className="home-title">TRANG CHỦ</h1>
      <div className="posts">
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
  );
};

export default Home;
