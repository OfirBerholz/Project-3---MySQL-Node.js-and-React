-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 10, 2022 at 05:24 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Vacations`
--
CREATE DATABASE IF NOT EXISTS `Vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `Vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userID` int(11) NOT NULL,
  `vacationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userID`, `vacationID`) VALUES
(6, 1),
(6, 6),
(6, 9),
(6, 11),
(6, 12),
(7, 1),
(7, 8),
(7, 9),
(7, 10),
(7, 13);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleID` int(11) NOT NULL,
  `roleName` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleID`, `roleName`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `roleID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `firstName`, `lastName`, `username`, `password`, `roleID`) VALUES
(6, 'Ofir', 'Berholz', 'OfirBerholz', '97bfce78b466c312cf148a56c18a6800a1475d276a3295c0e6dad61e3cd6f95153966ac452cee9be0295066a2c96484c7a76020425405869a4f43a7d475040a5', 1),
(7, 'Itzik', 'Kala', 'ItzikK', '97bfce78b466c312cf148a56c18a6800a1475d276a3295c0e6dad61e3cd6f95153966ac452cee9be0295066a2c96484c7a76020425405869a4f43a7d475040a5', 2),
(9, 'Lisa', 'Simpson', 'LisaS', '2fa54657fec2b2527515d953e86f9aa29eb7d83a2b6307abd298f69b7ab024e943e3954b2f9290b8a3da1197f2f428a126dff1c87ca69cabcee1d3262de9fd88', 2),
(10, 'Homer', 'Simpson', 'HomerS', '97bfce78b466c312cf148a56c18a6800a1475d276a3295c0e6dad61e3cd6f95153966ac452cee9be0295066a2c96484c7a76020425405869a4f43a7d475040a5', 2),
(11, 'Peter', 'Griffin', 'PeterG', '97bfce78b466c312cf148a56c18a6800a1475d276a3295c0e6dad61e3cd6f95153966ac452cee9be0295066a2c96484c7a76020425405869a4f43a7d475040a5', 2),
(12, 'Meg', 'Griffin', 'MegG', '9da5231ba7b3de14043416e962831493d5a98e3f0672457f22ede1c029089c7a0261f50c4d645199603c07c0d88fce5d128ab2d1f40ede3e7db07cb9190a93a7', 2),
(13, 'Stewie', 'Griffin', 'StewieG', '97bfce78b466c312cf148a56c18a6800a1475d276a3295c0e6dad61e3cd6f95153966ac452cee9be0295066a2c96484c7a76020425405869a4f43a7d475040a5', 2),
(15, 'Eric', 'Cartman', 'EricC', '9da5231ba7b3de14043416e962831493d5a98e3f0672457f22ede1c029089c7a0261f50c4d645199603c07c0d88fce5d128ab2d1f40ede3e7db07cb9190a93a7', 2),
(16, 'Admin', 'Admin', 'admin', 'd606bca3b40edb34a4957fa2ef711858c6ab473ba117845de90f12a277eb6ce687ad072c04e90d047e478512955879c55e3f1e5a1ff27b07607a75820b35507d', 1);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationID` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(550) NOT NULL,
  `imageName` varchar(150) NOT NULL,
  `fromDate` date NOT NULL,
  `untilDate` date NOT NULL,
  `price` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationID`, `destination`, `description`, `imageName`, `fromDate`, `untilDate`, `price`) VALUES
(1, 'Japan', 'For picture-perfect pink scenes and picnics, head to Japan for cherry blossom season.', '9267255f-1ca1-4c65-a6b6-ca83ff352ef9.jpeg', '2022-10-30', '2022-11-10', '2200.00'),
(2, 'Paris', 'Romantic vacation in Paris, Take your partner and enjoy the Eiffel Tower', '60208186_303.jpg', '2022-11-14', '2022-11-23', '1540.00'),
(3, 'Australia', 'Want diversity? Get yourself to Australia. The pristine beaches, rugged terrain and bustling coastal cities in the part of the world are the living embodiment of variety.', 'cd6eb49a-2b00-40d6-a255-50db3f7bd0b4.jpeg', '2022-12-20', '2023-01-03', '5320.00'),
(6, 'Rome', 'Rome, Italian Roma, historic city and capital of Roma provincia (province), of Lazio regione (region), and of the country of Italy. Rome is located in the central portion of the Italian peninsula, on the Tiber River about 15 miles (24 km) inland from the Tyrrhenian Sea.', '70ed1dd0-f13e-41d0-98a3-b480d6147c87.jpeg', '2022-10-27', '2022-10-31', '202.00'),
(8, 'New York', 'New York is a city of diversity and dynamism. It is also a city of politics, economy and culture. It is even described as the economic and cultural capital of the world, and New York City is one of the most populous cities in the United States.', 'f4157b61-d035-433b-b715-23815d4d195c.jpeg', '2023-08-06', '2023-08-18', '650.00'),
(9, 'Thailand', 'Located in the heart of mainland Southeast Asia, Thailand is a country of mountains, hills, plains and a long coastline along the Gulf of Thailand (1,875 km) and the Andaman Sea (740 km), not including the coastlines of some 400 islands, most of them in the Andaman Sea.', '4bd7c075-8722-44cf-bd07-1878e4ea8821.jpeg', '2023-04-02', '2023-04-22', '774.00'),
(10, 'Shanghai', 'China is big and diverse\r\nShanghai is China\'s most-populous city, and the municipality is its most-populous urban area. Shanghai was one of the first Chinese ports to be opened to Western trade, and it long dominated the nation\'s commerce.', 'f59c1ac3-e7d0-4753-a475-d48f65b17725.jpeg', '2023-07-02', '2023-07-12', '5433.00'),
(11, 'Amsterdam', 'Amsterdam is one of the greatest small cities in the world. From Amsterdam canals to world-famous Amsterdam museums and historical Amsterdam sights, it is one of the most romantic and beautiful cities in Europe. Canal cruises are a popular way to see the city from the perspective of its canals.', '9770b6d9-a141-4756-bc9f-8081b2c08482.jpeg', '2023-01-11', '2023-01-18', '152.00'),
(12, 'Rio De Janeiro', 'Rio de Janeiro is the second largest city in Brazil, on the South Atlantic coast. Rio is famous for its breathtaking landscape, its laid-back beach culture and its annual carnival. The \"Carioca Landscapes between the Mountain and the Sea\" has been inscribed on the UNESCO World Heritage list.', '27c822d3-ca57-4d1e-a0e0-4f2617a132f0.jpeg', '2023-02-08', '2023-02-22', '990.00'),
(13, 'Los Angeles', 'Los Angeles is known for its Mediterranean climate, ethnic and cultural diversity, Hollywood film industry, and sprawling metropolitan area. The city of Los Angeles lies in a basin in Southern California, adjacent to the Pacific Ocean extending through the Santa Monica Mountains and into the San Fernando Valley.', '81d4a4c1-bc6b-4976-962a-f15fe2d03c60.jpeg', '2023-03-08', '2023-03-24', '990.00'),
(16, 'Berlin', 'Berlin, the capital city of Germany, is renowned for its exceptional range of landmarks, vibrant cultural scene and way of life that\'s somehow all go yet relaxed. In fact, the city is best known for its striking contrasts. Historical buildings stand alongside modern architecture as the past and present intermingle.', '59133615-50e6-4b40-a4f9-74e32bbb1ff3.jpeg', '2022-11-06', '2022-11-16', '293.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userID`,`vacationID`),
  ADD KEY `vacationID` (`vacationID`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`),
  ADD KEY `roleID` (`roleID`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationID`) REFERENCES `vacations` (`vacationID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleID`) REFERENCES `roles` (`roleID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
