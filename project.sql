-- MariaDB dump 10.19  Distrib 10.4.25-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	10.4.25-MariaDB

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
-- Table structure for table `cart`
--

use project;

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `cartId` int(11) NOT NULL,
  `units` int(11) NOT NULL,
  `itemId` int(11) NOT NULL,
  `productCode` varchar(255) NOT NULL,
  `title` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `price` int(11) NOT NULL,
  KEY `cartId` (`cartId`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `sales` (`orderId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (83,1,1,'M10004','Sazz DS','Capsules',100),(83,1,11,'kl67','Crocin','Capsule',30),(84,2,11,'kl67','Crocin','Capsule',30),(84,1,4,'M10022','Sinarest','Capsules',220),(85,1,4,'M10022','Sinarest','Capsules',220),(85,2,9,'HJ56','Strepstils','Toffee',10),(91,1,1,'M10004','Sazz DS','Capsules',100),(91,1,9,'kl67','Crocin','Capsule',30);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicines`
--

DROP TABLE IF EXISTS `medicines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medicines` (
  `itemId` int(11) NOT NULL AUTO_INCREMENT,
  `productCode` varchar(20) NOT NULL,
  `title` varchar(50) NOT NULL,
  `type` varchar(25) NOT NULL,
  `price` int(11) NOT NULL,
  `totalUnits` int(11) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`itemId`),
  CONSTRAINT `chk_units` CHECK (`totalUnits` >= 0)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicines`
--

LOCK TABLES `medicines` WRITE;
/*!40000 ALTER TABLE `medicines` DISABLE KEYS */;
INSERT INTO `medicines` VALUES (1,'M10004','Sazz DS','Capsules',100,6,'Saaz -DS Tablet DR is a medicine used to treat various inflammatory conditions of the joints (rheuma'),(4,'M10022','Sinarest','Capsules',220,27,'Sinarest New Tablet is a combination of three medicines: Chlorpheniramine, paracetamol and phenyleph'),(6,'M69','Betadine','Ointment',220,5,'Betadine is used to treat open wounds'),(7,'M6900','Trombophobe','Gel',50,11,'You dude its the cool medicine'),(9,'HJ56','Strepstils','Toffee',10,35,'hope this works'),(15,'IO6969','Hajmola','toffee',10,40,'You dude its cool');
/*!40000 ALTER TABLE `medicines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales` (
  `orderId` int(11) NOT NULL AUTO_INCREMENT,
  `orderDate` date NOT NULL,
  `custName` varchar(50) NOT NULL,
  `custNumber` varchar(14) NOT NULL,
  `totalAmount` int(11) DEFAULT NULL,
  PRIMARY KEY (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (83,'2022-12-14','lil nas','782389239',130),(84,'2022-12-14','kevin malone','839479759',280),(85,'2022-12-16','atharva jog','8377548',240),(91,'2022-12-16','lil uzi vert x','782389239',110);
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` varchar(10) DEFAULT 'false',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'edgar','edgar@gmail.com','$2a$10$dzNCimEF.0g127oJYUGiNe.SBjj5.wzXdKsPzD43iEJMFfa0DDtkO','true'),(8,'test1','test1@gmail.com','$2a$10$Aqe.pMV5oHUKZg.bceKeP.608S0MZlf4dO9OnPN0iXgd5TPvJMsZO','false'),(10,'test2','test2@gmail.com','$2a$10$anDOC5.RQeLlhS4dewKCGesoH5AaOmvI.f5zrPY2aScuZqjVS8TQK','false');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-12 18:39:14
