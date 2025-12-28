# ************************************************************
# Sequel Ace SQL dump
# Version 20095
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Host: 127.0.0.1 (MySQL 12.1.2-MariaDB-ubu2404)
# Database: nihongo-nouto
# Generation Time: 2025-12-27 23:39:33 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table adjs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `adjs`;

CREATE TABLE `adjs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `word` text NOT NULL,
  `hiragana` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sense` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_i_conjugation` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `adjs` WRITE;
/*!40000 ALTER TABLE `adjs` DISABLE KEYS */;

INSERT INTO `adjs` (`id`, `word`, `hiragana`, `sense`, `is_i_conjugation`, `created_at`, `updated_at`)
VALUES
	(1,'大きい','おおきい','big',1,'2021-08-29 21:33:03','2021-08-29 21:33:03');

/*!40000 ALTER TABLE `adjs` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table noun_tag_rels
# ------------------------------------------------------------

DROP TABLE IF EXISTS `noun_tag_rels`;

CREATE TABLE `noun_tag_rels` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `noun_id` int(11) unsigned NOT NULL,
  `tag_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `noun_id` (`noun_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `noun_tag_rels_ibfk_1` FOREIGN KEY (`noun_id`) REFERENCES `nouns` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `noun_tag_rels_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `noun_tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `noun_tag_rels` WRITE;
/*!40000 ALTER TABLE `noun_tag_rels` DISABLE KEYS */;

INSERT INTO `noun_tag_rels` (`id`, `noun_id`, `tag_id`)
VALUES
	(40,1,2);

/*!40000 ALTER TABLE `noun_tag_rels` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table noun_tags
# ------------------------------------------------------------

DROP TABLE IF EXISTS `noun_tags`;

CREATE TABLE `noun_tags` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `noun_tags` WRITE;
/*!40000 ALTER TABLE `noun_tags` DISABLE KEYS */;

INSERT INTO `noun_tags` (`id`, `name`)
VALUES
	(2,'ABSTRACT'),
	(3,'LOCATION'),
	(6,'OTHER'),
	(5,'PEOPLE'),
	(1,'THINGS'),
	(4,'TIME');

/*!40000 ALTER TABLE `noun_tags` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table nouns
# ------------------------------------------------------------

DROP TABLE IF EXISTS `nouns`;

CREATE TABLE `nouns` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `word` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hiragana` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sense` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `nouns` WRITE;
/*!40000 ALTER TABLE `nouns` DISABLE KEYS */;

INSERT INTO `nouns` (`id`, `word`, `hiragana`, `sense`, `created_at`, `updated_at`)
VALUES
	(1,'勉強','べんきょう','study','2021-07-19 01:15:51','2025-12-27 00:18:41');

/*!40000 ALTER TABLE `nouns` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table others
# ------------------------------------------------------------

DROP TABLE IF EXISTS `others`;

CREATE TABLE `others` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `word` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `hiragana` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sense` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `others` WRITE;
/*!40000 ALTER TABLE `others` DISABLE KEYS */;

INSERT INTO `others` (`id`, `word`, `hiragana`, `sense`, `created_at`, `updated_at`)
VALUES
	(1,'今日','きょう','today','2021-08-29 21:33:53','2021-08-29 21:33:57');

/*!40000 ALTER TABLE `others` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table verbs
# ------------------------------------------------------------

DROP TABLE IF EXISTS `verbs`;

CREATE TABLE `verbs` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `word` text NOT NULL,
  `hiragana` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `group` enum('V5U','V5K','V5KS','V5G','V5S','V5T','V5M','V5B','V5N','V5R','V1','IRS','IRK') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sense` text DEFAULT NULL,
  `stem` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `te_form` text NOT NULL,
  `a_dan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `e_dan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `o_dan` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_transitive` tinyint(1) NOT NULL DEFAULT 0,
  `is_intransitive` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `group_id` (`group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `verbs` WRITE;
/*!40000 ALTER TABLE `verbs` DISABLE KEYS */;

INSERT INTO `verbs` (`id`, `word`, `hiragana`, `group`, `sense`, `stem`, `te_form`, `a_dan`, `e_dan`, `o_dan`, `is_transitive`, `is_intransitive`, `created_at`, `updated_at`)
VALUES
	(1,'食べる','たべる','V1','to eat','食べ','食べて','食べ','食べ','食べ',1,0,'2021-08-10 23:48:51','2025-12-25 01:12:40'),
	(2,'使う','つかう','V5U','to use','使い','使って','使わ','使え','使おう',1,0,'2021-09-01 00:43:16','2021-09-01 00:43:36'),
	(3,'する','する','IRS','to do','し','して','し','し','し',1,0,'2021-09-01 01:15:09','2021-09-01 01:15:09');

/*!40000 ALTER TABLE `verbs` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
