CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  `desc` VARCHAR(255) NOT NULL,
  img VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  userId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);
