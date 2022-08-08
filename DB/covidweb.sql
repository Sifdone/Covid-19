-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Φιλοξενητής: 127.0.0.1
-- Χρόνος δημιουργίας: 08 Αυγ 2022 στις 18:19:10
-- Έκδοση διακομιστή: 10.4.16-MariaDB
-- Έκδοση PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `covidweb`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `busyness`
--

CREATE TABLE `busyness` (
  `LOCATION_ID` varchar(256) NOT NULL,
  `BUSYNESS` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Άδειασμα δεδομένων του πίνακα `busyness`
--

INSERT INTO `busyness` (`LOCATION_ID`, `BUSYNESS`, `timestamp`) VALUES
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 0, '2022-08-02 12:09:58'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 10, '2022-08-08 12:09:58'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 8, '2022-08-08 14:52:31'),
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 9, '2022-08-08 14:52:54');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `estimates`
--

CREATE TABLE `estimates` (
  `LOCATION_KEY` varchar(255) NOT NULL,
  `POPULARITY` int(11) NOT NULL,
  `TIMESTAMP` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `locations`
--

CREATE TABLE `locations` (
  `ID` varchar(256) NOT NULL,
  `NAME` varchar(256) NOT NULL,
  `LATITUDE` float NOT NULL,
  `LONGTITUDE` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Άδειασμα δεδομένων του πίνακα `locations`
--

INSERT INTO `locations` (`ID`, `NAME`, `LATITUDE`, `LONGTITUDE`) VALUES
('ChIJebC_45BJXhMRZmLKwgG5gaQ', 'Quattro', 38.2645, 21.7454),
('Tsir7SdGoCg2XhMRGcnVpa4dU0g', 'Test Location', 38.2658, 21.7559);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Άδειασμα δεδομένων του πίνακα `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`) VALUES
(16, NULL, 'tsiro123@gmail.com', '$2b$10$SNdI1X3OQvfDSI5.QB8D/e55DkLZfiAjtHpaNCu3NTCRPH.qo9alS'),
(17, NULL, 't@gmail.com', '$2b$10$.eZ7xT511GLAUQUTuRdFUu64cVf3itMh5c.K63YUHruqoivXqMMS6');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `visits`
--

CREATE TABLE `visits` (
  `USER_ID` int(11) NOT NULL,
  `LOCATION_ID` varchar(255) NOT NULL,
  `TIMESTAMP` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Άδειασμα δεδομένων του πίνακα `visits`
--

INSERT INTO `visits` (`USER_ID`, `LOCATION_ID`, `TIMESTAMP`) VALUES
(17, 'ChIJebC_45BJXhMRZmLKwgG5gaQ', '2022-08-04 08:07:11'),
(17, 'ChIJebC_45BJXhMRZmLKwgG5gaQ', '2022-08-04 08:18:54'),
(17, 'ChIJebC_45BJXhMRZmLKwgG5gaQ', '2022-08-04 08:19:44'),
(17, 'ChIJebC_45BJXhMRZmLKwgG5gaQ', '2022-08-04 08:20:53'),
(17, 'ChIJebC_45BJXhMRZmLKwgG5gaQ', '2022-08-04 08:43:57'),
(17, 'ChIJebC_45BJXhMRZmLKwgG5gaQ', '2022-08-04 08:47:43'),
(17, 'ChIJebC_45BJXhMRZmLKwgG5gaQ', '2022-08-04 08:54:39'),
(17, 'ChIJebC_45BJXhMRZmLKwgG5gaQ', '2022-08-05 17:31:26'),
(17, 'ChIJebC_45BJXhMRZmLKwgG5gaQ', '2022-08-08 12:09:51'),
(17, 'ChIJebC_45BJXhMRZmLKwgG5gaQ', '2022-08-08 14:52:53');

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `busyness`
--
ALTER TABLE `busyness`
  ADD PRIMARY KEY (`LOCATION_ID`,`timestamp`);

--
-- Ευρετήρια για πίνακα `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`ID`);

--
-- Ευρετήρια για πίνακα `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Ευρετήρια για πίνακα `visits`
--
ALTER TABLE `visits`
  ADD KEY `user_id` (`USER_ID`);

--
-- AUTO_INCREMENT για άχρηστους πίνακες
--

--
-- AUTO_INCREMENT για πίνακα `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Περιορισμοί για άχρηστους πίνακες
--

--
-- Περιορισμοί για πίνακα `visits`
--
ALTER TABLE `visits`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
