# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: localhost (MySQL 5.7.26)
# Database: catering
# Generation Time: 2021-01-05 10:44:23 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table main_meal
# ------------------------------------------------------------

DROP TABLE IF EXISTS `main_meal`;

CREATE TABLE `main_meal` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `number` text CHARACTER SET utf8 NOT NULL,
  `name` text CHARACTER SET utf8 NOT NULL,
  `date` text CHARACTER SET utf8 NOT NULL,
  `editable` text CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

LOCK TABLES `main_meal` WRITE;
/*!40000 ALTER TABLE `main_meal` DISABLE KEYS */;

INSERT INTO `main_meal` (`id`, `number`, `name`, `date`, `editable`)
VALUES
	(1,'1','nevime','3.9.2020','1599091200'),
	(2,'2','nevime','3.9.2020','1599091200'),
	(3,'3','nevime','3.9.2020','1599091200'),
	(4,'4','cc','3.9.2020','1599092200'),
	(5,'1','halusky','21.12.2020','1608562800'),
	(6,'2','maslo','21.12.2020','1608562800');

/*!40000 ALTER TABLE `main_meal` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table soup
# ------------------------------------------------------------

DROP TABLE IF EXISTS `soup`;

CREATE TABLE `soup` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `number` text CHARACTER SET utf8 NOT NULL,
  `name` text CHARACTER SET utf8 NOT NULL,
  `date` text CHARACTER SET utf8 NOT NULL,
  `editable` text CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

LOCK TABLES `soup` WRITE;
/*!40000 ALTER TABLE `soup` DISABLE KEYS */;

INSERT INTO `soup` (`id`, `number`, `name`, `date`, `editable`)
VALUES
	(1,'1','maslo','21.12.2020','1608562800'),
	(2,'2','maslo 2','21.12.2020','1608562800');

/*!40000 ALTER TABLE `soup` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` text CHARACTER SET utf8 NOT NULL,
  `food_type` text CHARACTER SET utf8 NOT NULL,
  `food_id` text CHARACTER SET utf8 NOT NULL,
  `date` text CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `user_id`, `food_type`, `food_id`, `date`)
VALUES
	(1,'Test','','',''),
	(2,'8705','main_meal','1','21.12.2020'),
	(3,'8705','soup','1','21.12.2020');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
