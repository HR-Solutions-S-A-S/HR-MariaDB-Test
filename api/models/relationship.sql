CREATE TABLE relationships (
  id INT AUTO_INCREMENT PRIMARY KEY,
  followerUserId INT NOT NULL,
  followedUserId INT NOT NULL,
  FOREIGN KEY (followerUserId) REFERENCES users(id),
  FOREIGN KEY (followedUserId) REFERENCES users(id)
);
