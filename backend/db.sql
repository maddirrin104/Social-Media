-- USERS TABLE
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    avatar VARCHAR(255),
    bio VARCHAR(255),
    followers INT DEFAULT 0,
    following INT DEFAULT 0,
    posts INT DEFAULT 0,
    role ENUM('admin', 'user') DEFAULT 'user',
    friend_count INT DEFAULT 0,
    hometown VARCHAR(100),
    instagram VARCHAR(100),
    tiktok VARCHAR(100)
);

-- POSTS TABLE
CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    content TEXT,
    image VARCHAR(255),
    likes INT DEFAULT 0,
    comments INT DEFAULT 0,
    created_at BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- POST LIKES TABLE (nhiều user like 1 post)
CREATE TABLE post_likes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- POST COMMENTS TABLE
CREATE TABLE post_comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT,
    created_at BIGINT DEFAULT (UNIX_TIMESTAMP() * 1000),
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- NOTIFICATIONS TABLE
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    type ENUM('like', 'comment', 'friend_request') NOT NULL,
    title VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
);

-- FRIENDSHIPS TABLE
CREATE TABLE friendships (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user1_id INT NOT NULL,
    user2_id INT NOT NULL,
    status ENUM('pending', 'accepted', 'none') DEFAULT 'none',
    created_at BIGINT NOT NULL,
    FOREIGN KEY (user1_id) REFERENCES users(id),
    FOREIGN KEY (user2_id) REFERENCES users(id)
);

CREATE TABLE messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at BIGINT NOT NULL, -- lưu timestamp (ms) từ getTime()

    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id)
);

-- INDEXES for fast lookup (optional but recommended)
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_post_user ON posts(user_id);
CREATE INDEX idx_like_post ON post_likes(post_id);
CREATE INDEX idx_like_user ON post_likes(user_id);
CREATE INDEX idx_comment_post ON post_comments(post_id);
CREATE INDEX idx_comment_user ON post_comments(user_id);
CREATE INDEX idx_notif_receiver ON notifications(receiver_id);
CREATE INDEX idx_friendship_pair ON friendships(user1_id, user2_id);
