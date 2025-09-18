/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.10-MariaDB, for Win64 (AMD64)
--
-- Host: 192.168.0.12    Database: univDB
-- ------------------------------------------------------
-- Server version	11.8.2-MariaDB-ubu2404

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `questions` (
  `questionNo` int(11) NOT NULL AUTO_INCREMENT,
  `userNo` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` varchar(500) NOT NULL,
  `answer` varchar(500) DEFAULT NULL,
  `queCreatedAt` timestamp NULL DEFAULT current_timestamp(),
  `ansCreatedAt` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`questionNo`),
  KEY `userNo` (`userNo`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`userNo`) REFERENCES `users` (`userNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `results` (
  `resultNo` int(11) NOT NULL AUTO_INCREMENT,
  `userNo` int(11) NOT NULL,
  `diseaseName` varchar(100) NOT NULL,
  `accuracy` float NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `uploadImage` varchar(255) NOT NULL,
  PRIMARY KEY (`resultNo`),
  KEY `userNo` (`userNo`),
  CONSTRAINT `results_ibfk_1` FOREIGN KEY (`userNo`) REFERENCES `users` (`userNo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
INSERT INTO `results` VALUES
(1,1,'농포/여드름',0.913647,'2025-09-14 08:30:46','uploads/1757838640199_IMG_D_A3_171188.jpg'),
(2,1,'결절/종괴',0.989511,'2025-09-14 08:32:01','uploads/1757838715221_IMG_D_A3_171192.jpg');
/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userNo` int(11) NOT NULL AUTO_INCREMENT,
  `userUid` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`userNo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'test','$2b$10$pLPp2OB0tf9DddI6R083A.KF1s070gzZlSAtPQw4IEXSbxnfJUh9K','tester1','000-111-1234','2025-09-14 08:26:18');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `v_user_activity`
--

DROP TABLE IF EXISTS `v_user_activity`;
/*!50001 DROP VIEW IF EXISTS `v_user_activity`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_user_activity` AS SELECT
 1 AS `userNo`,
  1 AS `userUid`,
  1 AS `name`,
  1 AS `diseaseName`,
  1 AS `accuracy`,
  1 AS `createdAt`,
  1 AS `title`,
  1 AS `answer`,
  1 AS `queCreatedAt`,
  1 AS `ansCreatedAt` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_user_questions`
--

DROP TABLE IF EXISTS `v_user_questions`;
/*!50001 DROP VIEW IF EXISTS `v_user_questions`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_user_questions` AS SELECT
 1 AS `userNo`,
  1 AS `userUid`,
  1 AS `name`,
  1 AS `questionNo`,
  1 AS `title`,
  1 AS `content`,
  1 AS `answer`,
  1 AS `queCreatedAt`,
  1 AS `ansCreatedAt` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_user_results`
--

DROP TABLE IF EXISTS `v_user_results`;
/*!50001 DROP VIEW IF EXISTS `v_user_results`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `v_user_results` AS SELECT
 1 AS `userNo`,
  1 AS `userUid`,
  1 AS `name`,
  1 AS `resultNo`,
  1 AS `diseaseName`,
  1 AS `accuracy`,
  1 AS `createdAt` */;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'univDB'
--

--
-- Final view structure for view `v_user_activity`
--

/*!50001 DROP VIEW IF EXISTS `v_user_activity`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_uca1400_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `univdb`.`v_user_activity` AS select `u`.`userNo` AS `userNo`,`u`.`userUid` AS `userUid`,`u`.`name` AS `name`,`r`.`diseaseName` AS `diseaseName`,`r`.`accuracy` AS `accuracy`,`r`.`createdAt` AS `createdAt`,`q`.`title` AS `title`,`q`.`answer` AS `answer`,`q`.`queCreatedAt` AS `queCreatedAt`,`q`.`ansCreatedAt` AS `ansCreatedAt` from ((`univdb`.`users` `u` left join `univdb`.`results` `r` on(`u`.`userNo` = `r`.`userNo`)) left join `univdb`.`questions` `q` on(`u`.`userNo` = `q`.`userNo`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_user_questions`
--

/*!50001 DROP VIEW IF EXISTS `v_user_questions`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_uca1400_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `univdb`.`v_user_questions` AS select `u`.`userNo` AS `userNo`,`u`.`userUid` AS `userUid`,`u`.`name` AS `name`,`q`.`questionNo` AS `questionNo`,`q`.`title` AS `title`,`q`.`content` AS `content`,`q`.`answer` AS `answer`,`q`.`queCreatedAt` AS `queCreatedAt`,`q`.`ansCreatedAt` AS `ansCreatedAt` from (`univdb`.`users` `u` join `univdb`.`questions` `q` on(`u`.`userNo` = `q`.`userNo`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_user_results`
--

/*!50001 DROP VIEW IF EXISTS `v_user_results`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_uca1400_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `univdb`.`v_user_results` AS select `u`.`userNo` AS `userNo`,`u`.`userUid` AS `userUid`,`u`.`name` AS `name`,`r`.`resultNo` AS `resultNo`,`r`.`diseaseName` AS `diseaseName`,`r`.`accuracy` AS `accuracy`,`r`.`createdAt` AS `createdAt` from (`univdb`.`users` `u` join `univdb`.`results` `r` on(`u`.`userNo` = `r`.`userNo`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-15 12:09:18
