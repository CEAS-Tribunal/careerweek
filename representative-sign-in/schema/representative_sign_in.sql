-- phpMyAdmin SQL Dump
-- version 5.2.1deb1+focal2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 11, 2023 at 05:31 PM
-- Server version: 8.0.34-0ubuntu0.20.04.1
-- PHP Version: 7.4.3-4ubuntu2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tribunal_careerfair`
--

-- --------------------------------------------------------

--
-- Table structure for table `representative_sign_in`
--

CREATE TABLE `representative_sign_in` (
  `name` varchar(64) NOT NULL,
  `company` varchar(64) NOT NULL,
  `title` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `id` int UNSIGNED NOT NULL,
  `sign in time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `printed` int DEFAULT NULL,
  `location` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `representative_sign_in`
--

INSERT INTO `representative_sign_in` (`name`, `company`, `title`, `email`, `id`, `sign in time`, `printed`, `location`) VALUES
('Ary Sharma', 'CEAS Tribunal', 'Volunteer', 'sharm3a8@mail.uc.edu', 2, '2019-09-25 11:41:38', 1, 'REC Center');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `representative_sign_in`
--
ALTER TABLE `representative_sign_in`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `representative_sign_in`
--
ALTER TABLE `representative_sign_in`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4869;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
