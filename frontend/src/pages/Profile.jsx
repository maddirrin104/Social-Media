import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from '../components/profile/ProfileCard';
import PostCard from '../components/post/PostCard';
import PostCreator from '../components/post/PostCreator';
import '../styles/pages/Profile.css';
import { users } from '../data/users';
import { posts as allPosts } from '../data/posts';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const foundUser = users.find(u => u.id === parseInt(userId));
    if (!foundUser) {
      setError('Không tìm thấy người dùng!');
      return;
    }
    setProfile(foundUser);
    // Lấy các bài post của user này
    const userPosts = allPosts.filter(post => post.userId === foundUser.id).map(post => ({
      ...post,
      author: foundUser
    }));
    setPosts(userPosts);
  }, [userId]);

  if (error) return <div style={{color:'red',textAlign:'center',marginTop:'2rem'}}>{error}</div>;
  if (!profile) return <div>Loading...</div>;

  const isOwnProfile = currentUser && currentUser.id === profile.id;

  return (
    <div className="profile-page">
      <div className="profile-content">
        <div className="profile-sidebar">
          <ProfileCard profile={profile} />
        </div>
        <div className={`profile-posts${!isOwnProfile ? ' not-own-profile' : ''}`}>
          {isOwnProfile && <PostCreator />}
          <div className="profile-posts-header">
            <h2>Bài viết</h2>
          </div>
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
