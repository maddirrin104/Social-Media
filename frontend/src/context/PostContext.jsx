// Quản lý danh sách bài viết

import { createContext, useContext } from 'react';
import { usePostActions } from '../hooks/usePostActions';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const postActions = usePostActions();

  return (
    <PostContext.Provider value={postActions}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
};

