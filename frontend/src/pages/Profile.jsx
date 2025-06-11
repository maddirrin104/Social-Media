  import React from 'react';
  import { useParams } from 'react-router-dom';
  import ProfileCard from '../components/profile/ProfileCard';
  import PostCard from '../components/post/PostCard';
  import PostCreator from '../components/post/PostCreator';
  import '../styles/pages/Profile.css';
  import { useAuth } from '../context/AuthContext';
  import { getUserByIdAPI, getMeAPI, postAPI } from '../utils/api';

  const Profile = () => {
    const { userId } = useParams();
    const { user: currentUser } = useAuth();
    const [profile, setProfile] = React.useState(null);
    const [posts, setPosts] = React.useState([]);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      const fetchData = async () => {
        setError('');
        setLoading(true); 
        try {
          // Lấy thông tin user
          let profileData;
          if (!userId || String(currentUser.id) === String(userId)) {
            profileData = await getMeAPI();
          } else {
            profileData = await getUserByIdAPI(userId);
          }
          setProfile(profileData.data);

          // Lấy post của user
          const userPosts = await postAPI.getPostByUser(userId || currentUser.id);
          setPosts(userPosts.data);
        } catch {
          setError('Không tìm thấy người dùng!');
          setProfile(null);
          setPosts([]);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [userId, currentUser.id]);

    if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>{error}</div>;
    if (loading || !profile) return <div>Loading...</div>;

    const isOwnProfile = currentUser && currentUser.id === profile.id;

    // Hàm reload post sau khi tạo bài mới
    const handlePostCreated = async () => {
      const userPosts = await postAPI.getPostByUser(profile.id);
      setPosts(userPosts.data);
    };

    // Hàm xoá bài viết khỏi state
    const handlePostDeleted = (postId) => {
      setPosts(prev => prev.filter(post => post.id !== postId));
    };

    return (
      <div className="profile-page">
        <div className="profile-content">
          <div className="profile-sidebar">
            <ProfileCard profile={profile} onProfileUpdated={setProfile} />
          </div>
          <div className={`profile-posts${!isOwnProfile ? ' not-own-profile' : ''}`}>
            {isOwnProfile && <PostCreator onPostCreated={handlePostCreated} />}
            <div className="profile-posts-header">
              <h2>Bài viết</h2>
            </div>
            {posts.map(post => (
              <PostCard key={post.id} post={post} onDeleted={handlePostDeleted} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default Profile;
