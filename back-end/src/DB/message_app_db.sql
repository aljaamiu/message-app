-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2022 at 11:45 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `message_app_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `blocked`
--

CREATE TABLE `blocked` (
  `id` int(11) NOT NULL,
  `blocker_user_id` int(11) DEFAULT NULL,
  `blocked_user_id` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `from_user_id` int(11) DEFAULT NULL,
  `to_user_id` int(11) DEFAULT NULL,
  `chat_id` int(11) DEFAULT NULL,
  `msg` text DEFAULT NULL,
  `status` tinyint(4) DEFAULT 0,
  `message_type` tinyint(4) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `from_user_id`, `to_user_id`, `chat_id`, `msg`, `status`, `message_type`, `created_at`, `updated_at`, `deleted_at`) VALUES
(62, 2, 1, NULL, 'hi', 0, 1, '2022-11-20 07:20:34', '2022-11-20 07:20:34', NULL),
(63, 1, 2, NULL, 'hello', 0, 1, '2022-11-20 07:20:47', '2022-11-20 07:20:47', NULL),
(64, 2, 1, NULL, 'how you', 0, 1, '2022-11-20 07:21:17', '2022-11-20 07:21:17', NULL),
(65, 2, 1, NULL, 'are you there', 0, 1, '2022-11-20 07:29:33', '2022-11-20 07:29:33', NULL),
(66, 1, 2, NULL, 'yes', 0, 1, '2022-11-20 07:34:59', '2022-11-20 07:34:59', NULL),
(67, 2, 1, NULL, 'is 2 okay', 0, 1, '2022-11-20 07:56:59', '2022-11-20 07:56:59', NULL),
(68, 1, 2, NULL, 'okay fine', 0, 1, '2022-11-20 08:00:45', '2022-11-20 08:00:45', NULL),
(69, 2, 1, NULL, 'good', 0, 1, '2022-11-20 08:06:24', '2022-11-20 08:06:24', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `status` tinyint(4) DEFAULT 0,
  `token` text DEFAULT NULL,
  `password` varchar(191) DEFAULT NULL,
  `pic` varchar(191) DEFAULT NULL,
  `last_seen` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `status`, `token`, `password`, `pic`, `last_seen`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Yakubu Emjay', 'admin@gmail.com', 0, '', '$2a$10$2.Wn1/nYMrT9s2KaCTTjceq9XDTjBt.ojcQGooQVeIRB42liYP6PW', NULL, NULL, '2022-11-13 13:29:06', '2022-11-13 13:29:06', NULL),
(2, 'Yakubu Emjay', 'emjay@gmail.com', 0, NULL, '$2a$10$iZ1ZkmxvZ5sSpf/oo/P0v.OEwd4IG/7Hz9U6BS.Y4G70t1oJFQis6', NULL, NULL, '2022-11-13 14:34:24', '2022-11-13 14:34:24', NULL),
(5, 'emjay aisha', 'aisha@gmail.com', 0, NULL, '$2a$10$mTwmI7PWWXoYq02HzZ8iKuVcFOOuW4VSxvN50dtOouOzCF1CYgoTO', NULL, NULL, '2022-11-17 04:00:18', '2022-11-17 04:00:18', NULL),
(6, 'Jamiu Yakubu', 'jamiu@gmail.com', 1, NULL, '$2a$10$eswZvr5Rv/wJpuuruMX9p.sWuisBknpQqfXpk16UOI3gTcV2EhvKa', NULL, NULL, '2022-11-17 19:53:15', '2022-11-17 19:53:15', NULL),
(7, 'Muhammed- Jay', 'jay@gmail.com', 1, NULL, '$2a$10$.omPMjuVregNopdlT.eZpe1yC0EcFYB8Ivlfp3N.va4N61/YWh7oO', NULL, NULL, '2022-11-18 01:15:10', '2022-11-18 01:15:10', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blocked`
--
ALTER TABLE `blocked`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blocked`
--
ALTER TABLE `blocked`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
