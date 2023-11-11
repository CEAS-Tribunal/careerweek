-- phpMyAdmin SQL Dump
-- version 5.2.1deb1+focal2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 11, 2023 at 06:19 PM
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
-- Table structure for table `student_sign_in`
--

CREATE TABLE `student_sign_in` (
  `name` varchar(64) NOT NULL,
  `major` varchar(64) NOT NULL,
  `objective` varchar(64) NOT NULL,
  `id` int UNSIGNED NOT NULL,
  `sign in time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student_sign_in`
--

INSERT INTO `student_sign_in` (`name`, `major`, `objective`, `id`, `sign in time`) VALUES
('Erich Irwin', 'Mechanical Engineering', 'Co-op', 26, '2019-09-24 14:02:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `student_sign_in`
--
ALTER TABLE `student_sign_in`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `student_sign_in`
--
ALTER TABLE `student_sign_in`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2410;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
