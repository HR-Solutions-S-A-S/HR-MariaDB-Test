
-- Crear la base de datos (si no existe) y seleccionarla
CREATE DATABASE IF NOT EXISTS social
  DEFAULT CHARACTER SET utf8mb4 
  COLLATE utf8mb4_general_ci;

USE social;

DELIMITER $$
CREATE DATABASE IF NOT EXISTS social
  DEFAULT CHARACTER SET utf8mb4 
  COLLATE utf8mb4_general_ci;
USE social$$
DELIMITER ;

-- ========================================================
-- Tabla: usertable
-- ========================================================
DROP TABLE IF EXISTS usertable;
CREATE TABLE usertable (
  id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(200) NOT NULL,
  user_fullname VARCHAR(200) NOT NULL,
  user_email VARCHAR(200) NOT NULL,
  user_dob DATETIME DEFAULT NULL,
  user_phone VARCHAR(11) DEFAULT NULL,
  user_profile_img VARCHAR(200) DEFAULT NULL,
  user_cover_img VARCHAR(200) DEFAULT NULL,
  user_password VARCHAR(200) NOT NULL,
  user_city VARCHAR(200) DEFAULT NULL,
  user_website VARCHAR(200) DEFAULT NULL,
  user_occ VARCHAR(50) NOT NULL,
  user_if_student_id INT DEFAULT NULL,
  user_if_faculty_id INT DEFAULT NULL,
  user_if_staff_id INT DEFAULT NULL,
  user_cal VARCHAR(200) DEFAULT NULL,
  twitter VARCHAR(100) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY id_UNIQUE (id),
  UNIQUE KEY user_email_UNIQUE (user_email),
  UNIQUE KEY user_name_UNIQUE (user_name),
  UNIQUE KEY user_if_student_id_UNIQUE (user_if_student_id),
  UNIQUE KEY user_if_faculty_id_UNIQUE (user_if_faculty_id),
  UNIQUE KEY user_if_staff_id_UNIQUE (user_if_staff_id)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================================================
-- Tabla: poststable
-- ========================================================
-- Se crea antes de commentstable, ya que éste la referencia
DROP TABLE IF EXISTS poststable;
CREATE TABLE poststable (
  post_id INT NOT NULL AUTO_INCREMENT,
  post_desc VARCHAR(500) NOT NULL,
  img VARCHAR(200) DEFAULT NULL,
  user_id INT DEFAULT NULL,
  post_creation_time DATETIME DEFAULT NULL,
  user_fullname VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (post_id),
  UNIQUE KEY post_id_UNIQUE (post_id),
  KEY user_id_idx (user_id),
  CONSTRAINT fk_poststable_user FOREIGN KEY (user_id) REFERENCES usertable (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=126 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================================================
-- Tabla: announcementtable
-- ========================================================
DROP TABLE IF EXISTS announcementtable;
CREATE TABLE announcementtable (
  announcement_id INT NOT NULL AUTO_INCREMENT,
  announcement_content VARCHAR(500) NOT NULL,
  user_id INT NOT NULL,
  announcement_creation_time DATETIME NOT NULL,
  announcement_title VARCHAR(45) NOT NULL,
  PRIMARY KEY (announcement_id),
  UNIQUE KEY announcement_id_UNIQUE (announcement_id),
  KEY user_id_idx (user_id),
  CONSTRAINT fk_announcementtable_user FOREIGN KEY (user_id) REFERENCES usertable (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================================================
-- Tabla: articletable
-- ========================================================
DROP TABLE IF EXISTS articletable;
CREATE TABLE articletable (
  article_id INT NOT NULL AUTO_INCREMENT,
  article_content VARCHAR(500) NOT NULL,
  user_id INT NOT NULL,
  article_creation_time DATETIME NOT NULL,
  article_title VARCHAR(45) NOT NULL,
  PRIMARY KEY (article_id),
  UNIQUE KEY article_id_UNIQUE (article_id),
  KEY user_id_idx (user_id),
  CONSTRAINT fk_articletable_user FOREIGN KEY (user_id) REFERENCES usertable (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================================================
-- Tabla: stafftable
-- ========================================================
DROP TABLE IF EXISTS stafftable;
CREATE TABLE stafftable (
  staff_id INT NOT NULL,
  staff_designation VARCHAR(200) NOT NULL,
  PRIMARY KEY (staff_id),
  UNIQUE KEY staff_id_UNIQUE (staff_id),
  CONSTRAINT fk_stafftable_user FOREIGN KEY (staff_id) REFERENCES usertable (user_if_staff_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================================================
-- Tabla: studenttable
-- ========================================================
DROP TABLE IF EXISTS studenttable;
CREATE TABLE studenttable (
  student_id INT NOT NULL,
  student_cgpa VARCHAR(5) DEFAULT NULL,
  student_stat VARCHAR(45) NOT NULL,
  student_work_email VARCHAR(200) DEFAULT NULL,
  student_work_company VARCHAR(200) DEFAULT NULL,
  student_dept VARCHAR(200) DEFAULT NULL,
  student_grad_year VARCHAR(45) DEFAULT NULL,
  PRIMARY KEY (student_id),
  UNIQUE KEY student_id_UNIQUE (student_id),
  CONSTRAINT fk_studenttable_user FOREIGN KEY (student_id) REFERENCES usertable (user_if_student_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================================================
-- Tabla: faculty_table
-- ========================================================
DROP TABLE IF EXISTS faculty_table;
CREATE TABLE faculty_table (
  faculty_id INT NOT NULL,
  faculty_research_interest VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (faculty_id),
  UNIQUE KEY faculty_id_UNIQUE (faculty_id),
  CONSTRAINT fk_facultytable_user FOREIGN KEY (faculty_id) REFERENCES usertable (user_if_faculty_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================================================
-- Tabla: facultydegreetable
-- ========================================================
DROP TABLE IF EXISTS facultydegreetable;
CREATE TABLE facultydegreetable (
  faculty_id INT NOT NULL,
  faculty_degree1 VARCHAR(200) NOT NULL,
  faculty_degree2 VARCHAR(200) DEFAULT NULL,
  faculty_degree3 VARCHAR(200) DEFAULT NULL,
  faculty_degree4 VARCHAR(200) DEFAULT NULL,
  faculty_degree5 VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (faculty_id),
  UNIQUE KEY faculty_id_UNIQUE (faculty_id),
  CONSTRAINT fk_facultydegreetable FOREIGN KEY (faculty_id) REFERENCES faculty_table (faculty_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================================================
-- Tabla: facultydepttable
-- ========================================================
DROP TABLE IF EXISTS facultydepttable;
CREATE TABLE facultydepttable (
  faculty_id INT NOT NULL,
  faculty_dept1 VARCHAR(200) NOT NULL,
  faculty_dept2 VARCHAR(200) DEFAULT NULL,
  faculty_dept3 VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (faculty_id),
  UNIQUE KEY faculty_id_UNIQUE (faculty_id),
  CONSTRAINT fk_facultydepttable FOREIGN KEY (faculty_id) REFERENCES faculty_table (faculty_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================================================
-- Tabla: jobtable
-- ========================================================
DROP TABLE IF EXISTS jobtable;
CREATE TABLE jobtable (
  job_id INT NOT NULL AUTO_INCREMENT,
  job_provider_user_name VARCHAR(200) NOT NULL,
  job_provider_company_name VARCHAR(200) NOT NULL,
  job_provider_company_linkedin VARCHAR(200) NOT NULL,
  job_provider_company_website VARCHAR(200) NOT NULL,
  job_provider_company_email VARCHAR(200) NOT NULL,
  job_description VARCHAR(3000) NOT NULL,
  job_requirement VARCHAR(3000) NOT NULL,
  job_salary VARCHAR(15) NOT NULL,
  job_provider_company_twitter VARCHAR(200) DEFAULT NULL,
  job_provider_company_facebook VARCHAR(200) DEFAULT NULL,
  user_id INT NOT NULL,
  job_creation_time DATE NOT NULL,
  PRIMARY KEY (job_id),
  UNIQUE KEY job_id_UNIQUE (job_id),
  KEY user_id_idx (user_id),
  CONSTRAINT fk_jobtable_user FOREIGN KEY (user_id) REFERENCES usertable (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================================================
-- Tabla: likestable
-- ========================================================
DROP TABLE IF EXISTS likestable;
CREATE TABLE likestable (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY id_UNIQUE (id),
  KEY likeeUserId_idx (user_id),
  KEY likePostId_idx (post_id),
  CONSTRAINT fk_likestable_user FOREIGN KEY (user_id) REFERENCES usertable (id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_likestable_post FOREIGN KEY (post_id) REFERENCES poststable (post_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================================================
-- Tabla: storiestable
-- ========================================================
DROP TABLE IF EXISTS storiestable;
CREATE TABLE storiestable (
  story_id INT NOT NULL AUTO_INCREMENT,
  story_img VARCHAR(200) NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (story_id),
  UNIQUE KEY story_id_UNIQUE (story_id),
  KEY story_userid_idx (user_id),
  CONSTRAINT fk_storiestable_user FOREIGN KEY (user_id) REFERENCES usertable (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================================================
-- Tabla: commentstable
-- ========================================================
DROP TABLE IF EXISTS commentstable;
CREATE TABLE commentstable (
  comment_id INT NOT NULL AUTO_INCREMENT,
  comment_desc VARCHAR(100) NOT NULL,
  comment_creation_time DATETIME DEFAULT NULL,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  PRIMARY KEY (comment_id),
  UNIQUE KEY comment_id_UNIQUE (comment_id),
  KEY post_id_idx (post_id),
  KEY comment_user_id_idx (user_id),
  CONSTRAINT fk_commentstable_user FOREIGN KEY (user_id) REFERENCES usertable (id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_commentstable_post FOREIGN KEY (post_id) REFERENCES poststable (post_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ========================================================
-- Tabla: userrelationshiptable
-- ========================================================
DROP TABLE IF EXISTS userrelationshiptable;
CREATE TABLE userrelationshiptable (
  id INT NOT NULL AUTO_INCREMENT,
  followeruserid INT NOT NULL,
  followeduserid INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY id_UNIQUE (id),
  KEY follower_user_idx (followeruserid),
  KEY followerd_user_idx (followeduserid),
  CONSTRAINT fk_userrelationshiptable_follower FOREIGN KEY (followeruserid) REFERENCES usertable (id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_userrelationshiptable_followed FOREIGN KEY (followeduserid) REFERENCES usertable (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Reactivar las verificaciones de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;
