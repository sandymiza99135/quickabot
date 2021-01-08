-- MariaDB dump 10.17  Distrib 10.4.6-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: bot
-- ------------------------------------------------------
-- Server version	10.4.6-MariaDB

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
-- Table structure for table `basic_item_order`
--

DROP TABLE IF EXISTS `basic_item_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `basic_item_order` (
  `id` varchar(255) NOT NULL,
  `confirm_payment_payload` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `with_delivery_payload` varchar(255) DEFAULT NULL,
  `ask_if_with_delivery_id` varchar(255) DEFAULT NULL,
  `ask_payment_channel_id` varchar(255) DEFAULT NULL,
  `ask_quantity_id` varchar(255) DEFAULT NULL,
  `bot_project_id` varchar(255) DEFAULT NULL,
  `canceled_payment_notif_id` varchar(255) DEFAULT NULL,
  `msisdn_of_delivery_id` varchar(255) DEFAULT NULL,
  `order_confirmation_id` varchar(255) DEFAULT NULL,
  `place_of_delivery_id` varchar(255) DEFAULT NULL,
  `successfuly_payment_notif_id` varchar(255) DEFAULT NULL,
  `time_of_delivery_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfaorc2f57rgxf2pr1v450i11d` (`bot_project_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basic_item_order`
--

LOCK TABLES `basic_item_order` WRITE;
/*!40000 ALTER TABLE `basic_item_order` DISABLE KEYS */;
INSERT INTO `basic_item_order` VALUES ('63bd9652-1270-43be-a172-30525bee98c8','267f0a03-3280-47c3-b1cb-59acaf426f81','Basic payment','b23ffc23-d32d-46e4-9ea6-f36497349913','bcf7969e-66c3-4e84-b00c-56e5bf773034','a1b081c3-a9d2-4b02-8274-e5bf51413f8d','b9efd39f-543f-46b5-9d20-28c864e53c04','23a8152e-c0a5-4135-83c0-d703c9b07e9e','c27dd39c-e96d-4407-a77d-685ce147660e','62bc4c54-87f1-4f8f-a1ae-fc4853284116','edcee95c-a57d-4030-8f41-e803c3482365','73904480-bf78-455a-8d37-00807aa673c6','f95b9b3a-9f05-4b30-b0dd-a2160647e4b8','a3ef1ccd-4270-447d-a95f-0d7983f2451a');
/*!40000 ALTER TABLE `basic_item_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `basic_payment`
--

DROP TABLE IF EXISTS `basic_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `basic_payment` (
  `id` varchar(255) NOT NULL,
  `buyer_payment_account` varchar(255) DEFAULT NULL,
  `buyer_social_network_id` varchar(255) DEFAULT NULL,
  `canceled_at` datetime DEFAULT NULL,
  `msisd_of_delivery` varchar(255) DEFAULT NULL,
  `paid_at` datetime DEFAULT NULL,
  `payment_channel` int(11) DEFAULT NULL,
  `pended_at` datetime DEFAULT NULL,
  `place_of_delivery` varchar(255) DEFAULT NULL,
  `quantity` double DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `time_of_delivery` datetime DEFAULT NULL,
  `total_price` decimal(19,2) DEFAULT NULL,
  `txn_id` varchar(255) DEFAULT NULL,
  `with_delivery` tinyint(1) DEFAULT 0,
  `bot_project_id` varchar(255) DEFAULT NULL,
  `item_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7axtrsfwk1lugkavxd03ceic4` (`bot_project_id`),
  KEY `FKpmsqyq7cyak2ehpvbq31tk8nk` (`item_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basic_payment`
--

LOCK TABLES `basic_payment` WRITE;
/*!40000 ALTER TABLE `basic_payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `basic_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bot_project`
--

DROP TABLE IF EXISTS `bot_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bot_project` (
  `id` varchar(255) NOT NULL,
  `default_lang` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `max_error` tinyint(1) DEFAULT 3,
  `name` varchar(255) DEFAULT NULL,
  `notif_page_name` varchar(255) DEFAULT NULL,
  `payment_channels` varchar(255) DEFAULT NULL,
  `project_sn_page_id` varchar(255) DEFAULT NULL,
  `project_sn_page_name` varchar(255) DEFAULT NULL,
  `company_id` varchar(255) DEFAULT NULL,
  `main_message_id` varchar(255) DEFAULT NULL,
  `seller_id` varchar(255) DEFAULT NULL,
  `seller_member_successfuly_payment_notif_id` varchar(255) DEFAULT NULL,
  `seller_successfuly_payment_notif_id` varchar(255) DEFAULT NULL,
  `welcome_message_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKd4q7uty45aywxqn7cg5jqd2gs` (`project_sn_page_id`),
  KEY `FK5ehpxg34b0ih0slvpvvggf66l` (`company_id`),
  KEY `FK3uxfs1nudsusvryhbppo36adt` (`seller_id`),
  KEY `FKtg7iw1kytmwtvkmh2rogx4iku` (`seller_member_successfuly_payment_notif_id`),
  KEY `FKs3pq8l5y9ypl3mja95psfv37o` (`seller_successfuly_payment_notif_id`),
  KEY `FK93a484xqa2nh63ml3keeyjw8c` (`welcome_message_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bot_project`
--

LOCK TABLES `bot_project` WRITE;
/*!40000 ALTER TABLE `bot_project` DISABLE KEYS */;
INSERT INTO `bot_project` VALUES ('23a8152e-c0a5-4135-83c0-d703c9b07e9e','MG','Vente de pizza',3,'Pizza',NULL,'MVOLA,ORANGE_MONEY,AIRTEL_MONEY','2096059444054569','SmartApp','b4251507-4477-4b2a-8049-9e5aa22bcb80','eaa16f2f-6be0-4a78-afa5-f9fad426af9d','44a88696-daef-4cf6-899d-75db33575499',NULL,'55c60dba-d2ae-4c40-a4da-10261e72b987','85630063-385f-4290-9f11-cb0f7b7dadfe');
/*!40000 ALTER TABLE `bot_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bot_project_seller_members`
--

DROP TABLE IF EXISTS `bot_project_seller_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bot_project_seller_members` (
  `bot_project_id` varchar(255) NOT NULL,
  `seller_members_id` varchar(255) NOT NULL,
  UNIQUE KEY `UK_m22ygv34sx980hq4irmyw0kjh` (`seller_members_id`),
  KEY `FKqlyk1tk7lj2lkkgssnq98fahl` (`bot_project_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bot_project_seller_members`
--

LOCK TABLES `bot_project_seller_members` WRITE;
/*!40000 ALTER TABLE `bot_project_seller_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `bot_project_seller_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bot_user_dialogue`
--

DROP TABLE IF EXISTS `bot_user_dialogue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bot_user_dialogue` (
  `id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bot_user_dialogue`
--

LOCK TABLES `bot_user_dialogue` WRITE;
/*!40000 ALTER TABLE `bot_user_dialogue` DISABLE KEYS */;
/*!40000 ALTER TABLE `bot_user_dialogue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `button`
--

DROP TABLE IF EXISTS `button`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `button` (
  `id` varchar(255) NOT NULL,
  `bot_project_id` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `linked_item_for_sale_id` varchar(255) DEFAULT NULL,
  `linked_text_message_id` varchar(255) DEFAULT NULL,
  `text_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsje94avrkxmcxqwg00r6vhec7` (`linked_item_for_sale_id`),
  KEY `FKoj9913kscerhd8nxx60el94b8` (`text_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `button`
--

LOCK TABLES `button` WRITE;
/*!40000 ALTER TABLE `button` DISABLE KEYS */;
INSERT INTO `button` VALUES ('34f59528-b20a-4bec-bb48-7ac3b9c8be20','23a8152e-c0a5-4135-83c0-d703c9b07e9e','BASIC_BUTTON',NULL,'18f3b883-1348-4a73-a656-c1bacd0deda5','3e659b9f-76f3-421f-a72c-af52b67619a5'),('d0bcba43-931e-4546-b303-57c7b07047f7','23a8152e-c0a5-4135-83c0-d703c9b07e9e','BASIC_BUTTON',NULL,'789e3545-baad-4c98-9d87-51deb44b0ee2','b91028a8-927b-433d-a579-0ec59cf85c64'),('c28e87e2-9b33-4c37-b171-2024a135e4b8','23a8152e-c0a5-4135-83c0-d703c9b07e9e','BASIC_BUTTON',NULL,'18478536-c422-4e03-943e-6e1202012e0b','deaf79bf-bae8-4106-b56c-db31b7a24395'),('b07c4079-0d0b-4b08-a4fe-e0126bcd02ff','23a8152e-c0a5-4135-83c0-d703c9b07e9e','START_PAYMENT_BUTTON','0c62a522-9ab8-4e74-b0ef-f358af1d8c71',NULL,'f93ab32b-9883-4ea4-996c-ec36b8e849fe'),('29832bf3-1eb2-4bb1-8978-f308dfbc8e2e','23a8152e-c0a5-4135-83c0-d703c9b07e9e','BASIC_BUTTON',NULL,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d','2edbf650-0717-407c-9f95-e3b45812f5be'),('7386b994-f824-4c1c-ad49-78b11e667459','23a8152e-c0a5-4135-83c0-d703c9b07e9e','START_PAYMENT_BUTTON','f59a1c30-12ca-4e10-9501-f70e28439abe',NULL,'4589f289-279f-480e-ada0-953d60b5d099'),('03aa2ab6-f4de-4948-80e3-d7a61ba07ff4','23a8152e-c0a5-4135-83c0-d703c9b07e9e','BASIC_BUTTON',NULL,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d','b0f93389-522c-46fe-8c31-218f125fb6af'),('1addf788-8515-40af-9c76-39479b47949a','23a8152e-c0a5-4135-83c0-d703c9b07e9e','START_PAYMENT_BUTTON','5b58291b-6a84-4410-b5cd-eaba990bc8a9',NULL,'39b9b9dc-267e-4db7-9d13-4061ccdacb64'),('d055ca90-9e3a-465f-80a7-cd68e3d00e69','23a8152e-c0a5-4135-83c0-d703c9b07e9e','BASIC_BUTTON',NULL,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d','5c93439c-1f80-485c-b0d9-14ada129e8f0'),('6a66e191-86b3-406d-b60e-a7d536b33614','23a8152e-c0a5-4135-83c0-d703c9b07e9e','START_PAYMENT_BUTTON','da9c7691-0d12-4fc4-a10b-ac9879de46e2',NULL,'f49eb9bc-4bf1-4d75-bb3c-0464dfaddbc3'),('02878eb1-10d1-4303-9862-858598f1f6d1','23a8152e-c0a5-4135-83c0-d703c9b07e9e','BASIC_BUTTON',NULL,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d','7413d3b4-f0ff-40c6-8cfd-0d4f33e3b6b1'),('b5535fb4-d04c-4a0b-af42-15ca7ecf9ca0','23a8152e-c0a5-4135-83c0-d703c9b07e9e','START_PAYMENT_BUTTON','195e989d-8aac-4001-ad68-c867991483f1',NULL,'60321413-5321-4a48-a0a3-b498e9c9ff42'),('b00d7a4f-072b-4125-82f5-f2bd3fdadef5','23a8152e-c0a5-4135-83c0-d703c9b07e9e','BASIC_BUTTON',NULL,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d','e1fd2134-25d5-4b4b-b0ed-e6829d873af5'),('76b5a06b-7d06-4097-9ff9-ca0e0aed7c39','23a8152e-c0a5-4135-83c0-d703c9b07e9e','BASIC_BUTTON',NULL,'830c729a-e3e0-4fde-9d4a-09fa87f22397','58ff85ff-3349-478a-95ea-07f2a23546cc'),('15372d75-e4d5-4c3c-8196-7d662ceb0fe2','23a8152e-c0a5-4135-83c0-d703c9b07e9e','BASIC_BUTTON',NULL,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d','a17081d3-8339-4279-9bfb-35bd7d9a3245'),('d0fd2492-87a5-4980-9d7c-b0d95c214f46','23a8152e-c0a5-4135-83c0-d703c9b07e9e','START_PAYMENT_BUTTON','cd64adc6-3ec4-4127-bad5-1cc148606230',NULL,'c7786ef3-5096-418f-abd6-20f55963be28'),('d1654924-2b9c-48b0-97cd-e3e04e7ba6ac','23a8152e-c0a5-4135-83c0-d703c9b07e9e','START_PAYMENT_BUTTON','59f83f11-e9c9-4d9c-b974-8c717dae33c7',NULL,'677c7591-70f2-4944-b0ad-e7794d907711'),('ae3a4e9a-e9cb-44ed-9d64-d7bc5fdffcb5','23a8152e-c0a5-4135-83c0-d703c9b07e9e','START_PAYMENT_BUTTON','398b26cf-1454-433e-b501-9f30d5b08777',NULL,'c2424283-5a3f-4a7f-abe5-96a2f359fd08'),('2527dc27-debc-40ae-97a7-f74779179eef','23a8152e-c0a5-4135-83c0-d703c9b07e9e','BASIC_BUTTON',NULL,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d','4654a6b4-d691-4132-9c9a-eac56e0b0fd4'),('08033d31-4770-4cb6-8d62-b968131fb46c',NULL,'BASIC_BUTTON',NULL,NULL,'534789da-d515-4e7d-a903-4883018283e6'),('e036b423-7d70-405b-8f3e-6c36af7f6e72',NULL,'BASIC_BUTTON',NULL,NULL,'13872c99-f793-4b9c-bdd1-fcd7587e95a6'),('8e29c7b9-1f4f-43ae-8e04-89db5e5bf681',NULL,'BASIC_BUTTON',NULL,NULL,'f098ad87-c13b-409e-a334-6c2ad44eeb3a'),('b23ffc23-d32d-46e4-9ea6-f36497349913',NULL,'BASIC_BUTTON',NULL,NULL,'fd8e130a-9016-497f-994a-c3e8d869b93c'),('d10ecf58-061e-42e1-abf0-680275c91ac9',NULL,'BASIC_BUTTON',NULL,NULL,'09dd2ed5-1c21-4469-ba05-ecd7df2fa55d'),('267f0a03-3280-47c3-b1cb-59acaf426f81',NULL,'BASIC_BUTTON',NULL,NULL,'40bdafc7-2408-4481-9ee7-b750725269ee'),('ab5ed026-296d-45f9-be56-45743de29ae7',NULL,'BASIC_BUTTON',NULL,NULL,'e96f4bb0-a5cc-4157-b338-8ae852b729b3');
/*!40000 ALTER TABLE `button` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carossel_element`
--

DROP TABLE IF EXISTS `carossel_element`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carossel_element` (
  `id` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `carossel_message_id` varchar(255) DEFAULT NULL,
  `subtitle_id` varchar(255) DEFAULT NULL,
  `title_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcypht57i3hdq1bv51lnby58ff` (`carossel_message_id`),
  KEY `FKfn1ar9f7pnva0nog6diemdv3x` (`subtitle_id`),
  KEY `FKkui2ju81wlkv7ce4ytye5ddho` (`title_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carossel_element`
--

LOCK TABLES `carossel_element` WRITE;
/*!40000 ALTER TABLE `carossel_element` DISABLE KEYS */;
INSERT INTO `carossel_element` VALUES ('5d67a856-672f-405f-9850-dfa80f07588f','https://quickadev1.accesbanque.mg/image?name=crevette.jpg','18f3b883-1348-4a73-a656-c1bacd0deda5','933495d4-a992-4be4-ae37-5855e8a0fce4','ac032a18-8ef3-4ff1-a79f-f1f25b66b0d8'),('773dc9eb-f7a2-48ae-953d-7d3ce00944cf','https://quickadev1.accesbanque.mg/image?name=maison.jpg','18f3b883-1348-4a73-a656-c1bacd0deda5','0e680f20-33ed-4e24-b8af-67dc5b1df1fe','6b81ec17-a17e-467f-bc34-cf16ec91137d'),('56fc6247-5bbd-4d80-9918-4c3874242e96','https://quickadev1.accesbanque.mg/image?name=royale.jpg','18f3b883-1348-4a73-a656-c1bacd0deda5','7a3426be-8cef-439f-b003-23eca83936c8','e5fd77c0-f6e6-469f-b0d9-2475b78634b6'),('b6e69851-a1a7-4b6a-876a-f76ab9047566','https://quickadev1.accesbanque.mg/image?name=joker.jpg','789e3545-baad-4c98-9d87-51deb44b0ee2','bc95234a-7b92-4b74-bf63-6d3090d12b51','ddcbd052-a3ef-4e0c-8563-6d13c3015347'),('ac14b854-2f0b-4e11-b6c9-2ba5a0d65fb2','https://quickadev1.accesbanque.mg/image?name=orange.jpg','789e3545-baad-4c98-9d87-51deb44b0ee2','fabb8b27-404b-41b3-89f9-6f7b802fbde4','7f4db738-f802-4ef8-9360-c8dcb93cef88');
/*!40000 ALTER TABLE `carossel_element` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carossel_element_buttons`
--

DROP TABLE IF EXISTS `carossel_element_buttons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carossel_element_buttons` (
  `carossel_element_id` varchar(255) NOT NULL,
  `buttons_id` varchar(255) NOT NULL,
  UNIQUE KEY `UK_ngpbkroea3qybxnpue6uojrgr` (`buttons_id`),
  KEY `FK9h7jsbnm6i9hnhv6kvijeyn6l` (`carossel_element_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carossel_element_buttons`
--

LOCK TABLES `carossel_element_buttons` WRITE;
/*!40000 ALTER TABLE `carossel_element_buttons` DISABLE KEYS */;
INSERT INTO `carossel_element_buttons` VALUES ('5d67a856-672f-405f-9850-dfa80f07588f','b07c4079-0d0b-4b08-a4fe-e0126bcd02ff'),('5d67a856-672f-405f-9850-dfa80f07588f','29832bf3-1eb2-4bb1-8978-f308dfbc8e2e'),('773dc9eb-f7a2-48ae-953d-7d3ce00944cf','7386b994-f824-4c1c-ad49-78b11e667459'),('773dc9eb-f7a2-48ae-953d-7d3ce00944cf','03aa2ab6-f4de-4948-80e3-d7a61ba07ff4'),('56fc6247-5bbd-4d80-9918-4c3874242e96','1addf788-8515-40af-9c76-39479b47949a'),('56fc6247-5bbd-4d80-9918-4c3874242e96','d055ca90-9e3a-465f-80a7-cd68e3d00e69'),('b6e69851-a1a7-4b6a-876a-f76ab9047566','6a66e191-86b3-406d-b60e-a7d536b33614'),('b6e69851-a1a7-4b6a-876a-f76ab9047566','02878eb1-10d1-4303-9862-858598f1f6d1'),('ac14b854-2f0b-4e11-b6c9-2ba5a0d65fb2','b5535fb4-d04c-4a0b-af42-15ca7ecf9ca0'),('ac14b854-2f0b-4e11-b6c9-2ba5a0d65fb2','b00d7a4f-072b-4125-82f5-f2bd3fdadef5');
/*!40000 ALTER TABLE `carossel_element_buttons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carossel_message`
--

DROP TABLE IF EXISTS `carossel_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carossel_message` (
  `id` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `should_answered` tinyint(1) DEFAULT 0,
  `next_if_not_valid_response_id` varchar(255) DEFAULT NULL,
  `next_if_valid_response_id` varchar(255) DEFAULT NULL,
  `project_id` varchar(255) DEFAULT NULL,
  `text_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ps7omifyk3o35h7bexx0g1bsi` (`project_id`),
  KEY `FK_khloe645qrtxrmr7sasp117ol` (`text_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carossel_message`
--

LOCK TABLES `carossel_message` WRITE;
/*!40000 ALTER TABLE `carossel_message` DISABLE KEYS */;
INSERT INTO `carossel_message` VALUES ('18f3b883-1348-4a73-a656-c1bacd0deda5','Menu pizza',0,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d',NULL,'23a8152e-c0a5-4135-83c0-d703c9b07e9e','e4584dbe-834b-43a1-878a-72d1566b940d'),('789e3545-baad-4c98-9d87-51deb44b0ee2','Menu jus',0,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d',NULL,'23a8152e-c0a5-4135-83c0-d703c9b07e9e','c4071c93-bf4b-4ebd-a315-aef0c1692e78');
/*!40000 ALTER TABLE `carossel_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company` (
  `id` varchar(255) NOT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES ('b4251507-4477-4b2a-8049-9e5aa22bcb80','0349804376','rolland.randriamaholison@accesbanque.mg','Pizza matsiro');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facebook_user`
--

DROP TABLE IF EXISTS `facebook_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facebook_user` (
  `id` varchar(255) NOT NULL,
  `current_lang` int(11) DEFAULT NULL,
  `current_occurence_error` int(11) DEFAULT NULL,
  `page_id` varchar(255) DEFAULT NULL,
  `user_fb_id` varchar(255) DEFAULT NULL,
  `current_message_id` varchar(255) DEFAULT NULL,
  `current_payment_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdxrycu0pl6pq7o1hm1fqdgxlq` (`current_payment_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facebook_user`
--

LOCK TABLES `facebook_user` WRITE;
/*!40000 ALTER TABLE `facebook_user` DISABLE KEYS */;
INSERT INTO `facebook_user` VALUES ('44a88696-daef-4cf6-899d-75db33575499',0,0,NULL,'3088323801275333',NULL,NULL);
/*!40000 ALTER TABLE `facebook_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `for_sale_item`
--

DROP TABLE IF EXISTS `for_sale_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `for_sale_item` (
  `id` varchar(255) NOT NULL,
  `ask_quantity` tinyint(1) DEFAULT 0,
  `ask_time_delivery` tinyint(1) DEFAULT 0,
  `deliverable` tinyint(1) DEFAULT 0,
  `name` varchar(255) DEFAULT NULL,
  `order_item_strategy` varchar(255) DEFAULT NULL,
  `quantity_unit` varchar(255) DEFAULT NULL,
  `unit_price` decimal(19,2) DEFAULT NULL,
  `on_payment_canceled_id` varchar(255) DEFAULT NULL,
  `project_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7e2rk3ilv451qes366o5m6qye` (`project_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `for_sale_item`
--

LOCK TABLES `for_sale_item` WRITE;
/*!40000 ALTER TABLE `for_sale_item` DISABLE KEYS */;
INSERT INTO `for_sale_item` VALUES ('0c62a522-9ab8-4e74-b0ef-f358af1d8c71',1,0,1,'Pizza crevette GM','BASIC_ITEM_PAYMENT','carton PM',25000.00,NULL,'23a8152e-c0a5-4135-83c0-d703c9b07e9e'),('f59a1c30-12ca-4e10-9501-f70e28439abe',1,0,0,'Pizza maison PM','BASIC_ITEM_PAYMENT','carton GM',50000.00,NULL,'23a8152e-c0a5-4135-83c0-d703c9b07e9e'),('5b58291b-6a84-4410-b5cd-eaba990bc8a9',1,0,1,'Pizza royale GM','BASIC_ITEM_PAYMENT','carton GM',35000.00,NULL,'23a8152e-c0a5-4135-83c0-d703c9b07e9e'),('da9c7691-0d12-4fc4-a10b-ac9879de46e2',1,0,1,'Jus joker','BASIC_ITEM_PAYMENT','bouteille',4000.00,NULL,'23a8152e-c0a5-4135-83c0-d703c9b07e9e'),('195e989d-8aac-4001-ad68-c867991483f1',1,0,1,'Jus orange','BASIC_ITEM_PAYMENT','bouteille',4500.00,NULL,'23a8152e-c0a5-4135-83c0-d703c9b07e9e'),('cd64adc6-3ec4-4127-bad5-1cc148606230',0,0,1,'Laoka akoho','BASIC_ITEM_PAYMENT','plat',10000.00,NULL,'23a8152e-c0a5-4135-83c0-d703c9b07e9e'),('59f83f11-e9c9-4d9c-b974-8c717dae33c7',0,0,0,'Laoka kisoa','BASIC_ITEM_PAYMENT','plat',12000.00,NULL,'23a8152e-c0a5-4135-83c0-d703c9b07e9e'),('398b26cf-1454-433e-b501-9f30d5b08777',0,0,0,'Laoka henomby','BASIC_ITEM_PAYMENT','plat',8000.00,NULL,'23a8152e-c0a5-4135-83c0-d703c9b07e9e');
/*!40000 ALTER TABLE `for_sale_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_message`
--

DROP TABLE IF EXISTS `menu_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu_message` (
  `id` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `should_answered` tinyint(1) DEFAULT 0,
  `next_if_not_valid_response_id` varchar(255) DEFAULT NULL,
  `next_if_valid_response_id` varchar(255) DEFAULT NULL,
  `project_id` varchar(255) DEFAULT NULL,
  `text_id` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3rm1p13hylty23h254nsvap50` (`project_id`),
  KEY `FK_3h004u3pmvl9yii0x56fqv45m` (`text_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_message`
--

LOCK TABLES `menu_message` WRITE;
/*!40000 ALTER TABLE `menu_message` DISABLE KEYS */;
INSERT INTO `menu_message` VALUES ('eaa16f2f-6be0-4a78-afa5-f9fad426af9d','Message principale',1,NULL,NULL,NULL,'6f2f3b11-af4f-4a82-9736-9ae778f5a780','VERTICAL'),('18478536-c422-4e03-943e-6e1202012e0b','Choix vary ou laoka',0,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d',NULL,'23a8152e-c0a5-4135-83c0-d703c9b07e9e','8af63fc5-8f0b-4213-bfda-9cf4384a2e60','VERTICAL'),('830c729a-e3e0-4fde-9d4a-09fa87f22397','Menu laoka',0,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d',NULL,'23a8152e-c0a5-4135-83c0-d703c9b07e9e','cb31c2b6-06e8-486c-b7e4-8b4970a6ca55','HORIZONTAL'),('a1b081c3-a9d2-4b02-8274-e5bf51413f8d','Demande payment channel',1,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d',NULL,NULL,'17b072c2-ae65-47c5-bac7-edb5de381f47','VERTICAL'),('bcf7969e-66c3-4e84-b00c-56e5bf773034','Demande si avec livraison',1,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d','73904480-bf78-455a-8d37-00807aa673c6',NULL,'f0e69850-1524-4077-ba83-3025669ed39e','VERTICAL'),('edcee95c-a57d-4030-8f41-e803c3482365','Payment confirmation',1,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d',NULL,NULL,'fff8af46-6756-45c1-a0db-600210bf1159','VERTICAL');
/*!40000 ALTER TABLE `menu_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_message_buttons`
--

DROP TABLE IF EXISTS `menu_message_buttons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu_message_buttons` (
  `menu_message_id` varchar(255) NOT NULL,
  `buttons_id` varchar(255) NOT NULL,
  UNIQUE KEY `UK_cxl95ylj5io1rkp4d5tb74oqk` (`buttons_id`),
  KEY `FKgdnji1a93x49jl0k5hiyjap68` (`menu_message_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_message_buttons`
--

LOCK TABLES `menu_message_buttons` WRITE;
/*!40000 ALTER TABLE `menu_message_buttons` DISABLE KEYS */;
INSERT INTO `menu_message_buttons` VALUES ('eaa16f2f-6be0-4a78-afa5-f9fad426af9d','34f59528-b20a-4bec-bb48-7ac3b9c8be20'),('eaa16f2f-6be0-4a78-afa5-f9fad426af9d','d0bcba43-931e-4546-b303-57c7b07047f7'),('eaa16f2f-6be0-4a78-afa5-f9fad426af9d','c28e87e2-9b33-4c37-b171-2024a135e4b8'),('18478536-c422-4e03-943e-6e1202012e0b','76b5a06b-7d06-4097-9ff9-ca0e0aed7c39'),('18478536-c422-4e03-943e-6e1202012e0b','15372d75-e4d5-4c3c-8196-7d662ceb0fe2'),('830c729a-e3e0-4fde-9d4a-09fa87f22397','d0fd2492-87a5-4980-9d7c-b0d95c214f46'),('830c729a-e3e0-4fde-9d4a-09fa87f22397','d1654924-2b9c-48b0-97cd-e3e04e7ba6ac'),('830c729a-e3e0-4fde-9d4a-09fa87f22397','ae3a4e9a-e9cb-44ed-9d64-d7bc5fdffcb5'),('830c729a-e3e0-4fde-9d4a-09fa87f22397','2527dc27-debc-40ae-97a7-f74779179eef'),('a1b081c3-a9d2-4b02-8274-e5bf51413f8d','08033d31-4770-4cb6-8d62-b968131fb46c'),('a1b081c3-a9d2-4b02-8274-e5bf51413f8d','e036b423-7d70-405b-8f3e-6c36af7f6e72'),('a1b081c3-a9d2-4b02-8274-e5bf51413f8d','8e29c7b9-1f4f-43ae-8e04-89db5e5bf681'),('bcf7969e-66c3-4e84-b00c-56e5bf773034','b23ffc23-d32d-46e4-9ea6-f36497349913'),('bcf7969e-66c3-4e84-b00c-56e5bf773034','d10ecf58-061e-42e1-abf0-680275c91ac9'),('edcee95c-a57d-4030-8f41-e803c3482365','267f0a03-3280-47c3-b1cb-59acaf426f81'),('edcee95c-a57d-4030-8f41-e803c3482365','ab5ed026-296d-45f9-be56-45743de29ae7');
/*!40000 ALTER TABLE `menu_message_buttons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_channel`
--

DROP TABLE IF EXISTS `payment_channel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_channel` (
  `id` varchar(255) NOT NULL,
  `channel` varchar(255) DEFAULT NULL,
  `merchant_account` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_channel`
--

LOCK TABLES `payment_channel` WRITE;
/*!40000 ALTER TABLE `payment_channel` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_channel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_channel_config`
--

DROP TABLE IF EXISTS `payment_channel_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment_channel_config` (
  `id` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `ask_account_number_id` varchar(255) DEFAULT NULL,
  `pending_failed_notif_id` varchar(255) DEFAULT NULL,
  `pending_notif_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK61axty94cercv8ka8p1nfos1b` (`type`),
  KEY `FKdjbfs5fdegdgc958174ayy9vs` (`pending_failed_notif_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_channel_config`
--

LOCK TABLES `payment_channel_config` WRITE;
/*!40000 ALTER TABLE `payment_channel_config` DISABLE KEYS */;
INSERT INTO `payment_channel_config` VALUES ('79d34fbd-3c7b-4cb2-a07b-1ec6e02891ad','MVOLA','474fb772-cd23-4995-9a9c-84b1a4c4a34c','d19e50f7-7167-4442-bb10-790a0ff0fac8','11a0d3a9-caf4-4992-8810-842142705491'),('325ecd8e-1aba-4b0c-8531-ca3defda1a40','ORANGE_MONEY','b0315017-b5c2-493f-9b9f-b57856947e1c','9f4d642f-f15b-4632-abd1-887f81d27838','71fb3c38-116e-4636-9f30-bdfa1a72519f'),('f79f00ba-e73f-435d-b320-86877e5a40de','AIRTEL_MONEY','f6f87d15-2667-40a1-a464-55ffdce9bdb1','839fea3a-9ab5-4f43-8084-f6ca7aa5363f','cdc3a5a5-8aed-466e-b389-a8ea97af6e8d');
/*!40000 ALTER TABLE `payment_channel_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_response`
--

DROP TABLE IF EXISTS `question_response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question_response` (
  `id` varchar(255) NOT NULL,
  `response` varchar(255) DEFAULT NULL,
  `bot_user_dialogue_id` varchar(255) DEFAULT NULL,
  `text_message_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqpnbm168d9st4bbfd1moudsoh` (`bot_user_dialogue_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_response`
--

LOCK TABLES `question_response` WRITE;
/*!40000 ALTER TABLE `question_response` DISABLE KEYS */;
/*!40000 ALTER TABLE `question_response` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `text`
--

DROP TABLE IF EXISTS `text`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `text` (
  `id` varchar(255) NOT NULL,
  `fr` varchar(500) DEFAULT NULL,
  `mg` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `text`
--

LOCK TABLES `text` WRITE;
/*!40000 ALTER TABLE `text` DISABLE KEYS */;
INSERT INTO `text` VALUES ('6f2f3b11-af4f-4a82-9736-9ae778f5a780',NULL,'Inona no hatao anao azfady?'),('3e659b9f-76f3-421f-a72c-af52b67619a5',NULL,'Pizza'),('b91028a8-927b-433d-a579-0ec59cf85c64',NULL,'Jus'),('deaf79bf-bae8-4106-b56c-db31b7a24395',NULL,'Vary'),('55c60dba-d2ae-4c40-a4da-10261e72b987',NULL,'Ianao dia naharay vola vidina pizza {totalPrice}.\n Misaotra anao ny {companyName}.'),('85630063-385f-4290-9f11-cb0f7b7dadfe',NULL,'Miarahaba tompoko'),('e4584dbe-834b-43a1-878a-72d1566b940d',NULL,'Pizza iza no mety aminao azafady?'),('933495d4-a992-4be4-ae37-5855e8a0fce4',NULL,'Pizza vita @ crevette'),('ac032a18-8ef3-4ff1-a79f-f1f25b66b0d8',NULL,'Crevette'),('f93ab32b-9883-4ea4-996c-ec36b8e849fe',NULL,'Hividy'),('2edbf650-0717-407c-9f95-e3b45812f5be',NULL,'Hafa'),('0e680f20-33ed-4e24-b8af-67dc5b1df1fe',NULL,'Pizza fitondra any antrano'),('6b81ec17-a17e-467f-bc34-cf16ec91137d',NULL,'Maison'),('4589f289-279f-480e-ada0-953d60b5d099',NULL,'Hividy'),('b0f93389-522c-46fe-8c31-218f125fb6af',NULL,'Hafa'),('7a3426be-8cef-439f-b003-23eca83936c8',NULL,'Pizza royale'),('e5fd77c0-f6e6-469f-b0d9-2475b78634b6',NULL,'Royale'),('39b9b9dc-267e-4db7-9d13-4061ccdacb64',NULL,'Hividy'),('5c93439c-1f80-485c-b0d9-14ada129e8f0',NULL,'Hafa'),('c4071c93-bf4b-4ebd-a315-aef0c1692e78',NULL,'Jus iza no mety aminao azafady?'),('bc95234a-7b92-4b74-bf63-6d3090d12b51',NULL,'@le mapangatsiatsiaka'),('ddcbd052-a3ef-4e0c-8563-6d13c3015347',NULL,'Joker'),('f49eb9bc-4bf1-4d75-bb3c-0464dfaddbc3',NULL,'Hividy'),('7413d3b4-f0ff-40c6-8cfd-0d4f33e3b6b1',NULL,'Hafa'),('fabb8b27-404b-41b3-89f9-6f7b802fbde4',NULL,'@le mahafaka hetaheta'),('7f4db738-f802-4ef8-9360-c8dcb93cef88',NULL,'Orange'),('60321413-5321-4a48-a0a3-b498e9c9ff42',NULL,'Hividy'),('e1fd2134-25d5-4b4b-b0ed-e6829d873af5',NULL,'Hafa'),('8af63fc5-8f0b-4213-bfda-9cf4384a2e60',NULL,'Vary sa laoka no tadiavinao?'),('58ff85ff-3349-478a-95ea-07f2a23546cc',NULL,'Vary'),('a17081d3-8339-4279-9bfb-35bd7d9a3245',NULL,'Hafa'),('cb31c2b6-06e8-486c-b7e4-8b4970a6ca55',NULL,'Ny laoka mety aminao?'),('c7786ef3-5096-418f-abd6-20f55963be28',NULL,'Akoho'),('677c7591-70f2-4944-b0ad-e7794d907711',NULL,'Kisoa'),('c2424283-5a3f-4a7f-abe5-96a2f359fd08',NULL,'Hen\'omby'),('4654a6b4-d691-4132-9c9a-eac56e0b0fd4',NULL,'Hafa'),('1f19067f-4138-4240-854d-0b25af6d7356',NULL,'Ampidiro ny laharana MVOLA handoavanao ny vola (034xxxxxxx)'),('8a099219-266d-4a95-ab67-36598277a9ab',NULL,'Diso ny nomerao MVOLA nampidirinao'),('d19e50f7-7167-4442-bb10-790a0ff0fac8',NULL,'Tsy tanteraka ny fanoavam-bolanao Mvola saika hataonao, avereno azafady'),('88997bf4-4189-472c-8731-aef05deb821a',NULL,'Hmarino @ #111*1# ny fandoavambolanao'),('5079ecfc-d54b-4859-bca5-520946d60c63',NULL,'Ampidiro ny laharana ORANGE MONEY handoavanao ny vola (032xxxxxxx)'),('c1cb1fac-8792-4ff5-8717-545952777609',NULL,'Diso ny nomerao ORANGE MONEY nampidirinao'),('9f4d642f-f15b-4632-abd1-887f81d27838',NULL,'Tsy tanteraka ny fanoavam-bolanao Orange Money Saika hataonao, avereno azafady'),('13ffd8c3-2364-4cb1-b8b7-1f85a679a6e8',NULL,'Hmarino @ #144# ny fandoavambolanao'),('407e8ac8-9ad9-4acb-aa4f-c6ca4b8ea4c0',NULL,'Ampidiro ny laharana AIRTEL MONEY handoavanao ny vola (033xxxxxxx)'),('4d883023-ec03-4628-9b69-685bfe89f4b3',NULL,'Diso ny nomerao AIRTEL MONEY nampidirinao'),('839fea3a-9ab5-4f43-8084-f6ca7aa5363f',NULL,'Tsy tanteraka ny fanoavam-bolanao Airtel Money saika hataonao, avereno azafady'),('59206c6a-6414-44dd-8743-85ece2572613',NULL,'Hmarino @ #122# ny fandoavambolanao'),('17b072c2-ae65-47c5-bac7-edb5de381f47',NULL,'Safidio ny tambazotra fandoavam-bola mety aminao?'),('534789da-d515-4e7d-a903-4883018283e6',NULL,'MVOLA'),('13872c99-f793-4b9c-bdd1-fcd7587e95a6',NULL,'ORANGE MONEY'),('f098ad87-c13b-409e-a334-6c2ad44eeb3a',NULL,'AIRTEL MONEY'),('9fc04b65-140d-4a9e-8f01-2db5bde5a893',NULL,'Ampidiro ny laharana afaka antsoina hanaterana ny entanao'),('ebef84ac-ad39-41e7-ab98-d34991dc14b9',NULL,'Diso ny nomerao nampidirinao'),('65c5c49b-e2fe-4b01-ae99-a5becd3d3962',NULL,'Aiza no hanaterana ny entanao?'),('f0e69850-1524-4077-ba83-3025669ed39e',NULL,'Aterina any aminao ve azafady?'),('fd8e130a-9016-497f-994a-c3e8d869b93c',NULL,'Eny'),('09dd2ed5-1c21-4469-ba05-ecd7df2fa55d',NULL,'Tsia'),('73ecbe80-9c24-441d-be07-549e775f91c4',NULL,'Daty sy ora hahavononan\'ny entanao (ohatra: 12/02/45 10:00:00) ?'),('9c092db4-7036-4e74-bb0d-6cf2af267276',NULL,'Diso ny format ny daty'),('babcac26-4d72-4796-9f09-83919112614d',NULL,'Firy QUANTITY_UNIT no ilainao azafady?'),('e698eddf-362a-4d6f-87d9-69b4ca995162',NULL,'Ny fatra dia tsy miaintsy mihaotra ny 0'),('e53cd435-bce4-4885-b166-5879e7e23fa7',NULL,'Foana ny fandoavam-bola TOTAL_PRICE Ariary saika hataonao.\nMisaotra.'),('fff8af46-6756-45c1-a0db-600210bf1159',NULL,'Article: ITEM_NAME\nQuantite: QUANTITY_VALUE QUANTITY_UNIT\nLivraison: PLACE_DELIVERY\nNumero pour livraison: MSISDN_DELIVERY\nHeure de depart pour livraison: TIME_DELIVERY\nTotal a payer: TOTAL_PRICE Ar\nCanal de paiement: PAYMENT_CHANNEL\nNumero de paiement: MSISDN_PAYMENT\nId commande: ORDER_ID'),('40bdafc7-2408-4481-9ee7-b750725269ee',NULL,'Haloa'),('e96f4bb0-a5cc-4157-b338-8ae852b729b3',NULL,'Ajanona'),('8e0a1fd5-974d-45fb-9c31-58ea21647a84',NULL,'Voaray ny fandoavam-bola TOTAL_PRICE Ariary nataona. Ref: {TXN_ID}\n.Misaotra anao ny MADA EXPERTISE\n');
/*!40000 ALTER TABLE `text` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `text_message`
--

DROP TABLE IF EXISTS `text_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `text_message` (
  `id` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `should_answered` tinyint(1) DEFAULT 0,
  `next_if_not_valid_response_id` varchar(255) DEFAULT NULL,
  `next_if_valid_response_id` varchar(255) DEFAULT NULL,
  `project_id` varchar(255) DEFAULT NULL,
  `text_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt0a644p1akp6x12o47bnig5oq` (`project_id`),
  KEY `FK9ml58jnrtnmpgp0rah9j3smsj` (`text_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `text_message`
--

LOCK TABLES `text_message` WRITE;
/*!40000 ALTER TABLE `text_message` DISABLE KEYS */;
INSERT INTO `text_message` VALUES ('474fb772-cd23-4995-9a9c-84b1a4c4a34c','Ask num mvola',1,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d',NULL,NULL,'1f19067f-4138-4240-854d-0b25af6d7356'),('11a0d3a9-caf4-4992-8810-842142705491','Pending mvola failed',1,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d',NULL,NULL,'88997bf4-4189-472c-8731-aef05deb821a'),('b0315017-b5c2-493f-9b9f-b57856947e1c','Ask num orange money',1,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d',NULL,NULL,'5079ecfc-d54b-4859-bca5-520946d60c63'),('71fb3c38-116e-4636-9f30-bdfa1a72519f','Pending orange money failed',1,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d',NULL,NULL,'13ffd8c3-2364-4cb1-b8b7-1f85a679a6e8'),('f6f87d15-2667-40a1-a464-55ffdce9bdb1','Ask num airtel money',1,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d',NULL,NULL,'407e8ac8-9ad9-4acb-aa4f-c6ca4b8ea4c0'),('cdc3a5a5-8aed-466e-b389-a8ea97af6e8d','Pending airtel money failed',1,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d',NULL,NULL,'59206c6a-6414-44dd-8743-85ece2572613'),('62bc4c54-87f1-4f8f-a1ae-fc4853284116','DELIVERY_INFORMATION_QUESTION',1,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d','a1b081c3-a9d2-4b02-8274-e5bf51413f8d',NULL,'9fc04b65-140d-4a9e-8f01-2db5bde5a893'),('73904480-bf78-455a-8d37-00807aa673c6','DELIVERY_INFORMATION_QUESTION',1,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d','62bc4c54-87f1-4f8f-a1ae-fc4853284116',NULL,'65c5c49b-e2fe-4b01-ae99-a5becd3d3962'),('a3ef1ccd-4270-447d-a95f-0d7983f2451a','Time delivery',1,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d','bcf7969e-66c3-4e84-b00c-56e5bf773034',NULL,'73ecbe80-9c24-441d-be07-549e775f91c4'),('b9efd39f-543f-46b5-9d20-28c864e53c04','ASK_QUANTITY_QUESTION',1,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d','a3ef1ccd-4270-447d-a95f-0d7983f2451a',NULL,'babcac26-4d72-4796-9f09-83919112614d'),('c27dd39c-e96d-4407-a77d-685ce147660e','Canceled payment',1,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d',NULL,NULL,'e53cd435-bce4-4885-b166-5879e7e23fa7'),('f95b9b3a-9f05-4b30-b0dd-a2160647e4b8','Successful payment',1,'eaa16f2f-6be0-4a78-afa5-f9fad426af9d',NULL,NULL,'8e0a1fd5-974d-45fb-9c31-58ea21647a84');
/*!40000 ALTER TABLE `text_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_response_validator`
--

DROP TABLE IF EXISTS `user_response_validator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_response_validator` (
  `id` varchar(255) NOT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `reference_value_provider` varchar(255) DEFAULT NULL,
  `validator_enum` varchar(255) DEFAULT NULL,
  `not_valid_notif_id` varchar(255) DEFAULT NULL,
  `question_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKiq3008fjobcmdtvhfs731u7ky` (`not_valid_notif_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_response_validator`
--

LOCK TABLES `user_response_validator` WRITE;
/*!40000 ALTER TABLE `user_response_validator` DISABLE KEYS */;
INSERT INTO `user_response_validator` VALUES ('a062b561-fd3b-43e7-89b9-7451ae91e35c','^034[0-9]{7}$','CONSTANT_VALUE_PROVIDER','REGEX','8a099219-266d-4a95-ab67-36598277a9ab','474fb772-cd23-4995-9a9c-84b1a4c4a34c'),('bc14e696-83e2-4d64-a577-6489f33771a4','^032[0-9]{7}$','CONSTANT_VALUE_PROVIDER','REGEX','c1cb1fac-8792-4ff5-8717-545952777609','b0315017-b5c2-493f-9b9f-b57856947e1c'),('f3b42817-8454-44bf-9494-561f667b0af3','^033[0-9]{7}$','CONSTANT_VALUE_PROVIDER','REGEX','4d883023-ec03-4628-9b69-685bfe89f4b3','f6f87d15-2667-40a1-a464-55ffdce9bdb1'),('d8e07cc0-7f15-4392-9182-74b5de7aceba','^03(2|3|4)[0-9]{7}','CONSTANT_VALUE_PROVIDER','REGEX','ebef84ac-ad39-41e7-ab98-d34991dc14b9','62bc4c54-87f1-4f8f-a1ae-fc4853284116'),('465af00d-eb5a-4f39-80ae-f55e4ce2e367','dd/MM/yyyy HH:mm:ss','CONSTANT_VALUE_PROVIDER','DATE_FORMAT','9c092db4-7036-4e74-bb0d-6cf2af267276','a3ef1ccd-4270-447d-a95f-0d7983f2451a'),('eda426bc-c41b-4798-a9b6-ec0969aaa42b','0','CONSTANT_VALUE_PROVIDER','GREATER_THAN','e698eddf-362a-4d6f-87d9-69b4ca995162','b9efd39f-543f-46b5-9d20-28c864e53c04');
/*!40000 ALTER TABLE `user_response_validator` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-21 18:17:54
