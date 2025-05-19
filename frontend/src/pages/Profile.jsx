import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { posts } from "../data/posts";
import { users } from "../data/users";
import { AuthContext } from "../context/AuthContext";
import { usePost } from "../context/PostContext";
import { useFriend } from "../context/FriendContext";
import { FaEdit } from 'react-icons/fa';
import Post from "../components/post/Post";
import FriendButton from "../components/social/FriendButton";
import FriendsList from "../components/social/FriendsList";
import ErrorBoundary from "../components/common/ErrorBoundary";
import ConfirmModal from "../components/common/ConfirmModal";
import CreatePost from "../components/post/CreatePost";
import "./Profile.css";

const ProfileContent = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const { allPosts, handleLike, handleComment, handleDelete, handleCreatePost } = usePost();
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();
  const numericUserId = parseInt(userId);
  const { unfriend, friendships } = useFriend();
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState("");
  const [friendshipStatus, setFriendshipStatus] = useState(null);
  const [showUnfriendModal, setShowUnfriendModal] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const filteredPosts = allPosts.filter(post => post.userId === numericUserId);
    setUserPosts(filteredPosts);
  }, [numericUserId, allPosts]);

  useEffect(() => {
    // Kiểm tra trạng thái kết bạn dựa trên friendships
    if (user && numericUserId) {
      const isFriend = friendships.some(
        f => (f.user1Id === user.id && f.user2Id === numericUserId && f.status === 'accepted') ||
             (f.user1Id === numericUserId && f.user2Id === user.id && f.status === 'accepted')
      );
      setFriendshipStatus(isFriend);
    }
  }, [user, numericUserId, friendships]);

  const handleEditProfile = () => {
    setEditedBio(user?.bio || "");
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    if (!user) return;
    
    const userIndex = users.findIndex((u) => u.id === numericUserId);
    if (userIndex !== -1) {
      users[userIndex].bio = editedBio;
      setUser({...user, bio: editedBio});
    }
    setIsEditing(false);
  };

  const handleUnfriend = () => {
    setShowUnfriendModal(true);
  };

  const confirmUnfriend = () => {
    if (user && numericUserId) {
      // Tìm friendship ID để unfriend
      const friendship = friendships.find(
        f => (f.user1Id === user.id && f.user2Id === numericUserId) ||
             (f.user1Id === numericUserId && f.user2Id === user.id)
      );
      
      if (friendship) {
        unfriend(friendship.id);
        setFriendshipStatus(false);
      } else {
        console.error('Friendship not found');
      }
    }
    setShowUnfriendModal(false);
  };

  if (!user) {
    return null;
  }

  const isOwnProfile = user?.id === numericUserId;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.avatar} alt="avatar" className="profile-avatar" />
        <h2>{user.name || "Người dùng ẩn danh"}</h2>
        <p>Bio: {user.bio || "Chưa cập nhật tiểu sử."}</p>
        {!isOwnProfile && (
          <div className="social-actions">
            <div className="friendship-status">
              {friendshipStatus ? "Các bạn là bạn bè" : "Các bạn chưa là bạn bè"}
            </div>
            <FriendButton 
              currentUserId={user.id} 
              targetUserId={numericUserId}
              onUnfriend={handleUnfriend}
            />
          </div>
        )}
        {isOwnProfile && (
          <Link to="/edit-profile" className="edit-profile-btn">
            <FaEdit />
            Chỉnh sửa thông tin
          </Link>
        )}
      </div>

      <ConfirmModal
        isOpen={showUnfriendModal}
        onCancel={() => setShowUnfriendModal(false)}
        onConfirm={confirmUnfriend}
        title="Xác nhận huỷ kết bạn"
        message="Bạn có chắc chắn muốn huỷ kết bạn với người này không?"
      />

      <FriendsList userId={numericUserId} />

      <div className="profile-content">
        <div className="create-post-section">
          {user.id === numericUserId && (
            <CreatePost onCreatePost={handleCreatePost} />
          )}
        </div>
        <div className="posts-section">
          <h3 className="posts-title">Bài viết của {user.name}</h3>
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onLike={handleLike}
                onComment={handleComment}
                onDelete={isOwnProfile ? handleDelete : undefined}
              />
            ))
          ) : (
            <p>Chưa có bài viết nào.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <ErrorBoundary>
      <ProfileContent />
    </ErrorBoundary>
  );
};

export default Profile;
