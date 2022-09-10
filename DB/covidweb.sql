-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 10, 2022 at 09:30 PM
-- Server version: 8.0.30
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `covidweb`
--

-- --------------------------------------------------------

--
-- Table structure for table `busyness`
--

CREATE TABLE `busyness` (
  `LOCATION_ID` varchar(256) NOT NULL,
  `BUSYNESS` int NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `busyness`
--

INSERT INTO `busyness` (`LOCATION_ID`, `BUSYNESS`, `timestamp`) VALUES
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 0, '2022-08-02 12:09:58'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 10, '2022-08-08 12:09:58'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 8, '2022-08-08 14:52:31'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 9, '2022-08-08 14:52:54'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 0, '2022-08-08 16:21:21'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 0, '2022-08-08 18:58:58'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 0, '2022-08-08 18:59:04'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 0, '2022-08-08 18:59:31'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 0, '2022-08-12 09:33:34'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 0, '2022-08-12 09:33:56'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 0, '2022-08-12 09:34:07'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 4, '2022-09-07 14:58:45'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 4, '2022-09-07 15:47:06'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 18, '2022-09-07 15:53:00'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 6, '2022-09-07 18:29:39'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 6, '2022-09-07 18:29:40'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 6, '2022-09-07 18:29:41'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 7, '2022-09-07 18:32:42'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 6, '2022-09-08 16:26:16'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 8, '2022-09-09 19:31:08'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 17, '2022-09-10 15:52:49'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 17, '2022-09-10 17:04:45'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 17, '2022-09-10 17:16:49'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 2, '2022-09-10 17:16:56'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 25, '2022-09-10 17:33:16');

-- --------------------------------------------------------

--
-- Table structure for table `estimates`
--

CREATE TABLE `estimates` (
  `LOCATION_KEY` varchar(255) NOT NULL,
  `POPULARITY` int NOT NULL,
  `TIMESTAMP` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `ID` varchar(256) NOT NULL,
  `NAME` varchar(256) NOT NULL,
  `ADDRESS` varchar(255) DEFAULT NULL,
  `populartimes` json DEFAULT NULL,
  `coordinates` json DEFAULT NULL,
  `types` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`ID`, `NAME`, `ADDRESS`, `populartimes`, `coordinates`, `types`) VALUES
('ChIJ4801M5BJXhMRVDTFNJRwztE', 'Grocery Neighbourhood', 'Anthimou 12, Patra', '[{\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 14, 14, 14, 14, 14, 14, 20, 28, 40, 48, 54, 54, 42, 31, 20, 0], \"name\": \"Monday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 2, 5, 11, 14, 17, 14, 17, 17, 20, 22, 25, 25, 22, 20, 17, 0], \"name\": \"Tuesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 14, 17, 17, 14, 11, 11, 8, 5, 5, 11, 25, 31, 20, 8, 5, 0], \"name\": \"Wednesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 11, 17, 0, 5, 5, 8, 14, 25, 28, 22, 14, 5, 2, 0], \"name\": \"Thursday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 5, 8, 14, 22, 28, 28, 22, 14, 11, 25, 74, 100, 57, 17, 5, 0], \"name\": \"Friday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 8, 14, 20, 25, 22, 14, 5, 2, 2, 5, 20, 34, 31, 14, 2, 0], \"name\": \"Saturday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 5, 14, 31, 34, 22, 14, 17, 22, 28, 28, 28, 25, 20, 17, 11, 0], \"name\": \"Sunday\"}]', '{\"lat\": 38.26387520000001, \"lng\": 21.7482806}', '[\"grocery_or_supermarket\", \"food\", \"point_of_interest\", \"store\", \"establishment\"]'),
('ChIJc6nu-pBJXhMR8kfqruS6HhY', 'Mega Animal Center', 'Νοταρά και, Amerikis 30-32, Patra', '[{\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 18, 42, 46, 59, 93, 95, 55, 0, 0, 59, 71, 57, 28, 0, 0, 0], \"name\": \"Monday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 18, 32, 48, 65, 71, 67, 53, 0, 0, 55, 77, 61, 24, 0, 0, 0], \"name\": \"Tuesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 36, 65, 55, 67, 97, 71, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Wednesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 22, 38, 55, 71, 77, 71, 55, 0, 0, 63, 81, 55, 18, 0, 0, 0], \"name\": \"Thursday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 26, 40, 51, 53, 51, 51, 53, 0, 0, 59, 63, 57, 38, 0, 0, 0], \"name\": \"Friday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 18, 36, 61, 85, 100, 97, 79, 53, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Saturday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Sunday\"}]', '{\"lat\": 38.2637454, \"lng\": 21.7444398}', '[\"pet_store\", \"point_of_interest\", \"store\", \"establishment\"]'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 'Quattro', 'Notara 37, Patra', '[{\"data\": [0, 0, 0, 0, 0, 0, 0, 3, 0, 6, 12, 21, 24, 21, 15, 9, 9, 27, 48, 39, 15, 0, 0, 0], \"name\": \"Monday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 45, 3, 6, 18, 33, 42, 36, 21, 12, 12, 21, 30, 30, 24, 0, 0, 0], \"name\": \"Tuesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 42, 0, 6, 30, 57, 51, 21, 9, 12, 18, 21, 18, 12, 6, 0, 0, 0], \"name\": \"Wednesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 24, 0, 15, 42, 69, 63, 36, 12, 9, 18, 27, 39, 45, 45, 0, 0, 0], \"name\": \"Thursday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 12, 6, 3, 24, 100, 54, 6, 6, 15, 27, 42, 45, 33, 18, 0, 0, 0], \"name\": \"Friday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 6, 15, 30, 48, 66, 69, 57, 39, 21, 9, 0, 3, 3, 0, 0, 0, 0], \"name\": \"Saturday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Sunday\"}]', '{\"lat\": 38.2645117, \"lng\": 21.7454213}', '[\"cafe\", \"food\", \"point_of_interest\", \"establishment\"]'),
('ChIJEyYBg5lJXhMR6BjkCsAVLqQ', 'ΒΟΥΛΚΑΝΙΖΑΤΕΡ - ΛΑΣΤΙΧΑ ΑΥΤΟΚΙΝΗΤΩΝ - ΠΑΤΡΑ - ΖΑΧΑΡΗΣ ΔΗΜΗΤΡΗΣ', 'Notara 28, Patra', '[{\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 18, 62, 100, 77, 40, 40, 48, 55, 48, 37, 0, 0, 0, 0, 0, 0], \"name\": \"Monday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 29, 62, 85, 88, 77, 74, 55, 29, 18, 29, 40, 25, 0, 0, 0, 0], \"name\": \"Tuesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 48, 62, 66, 62, 51, 37, 22, 11, 0, 0, 0, 0, 0, 0], \"name\": \"Wednesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 11, 33, 55, 62, 59, 66, 66, 59, 44, 33, 29, 25, 0, 0, 0, 0], \"name\": \"Thursday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 3, 25, 66, 85, 66, 55, 62, 66, 59, 44, 25, 14, 0, 0, 0, 0], \"name\": \"Friday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 66, 81, 81, 66, 44, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Saturday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Sunday\"}]', '{\"lat\": 38.2639869, \"lng\": 21.7451622}', '[\"car_repair\", \"point_of_interest\", \"store\", \"establishment\"]'),
('ChIJFU5w76pJXhMRN3QUqgeJI2c', 'Φούρνος \"Ο Ανδρέας\"', 'Anthimou 15, Patra', '[{\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Monday\"}, {\"data\": [0, 0, 0, 0, 0, 13, 0, 36, 45, 50, 45, 36, 36, 36, 31, 22, 13, 0, 18, 22, 0, 0, 0, 0], \"name\": \"Tuesday\"}, {\"data\": [0, 0, 0, 0, 0, 9, 22, 31, 36, 36, 40, 50, 63, 68, 59, 36, 18, 0, 13, 22, 0, 0, 0, 0], \"name\": \"Wednesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Thursday\"}, {\"data\": [0, 0, 0, 0, 0, 9, 13, 22, 27, 36, 40, 45, 50, 50, 45, 36, 27, 27, 31, 31, 0, 0, 0, 0], \"name\": \"Friday\"}, {\"data\": [0, 0, 0, 0, 0, 4, 0, 18, 22, 31, 36, 36, 31, 27, 18, 0, 13, 18, 18, 18, 0, 0, 0, 0], \"name\": \"Saturday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Sunday\"}]', '{\"lat\": 38.26426229999999, \"lng\": 21.7479263}', '[\"bakery\", \"food\", \"point_of_interest\", \"store\", \"establishment\"]'),
('ChIJHdjb7RhJXhMRiOm3tcTyh2s', 'HairMod ΒΡΕΤΤΑΚΟΣ ΠΑΝΑΓΙΩΤΗΣ ΕΙΔΗ ΚΟΜΜΩΤΗΡΙΟΥ ΚΑΙ ΟΝΥΧΟΠΛΑΣΤΙΚΗΣ ΠΑΤΡΑ', 'Ιπποδάμου, HairMod 8, Patra', '[{\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 29, 54, 66, 58, 62, 79, 8, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Monday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 45, 20, 33, 45, 50, 50, 37, 25, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Tuesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 75, 83, 54, 45, 54, 58, 50, 33, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Wednesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 37, 50, 50, 58, 95, 100, 58, 33, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Thursday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 33, 41, 45, 45, 37, 25, 16, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Friday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Saturday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Sunday\"}]', '{\"lat\": 38.2646276, \"lng\": 21.7516076}', '[\"point_of_interest\", \"store\", \"establishment\"]'),
('ChIJk29PI5FJXhMRj16S74PXEL8', 'Kefalas George', 'Notara 26, Patra', '[{\"data\": [0, 0, 0, 0, 0, 5, 16, 80, 75, 25, 33, 33, 22, 16, 16, 16, 19, 19, 19, 19, 16, 16, 13, 0], \"name\": \"Monday\"}, {\"data\": [0, 0, 0, 0, 0, 8, 13, 75, 100, 38, 36, 36, 25, 19, 19, 22, 22, 22, 22, 22, 22, 19, 19, 0], \"name\": \"Tuesday\"}, {\"data\": [0, 0, 0, 0, 0, 16, 41, 61, 61, 41, 27, 27, 36, 36, 27, 19, 16, 22, 27, 30, 27, 16, 8, 0], \"name\": \"Wednesday\"}, {\"data\": [0, 0, 0, 0, 0, 11, 25, 58, 72, 50, 30, 27, 30, 33, 33, 33, 33, 30, 25, 22, 19, 13, 11, 0], \"name\": \"Thursday\"}, {\"data\": [0, 0, 0, 0, 0, 8, 19, 58, 83, 47, 25, 25, 25, 27, 27, 27, 27, 25, 22, 19, 16, 13, 11, 0], \"name\": \"Friday\"}, {\"data\": [0, 0, 0, 0, 0, 5, 13, 33, 50, 55, 52, 55, 58, 50, 38, 27, 27, 27, 27, 22, 13, 8, 2, 0], \"name\": \"Saturday\"}, {\"data\": [0, 0, 0, 0, 0, 2, 0, 13, 30, 52, 69, 66, 47, 30, 22, 19, 19, 19, 19, 16, 13, 11, 8, 0], \"name\": \"Sunday\"}]', '{\"lat\": 38.2640294, \"lng\": 21.7452242}', '[\"cafe\", \"food\", \"point_of_interest\", \"establishment\"]'),
('ChIJKfCLf49JXhMRJ1MiuiTdMdI', 'OFTHALMOLOGIKO ENORASSIS P.C.', 'Nea Ethniki Odos Patron - Athinon 45, Patra', '[{\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 34, 44, 48, 48, 46, 43, 35, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Monday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 29, 34, 37, 44, 48, 43, 30, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Tuesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 46, 35, 50, 81, 100, 93, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Wednesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 29, 26, 21, 30, 54, 56, 30, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Thursday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 26, 44, 63, 81, 91, 89, 79, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Friday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Saturday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Sunday\"}]', '{\"lat\": 38.265395, \"lng\": 21.7525434}', '[\"health\", \"point_of_interest\", \"establishment\"]'),
('ChIJLTINd7ZJXhMRR5fJxLzysh0', 'Metcon 039', 'Nea Ethniki Odos Patron - Athinon 39, Patra', '[{\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 12, 10, 13, 26, 40, 50, 52, 59, 82, 100, 81, 41, 0], \"name\": \"Monday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 8, 12, 21, 33, 39, 39, 45, 67, 84, 69, 34, 0], \"name\": \"Tuesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 17, 17, 13, 19, 31, 39, 40, 43, 59, 77, 76, 52, 0], \"name\": \"Wednesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 9, 9, 9, 13, 18, 21, 22, 39, 72, 91, 69, 32, 0], \"name\": \"Thursday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 10, 11, 12, 17, 24, 27, 24, 32, 66, 92, 67, 25, 0], \"name\": \"Friday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 16, 46, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Saturday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 30, 22, 0, 0, 0], \"name\": \"Sunday\"}]', '{\"lat\": 38.2645408, \"lng\": 21.7521171}', '[\"gym\", \"health\", \"point_of_interest\", \"establishment\"]'),
('ChIJN3zDQI9JXhMRPtX4IsNaXZ8', 'Pediatrician ARGYRO LIOLIOU', 'Panepistimiou 168, Patra', '[{\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 36, 46, 44, 27, 0, 0, 0, 76, 100, 78, 40, 0, 0, 0], \"name\": \"Monday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 17, 36, 48, 36, 0, 0, 0, 59, 74, 68, 42, 0, 0, 0], \"name\": \"Tuesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 21, 42, 55, 38, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Wednesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 19, 40, 40, 21, 0, 0, 0, 61, 65, 65, 48, 0, 0, 0], \"name\": \"Thursday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 14, 21, 21, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Friday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Saturday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Sunday\"}]', '{\"lat\": 38.2639988, \"lng\": 21.7543154}', '[\"doctor\", \"health\", \"point_of_interest\", \"establishment\"]'),
('ChIJnYcKTPZJXhMRr62-I_53jkk', 'Proaúlio', 'Notara 32, Patra', '[{\"data\": [17, 10, 0, 0, 0, 0, 0, 9, 14, 23, 30, 34, 34, 30, 27, 27, 34, 44, 54, 61, 62, 59, 52, 44], \"name\": \"Monday\"}, {\"data\": [35, 26, 0, 0, 0, 0, 0, 15, 23, 33, 42, 46, 44, 39, 37, 38, 45, 54, 63, 69, 70, 66, 59, 49], \"name\": \"Tuesday\"}, {\"data\": [37, 28, 0, 0, 0, 0, 0, 28, 37, 49, 57, 58, 52, 44, 40, 46, 59, 76, 90, 97, 93, 81, 62, 44], \"name\": \"Wednesday\"}, {\"data\": [28, 17, 0, 0, 0, 0, 0, 19, 28, 44, 61, 70, 64, 49, 32, 25, 29, 46, 70, 91, 100, 92, 72, 49], \"name\": \"Thursday\"}, {\"data\": [29, 17, 0, 0, 0, 0, 0, 22, 29, 35, 38, 38, 36, 34, 34, 37, 47, 59, 71, 79, 82, 78, 68, 54], \"name\": \"Friday\"}, {\"data\": [40, 27, 0, 0, 0, 0, 0, 15, 34, 60, 82, 88, 75, 50, 29, 22, 27, 45, 66, 84, 87, 77, 58, 37], \"name\": \"Saturday\"}, {\"data\": [24, 14, 0, 0, 0, 0, 0, 7, 14, 32, 60, 77, 70, 46, 28, 28, 41, 61, 80, 89, 86, 70, 49, 30], \"name\": \"Sunday\"}]', '{\"lat\": 38.2643078, \"lng\": 21.7453617}', '[\"cafe\", \"bar\", \"restaurant\", \"food\", \"point_of_interest\", \"store\", \"establishment\"]'),
('ChIJQ_ezeI9JXhMRRS4WbeyX-M8', 'ΗΛΙΑΣ & ΑΝΔΡΕΑΣ ΖΗΣΙΜΟΠΟΥΛΟΣ Ο.Ε.', 'Nea Ethniki Odos Patron - Athinon 41, Patra', '[{\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 22, 33, 50, 61, 72, 72, 50, 22, 5, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Monday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 16, 33, 44, 50, 38, 33, 50, 44, 11, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Tuesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 83, 88, 44, 66, 61, 50, 55, 61, 38, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Wednesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 11, 38, 61, 44, 44, 44, 44, 33, 16, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Thursday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 11, 44, 100, 100, 66, 50, 38, 22, 5, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Friday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 16, 38, 50, 61, 66, 44, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Saturday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Sunday\"}]', '{\"lat\": 38.2651496, \"lng\": 21.7525917}', '[\"store\", \"point_of_interest\", \"establishment\"]'),
('ChIJQQ--SyhJXhMRGmywk1Q8_zM', 'auto belexas', 'ΝΕΑ ΕΘΝΙΚΗ ΟΔΟ, Nea Ethniki Odos Patron - Athinon 35, Patra', '[{\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 73, 55, 61, 73, 64, 41, 20, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Monday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 61, 58, 64, 67, 52, 29, 11, 2, 0, 64, 91, 2, 0, 0, 0], \"name\": \"Tuesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 70, 91, 85, 91, 88, 58, 26, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Wednesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 67, 76, 79, 97, 91, 52, 20, 14, 38, 64, 47, 14, 0, 0, 0], \"name\": \"Thursday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 85, 100, 94, 61, 23, 5, 2, 14, 32, 41, 26, 0, 0, 0], \"name\": \"Friday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 70, 91, 85, 52, 23, 5, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Saturday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Sunday\"}]', '{\"lat\": 38.2644077, \"lng\": 21.7519934}', '[\"car_dealer\", \"point_of_interest\", \"store\", \"establishment\"]'),
('ChIJwavW8JBJXhMRj9HvUUVbQzU', 'Zacherino', 'Notara 42, Patra', '[{\"data\": [0, 0, 0, 0, 0, 0, 0, 6, 10, 17, 26, 35, 39, 38, 33, 26, 21, 24, 28, 28, 21, 11, 5, 2], \"name\": \"Monday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 4, 6, 11, 20, 32, 39, 37, 27, 18, 20, 36, 57, 59, 38, 17, 6, 3], \"name\": \"Tuesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 9, 17, 27, 40, 50, 55, 54, 45, 36, 30, 29, 31, 32, 29, 23, 14, 7], \"name\": \"Wednesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 8, 13, 21, 30, 39, 44, 45, 41, 34, 27, 23, 27, 35, 36, 28, 16, 6], \"name\": \"Thursday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 5, 13, 20, 25, 35, 46, 45, 34, 30, 36, 45, 49, 45, 35, 23, 13, 6], \"name\": \"Friday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 11, 27, 54, 82, 100, 95, 73, 47, 30, 24, 27, 32, 34, 30, 22, 15, 9], \"name\": \"Saturday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 3, 7, 11, 17, 23, 27, 29, 30, 30, 29, 28, 27, 26, 22, 18, 13, 9], \"name\": \"Sunday\"}]', '{\"lat\": 38.2647829, \"lng\": 21.7461253}', '[\"food\", \"point_of_interest\", \"store\", \"establishment\"]'),
('ChIJWZiFJhA2XhMRCplj2lQ8oA8', 'DIAMOND CARS ΟΕ', 'Nea Ethniki Odos Patron - Athinon 41, Patra', '[{\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 61, 88, 61, 94, 100, 50, 11, 5, 27, 72, 77, 27, 5, 0, 0], \"name\": \"Monday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 50, 55, 50, 44, 0, 0, 0, 16, 38, 55, 38, 0, 0, 0], \"name\": \"Tuesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 72, 77, 83, 77, 50, 22, 22, 38, 55, 44, 16, 5, 0, 0], \"name\": \"Wednesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 61, 77, 94, 0, 0, 0, 38, 50, 44, 27, 0, 0, 0], \"name\": \"Thursday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 55, 77, 72, 44, 0, 0, 0, 22, 38, 38, 16, 0, 0, 0], \"name\": \"Friday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Saturday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Sunday\"}]', '{\"lat\": 38.2651496, \"lng\": 21.7525917}', '[\"car_dealer\", \"point_of_interest\", \"store\", \"establishment\"]'),
('ChIJX6AJbHJJXhMRqardzwDYNhk', 'lma service', 'Tirteou 29, Patra', '[{\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 22, 44, 66, 81, 74, 51, 33, 25, 25, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Monday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 18, 70, 18, 33, 37, 29, 14, 7, 7, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Tuesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 29, 44, 59, 70, 66, 55, 40, 25, 14, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Wednesday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 40, 70, 85, 85, 77, 74, 66, 55, 37, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Thursday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 29, 66, 85, 51, 25, 40, 59, 33, 11, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Friday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 18, 33, 40, 81, 100, 62, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Saturday\"}, {\"data\": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], \"name\": \"Sunday\"}]', '{\"lat\": 38.2641457, \"lng\": 21.7512355}', '[\"car_repair\", \"point_of_interest\", \"establishment\"]');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`) VALUES
(1, NULL, 'wepzebke@gmail.com', '$2a$10$sbItS16baJ7y.TQLqN4QtuyLIU/4IYdIUh82z81s.kYNDQaCeEtVe'),
(2, NULL, 'cupliwen@gmail.com', '$2a$10$boUZ4e62yRV3yXijlIeHL.4llubi2cjGXHpM/AoUkqKfGClq3Ojgu'),
(3, NULL, 'zeh@gmail.com', '$2a$10$UGECkWzik0gf.CcBBc0FLe2kLngG9xuKmn./3I0yaEWwXoyY.uib2'),
(4, NULL, 'mucog@gmail.com', '$2a$10$xJx1ISmQtcLLuELgK9La7OP8uuI9w7pM0.4hnLDJYEMwSQmyOtnde'),
(5, NULL, 'cek@gmail.com', '$2a$10$Xn/elF1zN89Jkgz.6CgY9e/2zqMU844QnTTKmMHrj5NMVuund1/kq'),
(6, NULL, 'erutiwoj@gmail.com', '$2a$10$znSIx92FvhwML9EC3F8JXOOf6/BCgHnvpbpxgA5sh96cXc77wg8bu'),
(7, NULL, 'kit@gmail.com', '$2a$10$mc0TwFbDAutgmspDKYAq0u2GT/K.ZrWrpe/mmbj4ZcGxgyI8NOJNS'),
(8, NULL, 'oreru@gmail.com', '$2a$10$fNHG0Wxi9JqsdhOwg09o7uc0lrocvHTOuq1cPJAG7RHTspE4qvJwi'),
(9, NULL, 'roluwcac@gmail.com', '$2a$10$AFCgvzPS06N9O.OlNiKz4e6v04Bda.p7wHuwy/BRA9gia3J5V8lMe'),
(10, NULL, 'gevnovpim@gmail.com', '$2a$10$No2b3/pOEi6Ckpkq2/bwMOEi/ZED4Mi9JJ4HX9pfxQNHX2/JYJsaK'),
(11, NULL, 'ofga@gmail.com', '$2a$10$3/zE2LZ3d7qWBHwgtVwDIOWPhEsbn6.M9gvMynSQbKLwYzw08oGnu'),
(12, NULL, 'wep@gmail.com', '$2a$10$OpSgbfNdfhm4MMeDhaaha.9iecS/m3etkZTAeSukhnboyMrRXo5hm'),
(13, NULL, 'sohawo@gmail.com', '$2a$10$6BQwOqba.sRvYqyUTxX2q.2B5PmrX9YXuDhUZ89MvXryxHCi93Ef.'),
(14, NULL, 'tajoor@gmail.com', '$2a$10$r4ErV98MVXGpkS9Ybud77umYQXnGvDAVxyVVFb8lbI7NXcMLJRlgO'),
(15, NULL, 'etucow@gmail.com', '$2a$10$j1up0kA0XiWoe2dkfdM/POFx2K25rdzSVMjc1okWf1A.VuvEYTpZi'),
(16, NULL, 'osole@gmail.com', '$2a$10$tL.rQnkcnzCoQdfrCxOLRuEZruzlZuSSpYHqQNXmJ3UIe8yuI/NW.'),
(17, NULL, 'lufvoj@gmail.com', '$2a$10$RD1yxocmcE.Olt0xclIT7.C1fwDmJLxaIBrXojAoQnzxIXvO2u9EW'),
(18, NULL, 'te@gmail.com', '$2a$10$MJ77IeVVIkZucz9KxYg0LONGK9nkmfCUTZt5wyS0cPUFBEpETZt.C'),
(19, NULL, 'ikzilvo@gmail.com', '$2a$10$ZgCMgAp8gVOj.Xlh3GDgv.t8iUnHN1n.HOfLNvycP2nquS.JaY5Ea'),
(20, NULL, 't2@gmail.com', '$2b$10$8wWfCPUAgG3CooR0KR2EneqPdDqQEpIpSj831KN4F0h2o69E/v/wq');

-- --------------------------------------------------------

--
-- Table structure for table `visits`
--

CREATE TABLE `visits` (
  `USER_ID` int NOT NULL,
  `LOCATION_ID` varchar(255) NOT NULL,
  `TIMESTAMP` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `visits`
--

INSERT INTO `visits` (`USER_ID`, `LOCATION_ID`, `TIMESTAMP`) VALUES
(3, 'ChIJc6nu-pBJXhMR8kfqruS6HhY', '2022-09-10 17:04:20'),
(20, 'ChIJebC_45BJXhMRZmLKwgG5gaQ', '2022-09-10 17:04:45'),
(20, 'ChIJebC_45BJXhMRZmLKwgG5gaQ', '2022-09-10 17:16:49'),
(20, 'ChIJebC_45BJXhMRZmLKwgG5gaQ', '2022-09-10 17:16:56'),
(20, 'ChIJebC_45BJXhMRZmLKwgG5gaQ', '2022-09-10 17:33:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `busyness`
--
ALTER TABLE `busyness`
  ADD PRIMARY KEY (`LOCATION_ID`,`timestamp`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `visits`
--
ALTER TABLE `visits`
  ADD KEY `user_id` (`USER_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `visits`
--
ALTER TABLE `visits`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
