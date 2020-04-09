DROP TABLE IF EXISTS `Appointments`;
CREATE TABLE `Appointments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `loggedIn` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Appointments` WRITE;

-- INSERT INTO `Appointments` (`id`, `username`, `password`, `loggedIn`, `createdAt`, `updatedAt`)
-- VALUES
-- 	(1,'john','1234',1,'2018-03-15 06:55:06','2018-03-23 00:46:00'),
-- 	(2,'alex','2345',0,'2018-03-15 06:55:51','2018-03-19 23:08:53'),
-- 	(3,'sophia','thth1',0,'2018-03-15 06:57:02','2018-03-23 00:45:54'),
-- 	(4,'elena','77770',1,'2018-03-15 06:59:14','2018-03-21 23:59:33'),
-- 	(9,'leyla','1234',0,'2018-03-21 04:41:08','2018-03-21 06:56:45'),
-- 	(10,'lana','1234',1,'2018-03-22 17:58:03','2018-03-22 17:58:03');
UNLOCK TABLES;

# Dump of table Appointments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Appointments`;

CREATE TABLE `Appointments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `duration` decimal(10,2) NOT NULL,
  `treatment` varchar(255) NOT NULL,
  `phoneNumber` text NOT NULL,
  `phoneNumberShorten` text,
  `phoneNumberShortenTrue` tinyint(1) DEFAULT '0',
  `day` varchar(255) NOT NULL,
  `appointmentPhoto` varchar(255) DEFAULT NULL,
  `clientName` varchar(255) DEFAULT NULL,
  `clientAccept` tinyint(1) DEFAULT '0',
  `requesterAccept` tinyint(1) DEFAULT '0',
  `clientMarkComplete` tinyint(1) DEFAULT '0',
  `requesterMarkComplete` tinyint(1) DEFAULT '0',
  `appointId` int(11) DEFAULT NULL,
  `appointName` varchar(255) DEFAULT NULL,
  `appointmentPaid` tinyint(1) DEFAULT NULL,
  `appointmentComment` text,
  `appointmentCommentTrue` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ClientId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ClientId` (`ClientId`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`ClientId`) REFERENCES `Clients` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Appointments` WRITE;

INSERT INTO `Appointments` (`id`, `duration`, `treatment`, `phoneNumber`, `phoneNumberShorten`, `phoneNumberShortenTrue`, `day`, `appointmentPhoto`, `clientName`, `clientAccept`, `requesterAccept`, `clientMarkComplete`, `requesterMarkComplete`, `appointId`, `appointName`, `appointmentPaid`, `appointmentComment`, `appointmentCommentTrue`, `createdAt`, `updatedAt`, `ClientId`)
VALUES
	(1,15.00,'Womens facial','571222334',NULL,0,'Sunday','','john',0,0,0,0,0,NULL,NULL,NULL,0,'2018-03-19 00:40:06','2018-03-20 17:24:30',1),
	(2,30.00,'Mans facial','5715556655',NULL,0,'Tuesday','','john',1,1,1,1,4,'alex',1,'aaaaa',1,'2018-03-19 00:40:32','2018-03-22 00:02:34',1),
	(3,45.00,'Swedish massage','5718866556',NULL,0,'Thursday','','john',1,1,0,0,3,'elena',NULL,NULL,0,'2018-03-19 00:41:06','2018-03-22 20:10:23',1),
	(4,15.00,'Womens facial','5716644332',NULL,0,'Saturday','','sophia',1,1,1,1,1,'sophia',1,'Gaaaaaa',1,'2018-03-19 00:43:00','2018-03-19 04:10:27',3),
	(5,30.00,'Hot Stone massage','5719876543',NULL,0,'Monday','','sophia',1,1,1,1,1,'john',1,'aaaaaa',1,'2018-03-19 00:43:41','2018-03-21 23:58:43',3),
	(6,15.00,'Mens facial','5985533222',NULL,0,'Friday','','sophia',1,1,0,0,1,'alex',NULL,NULL,0,'2018-03-19 00:44:26','2018-03-22 20:10:54',3),
	(7,15.00,'Hot Stone massage','5719844665',NULL,0,'Sunday','','alex',0,0,0,0,0,NULL,NULL,NULL,0,'2018-03-19 00:45:26','2018-03-22 17:35:13',2),
	(8,30.00,'Mens facial','5719978866',NULL,0,'Thursday','','alex',0,0,0,0,NULL,NULL,NULL,NULL,0,'2018-03-19 00:46:04','2018-03-19 00:46:04',2),
	(9,45.00,'Womens facial','5716633987',NULL,0,'Thursday','','alex',0,0,0,0,0,NULL,NULL,NULL,0,'2018-03-19 00:46:45','2018-03-19 04:40:49',2),
	(10,15.00,'Mens facial','571998800',NULL,0,'Saturday','','elena',0,0,0,0,NULL,NULL,NULL,NULL,0,'2018-03-19 00:47:43','2018-03-20 00:32:18',4),
	(11,30.00,'Womens facial','5710022334',NULL,0,'Sunday','','elena',0,0,0,0,0,NULL,NULL,NULL,0,'2018-03-19 00:48:24','2018-03-19 04:41:19',4),
	(12,30.00,'Mens facial','5714455666',NULL,0,'Sunday','','elena',0,0,0,0,NULL,NULL,NULL,NULL,0,'2018-03-19 00:49:15','2018-03-19 00:49:15',4),
	(17,15.00,'Womens facial','5718585853',NULL,0,'Sunday','','sophia',1,1,1,1,1,'elana',1,NULL,0,'2018-03-20 16:06:22','2018-03-20 17:23:41',3),
	(18,30.00,'Womens facial','5710066555',NULL,0,'Sunday','','alex',1,1,1,1,3,'elena',1,'aaaaa',1,'2018-03-20 17:49:08','2018-03-22 17:34:36',1),
	(19,30.00,'Hot Stone massage','5710099887',NULL,0,'Sunday','','sophia',1,1,1,1,3,'alex',1,NULL,0,'2018-03-20 17:56:13','2018-03-20 17:56:46',1),
	(26,15.00,'Mens facial','57193847464',NULL,0,'Sunday','','elena',0,0,0,0,NULL,NULL,NULL,NULL,0,'2018-03-21 04:41:40','2018-03-21 04:41:40',9),
	(29,45.00,'Mens facial','5713847543',NULL,0,'Sunday','','sophia',1,1,0,0,1,'alex',NULL,NULL,0,'2018-03-22 18:21:36','2018-03-22 20:42:55',3),
	(32,45.00,'Hot Stone massage','5710393744',NULL,0,'Sunday','','alex',0,0,0,0,NULL,NULL,NULL,NULL,0,'2018-03-22 20:44:32','2018-03-22 20:44:32',3);

UNLOCK TABLES;
