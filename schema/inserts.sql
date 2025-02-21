
LOCK TABLES `announcementtable` WRITE;
/*!40000 ALTER TABLE `announcementtable` DISABLE KEYS */;
INSERT INTO `announcementtable` VALUES (4,'This will be our announcement section',12,'2023-08-28 02:10:44','Launch for a new social media'),(5,'The project show will be held on tomorrow from 10:00 AM.',2,'2023-08-28 10:01:34','Project Show Summer 2023'),(6,'Tomorrow from 12 PM',14,'2023-08-28 12:29:38','CSE Project Shoqw');
/*!40000 ALTER TABLE `announcementtable` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `articletable` WRITE;
/*!40000 ALTER TABLE `articletable` DISABLE KEYS */;
INSERT INTO `articletable` VALUES (11,'Hello everyone!\nI hope you all are doing well in this new community of ours. If you have any question, then feel free to reach out to me! My appointment schedule is available for you on my profile! ✌️',12,'2023-08-28 02:08:39','Instruction for StudentBook'),(12,'Hello students,\nAll of the class resources have been updated in the LMS. Make sure to check them out. If you have any question, then make sure to let me know.',2,'2023-08-28 10:03:22','Class resources for DBMS');
/*!40000 ALTER TABLE `articletable` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `commentstable` WRITE;
/*!40000 ALTER TABLE `commentstable` DISABLE KEYS */;
INSERT INTO `commentstable` VALUES (13,'Welcome, Jane!','2023-08-28 01:55:06',2,120),(14,'Looks very beautiful, Ma\'am!','2023-08-28 02:14:21',12,122),(15,'Welcome me, too!','2023-08-28 02:23:15',13,123),(16,'Welcome!','2023-08-28 10:10:04',2,123),(17,'I am commenting','2023-08-28 12:27:27',1,125);
/*!40000 ALTER TABLE `commentstable` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `faculty_table` WRITE;
/*!40000 ALTER TABLE `faculty_table` DISABLE KEYS */;
INSERT INTO `faculty_table` VALUES (22,'Bioinformetics'),(23,'Machine Learning');
/*!40000 ALTER TABLE `faculty_table` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `facultydegreetable` WRITE;
/*!40000 ALTER TABLE `facultydegreetable` DISABLE KEYS */;
INSERT INTO `facultydegreetable` VALUES (22,'BSc in CSE',NULL,NULL,NULL,NULL),(23,'MSc in CSE','BSc in CSE',NULL,NULL,NULL);
/*!40000 ALTER TABLE `facultydegreetable` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `facultydepttable` WRITE;
/*!40000 ALTER TABLE `facultydepttable` DISABLE KEYS */;
INSERT INTO `facultydepttable` VALUES (22,'CSE','EEE',NULL),(23,'CSE',NULL,NULL);
/*!40000 ALTER TABLE `facultydepttable` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `jobtable` WRITE;
/*!40000 ALTER TABLE `jobtable` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobtable` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `likestable` WRITE;
/*!40000 ALTER TABLE `likestable` DISABLE KEYS */;
INSERT INTO `likestable` VALUES (21,2,120),(23,1,120),(24,1,122),(25,12,122),(26,14,123),(29,2,123),(30,12,124),(34,14,125);
/*!40000 ALTER TABLE `likestable` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `poststable` WRITE;
/*!40000 ALTER TABLE `poststable` DISABLE KEYS */;
INSERT INTO `poststable` VALUES (120,'Hello, I am Jane Doe, and I am from Canada. Glad to meet you!','1693166075107pexels-kamizzle-15666462.jpg',1,'2023-08-28 01:54:35','Jane Doe'),(122,'Wow!','1693166327596pexels-alina-vilchenko-17439236.jpg',2,'2023-08-28 01:58:47','Israt Jahan Khan'),(123,'Just joined here! Glad to meet you!','',12,'2023-08-28 02:01:51','Anisul Islam'),(124,'Really enjoyed there!','1693195762307pexels-kasuma-1785493.jpg',2,'2023-08-28 10:09:22','Israt Jahan Khan'),(125,'I am creating a  new post','1693203939099pexels-michael-block-3225517.jpg',1,'2023-08-28 12:25:39','Jane Doe');
/*!40000 ALTER TABLE `poststable` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `stafftable` WRITE;
/*!40000 ALTER TABLE `stafftable` DISABLE KEYS */;
INSERT INTO `stafftable` VALUES (23,'Accountant'),(110,'Admin');
/*!40000 ALTER TABLE `stafftable` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `storiestable` WRITE;
/*!40000 ALTER TABLE `storiestable` DISABLE KEYS */;
/*!40000 ALTER TABLE `storiestable` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `studenttable` WRITE;
/*!40000 ALTER TABLE `studenttable` DISABLE KEYS */;
INSERT INTO `studenttable` VALUES (11201111,'2.30','Formal','jane@uiu.ac.bd','N/A','CSE','2025'),(11202178,'3.99','Alumni','mou@uiu.ac.bd','Brain Station 23','EEE','2023');
/*!40000 ALTER TABLE `studenttable` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `userrelationshiptable` WRITE;
/*!40000 ALTER TABLE `userrelationshiptable` DISABLE KEYS */;
INSERT INTO `userrelationshiptable` VALUES (17,1,12),(18,13,12);
/*!40000 ALTER TABLE `userrelationshiptable` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `usertable` WRITE;
/*!40000 ALTER TABLE `usertable` DISABLE KEYS */;
INSERT INTO `usertable` VALUES (1,'Jane','Jane Doe','jane23@gmail.com',NULL,NULL,'1693163601886pexels-daka-17813826.jpg','1693163601872pexels-lina-kivaka-16550526.jpg','$2a$10$ZU0crC7xwDiJo0LYSH5IbuMDG0u/7sbRV18lhUDPQAllBkr5goEPS','Canada','janedoe.com','Student',11201111,NULL,NULL,'https://calendly.com/',NULL),(2,'Israt','Israt Jahan Khan','isratjahankhan@gmail.com',NULL,NULL,'16931956846021693166237794329901150_5732024393591687_3590245626934702253_n.jpg','1693195684537pexels-michael-block-3225517.jpg','$2a$10$AIUdFUpH3ZXmDRbzRacLc.BAH3rbB.Daoe/SQ99uYYaJBXJ/NjLmq','Bangladesh','https://github.com/IsratIJK','Faculty',NULL,22,NULL,NULL,'https://twitter.com/'),(12,'Anisul','Anisul Islam','anisul@gmail.com',NULL,NULL,'1693166576309pexels-pixabay-220453.jpg','1693166576301pexels-jacob-colvin-1761279.jpg','$2a$10$VOdFHQ13eur6eQxM1nEw/.XIlvdUR4JOzcAVznw.c/4Z0kPzzyCU6','Chittagong','anisul.com','Staff',NULL,NULL,110,NULL,NULL),(13,'R2','Robin','robin@gmail.com',NULL,NULL,'1693167779669pexels-arianna-jadÃ©-2896853.jpg','1693167779659pexels-andre-moura-17734945.jpg','$2a$10$LoNJX.1d.pVQEr2lUAKe5eEPCqVYqP8FYE4pdM39JpRo9QdKZ4tvy','Canada','r2.com','Student',NULL,NULL,NULL,NULL,NULL),(14,'Mou','Sadia Afrin Mou','mou@gmail.com',NULL,NULL,'16932040845061693166237794329901150_5732024393591687_3590245626934702253_n.jpg','1693204084434pexels-kasuma-1785493.jpg','$2a$10$IVL4cOjsAmtkXAUUudDh9.b1Nbd57giDpiPWJcGQkR/suuvXvahgC','USA','test.com','Student',11202178,NULL,NULL,NULL,NULL),(15,'Larisa','Larisa Jahan Khan','larisa@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$KCx02RG3w/RcdK.Sz3.db.52h4jqLB41cO0PFSB9fW3XdBXbjc.lC',NULL,NULL,'Staff',NULL,NULL,23,NULL,NULL),(16,'Sadia','Sadia Islam','sadia@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$B.VeEhxdmdYMf1Mh3M9o.OQtZ7UJWNt.71HZycZf1dwFJKW/t7Deu',NULL,NULL,'Faculty',NULL,23,NULL,NULL,NULL),(17,'NewU','New User','new@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$Dai4CQWvDU5xvQKUEelkE.EfliXBjVJBom0J5efUFOKlMYWWE/Acy',NULL,NULL,'Staff',NULL,NULL,NULL,NULL,NULL),(18,'y5','new test user','add@gmail.com',NULL,NULL,NULL,NULL,'$2a$10$qSXhHVDXkBa3mpjwEdGzGuGF1fYhy39vuBxW/vOb76bXm3MMv1cym',NULL,NULL,'Student',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `usertable` ENABLE KEYS */;
UNLOCK TABLES;
