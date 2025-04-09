import { useParams, Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { posts } from "../data/posts";
import { users } from "../data/users";
import { AuthContext } from "../context/AuthContext";
import { usePostActions } from "../hooks/usePostActions";
import { useFriend } from "../context/FriendContext";
import { FaEdit } from 'react-icons/fa';
import Post from "../components/post/Post";
import CreatePost from "../components/post/CreatePost";
import FriendButton from "../components/social/FriendButton";
import FriendsList from "../components/social/FriendsList";
import ErrorBoundary from "../components/common/ErrorBoundary";
import ConfirmModal from "../components/common/ConfirmModal";
import "./Profile.css";

const ProfileContent = () => {
  const { userId } = useParams();
  const numericUserId = Number(userId);
  const { user: currentUser } = useContext(AuthContext);
  const { unfriend, friendships } = useFriend();
  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState("");
  const { allPosts, handleLike, handleComment, handleDelete, handleCreatePost } = usePostActions();
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [friendshipStatus, setFriendshipStatus] = useState(null);
  const [showUnfriendModal, setShowUnfriendModal] = useState(false);

  useEffect(() => {
    // Tìm thông tin người dùng từ danh sách users
    const foundUser = users.find((u) => u.id === numericUserId);
    setUser(foundUser);

    // Kiểm tra trạng thái kết bạn dựa trên friendships
    if (currentUser && foundUser) {
      const isFriend = friendships.some(
        f => (f.user1Id === currentUser.id && f.user2Id === numericUserId && f.status === 'accepted') ||
             (f.user1Id === numericUserId && f.user2Id === currentUser.id && f.status === 'accepted')
      );
      setFriendshipStatus(isFriend);
    }
  }, [numericUserId, currentUser, friendships]);

  useEffect(() => {
    if (numericUserId) {
      setUserPosts(allPosts.filter((post) => post.userId === numericUserId));
    }
  }, [numericUserId, allPosts]);

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
    if (currentUser && user) {
      // Tìm friendship ID để unfriend
      const friendship = friendships.find(
        f => (f.user1Id === currentUser.id && f.user2Id === numericUserId) ||
             (f.user1Id === numericUserId && f.user2Id === currentUser.id)
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

  if (!currentUser) {
    return <div className="profile-message">Vui lòng <Link to="/login" >đăng nhập</Link> để xem trang này</div>;
  }

  if (!user) {
    return <div className="profile-message">Không tìm thấy người dùng</div>;
  }

  const isOwnProfile = currentUser?.id === numericUserId;

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
              currentUserId={currentUser.id} 
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

      <div className="profile-posts">
        {isOwnProfile && (
          <CreatePost onCreatePost={handleCreatePost} />
        )}
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
