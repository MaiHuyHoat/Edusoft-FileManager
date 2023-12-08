-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 08, 2023 lúc 03:13 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `edusoft_filemanager`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `file`
--

CREATE TABLE `file` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `path` text DEFAULT NULL,
  `size` double DEFAULT NULL,
  `folder_id` int(11) NOT NULL,
  `file_category_id` int(11) DEFAULT NULL,
  `user_id` int(100) NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `file`
--

INSERT INTO `file` (`id`, `name`, `path`, `size`, `folder_id`, `file_category_id`, `user_id`, `created`, `updated`, `deleted`) VALUES
(1, 'Java core 1', 'F:\\Edusoft\\FileManager\\storage\\nmhuy86\\B1\\CoreJava 1.doc', 100, 2, 1, 1, '2023-11-06 01:30:13', '2023-11-06 01:30:13', 0),
(2, 'Java core 2', 'F:\\Edusoft\\FileManager\\storage\\nmhuy86\\B1\\CoreJava 2.doc', 100, 2, 1, 1, '2023-11-06 01:31:31', '2023-11-06 01:31:31', 0),
(3, 'Java core 3', 'F:\\Edusoft\\FileManager\\storage\\nmhuy86\\B1\\CoreJava 3.doc', 100, 2, 1, 1, '2023-11-06 01:32:19', '2023-11-06 01:32:19', 0),
(4, 'bài tập tự làm ', 'F:\\Edusoft\\FileManager\\storage\\nmhuy86\\B1\\B2\\bai tap.docx', 50, 4, 1, 1, '2023-11-06 01:33:53', '2023-11-06 01:33:53', 0),
(5, 'link android', 'F:\\Edusoft\\FileManager\\storage\\nmhuy86\\C2\\link android.txt', 5, 3, 2, 1, '2023-11-06 01:36:02', '2023-11-06 01:36:02', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `file_category`
--

CREATE TABLE `file_category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `file_category`
--

INSERT INTO `file_category` (`id`, `name`, `image`) VALUES
(1, 'Word', './public/img/icon/word.svg'),
(2, 'Text', './public/img/icon/txt.svg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `folder`
--

CREATE TABLE `folder` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `path` text DEFAULT NULL,
  `size` double DEFAULT 0,
  `user_id` int(100) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `folder`
--

INSERT INTO `folder` (`id`, `name`, `path`, `size`, `user_id`, `parent_id`, `created`, `updated`, `deleted`) VALUES
(1, 'nmhuy86', 'F:\\Edusoft\\FileManager\\storage\\nmhuy86', 200, 1, NULL, '2023-11-06 01:23:33', '2023-11-06 01:23:33', 0),
(2, 'Java', 'F:\\Edusoft\\FileManager\\storage\\nmhuy86\\B1', 200, 1, 1, '2023-11-06 01:24:08', '2023-11-06 01:24:08', 0),
(3, 'Lập trình hướng đối tượng', 'F:\\Edusoft\\FileManager\\storage\\nmhuy86\\C2', 10, 1, 1, '2023-11-06 01:25:06', '2023-11-06 01:25:06', 0),
(4, 'Bài tập tự làm', 'F:\\Edusoft\\FileManager\\storage\\nmhuy86\\B1\\B2', 234, 1, 2, '2023-11-06 01:26:34', '2023-11-06 01:26:34', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `package`
--

CREATE TABLE `package` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `storage_limit` double DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `package`
--

INSERT INTO `package` (`id`, `name`, `storage_limit`, `price`, `description`) VALUES
(1, 'Người dùng phổ thông', 1024, 0, 'Đơn vị :MB=> (1GB)');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `share_file`
--

CREATE TABLE `share_file` (
  `id` int(11) NOT NULL,
  `file_id` int(11) DEFAULT NULL,
  `user_id` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `share_file`
--

INSERT INTO `share_file` (`id`, `file_id`, `user_id`) VALUES
(1, 5, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `memory_used` double NOT NULL,
  `package_id` int(11) NOT NULL DEFAULT 1,
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `name`, `memory_used`, `package_id`, `created`, `updated`, `deleted`) VALUES
(1, 'nmhuy', 1024, 1, '2023-11-06 01:19:47', '2023-11-06 01:19:47', 0),
(2, 'hoatdfk', 100, 1, '2023-11-06 01:37:08', '2023-11-06 01:37:08', 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `file_category_id` (`file_category_id`),
  ADD KEY `folder_id` (`folder_id`);

--
-- Chỉ mục cho bảng `file_category`
--
ALTER TABLE `file_category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `folder`
--
ALTER TABLE `folder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `package`
--
ALTER TABLE `package`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `share_file`
--
ALTER TABLE `share_file`
  ADD PRIMARY KEY (`id`),
  ADD KEY `file_id` (`file_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `package_id` (`package_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `file`
--
ALTER TABLE `file`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `file_category`
--
ALTER TABLE `file_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `folder`
--
ALTER TABLE `folder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `package`
--
ALTER TABLE `package`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `share_file`
--
ALTER TABLE `share_file`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `file`
--
ALTER TABLE `file`
  ADD CONSTRAINT `file_ibfk_2` FOREIGN KEY (`file_category_id`) REFERENCES `file_category` (`id`),
  ADD CONSTRAINT `file_ibfk_3` FOREIGN KEY (`folder_id`) REFERENCES `folder` (`id`);

--
-- Các ràng buộc cho bảng `folder`
--
ALTER TABLE `folder`
  ADD CONSTRAINT `folder_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `share_file`
--
ALTER TABLE `share_file`
  ADD CONSTRAINT `share_file_ibfk_1` FOREIGN KEY (`file_id`) REFERENCES `file` (`id`),
  ADD CONSTRAINT `share_file_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`package_id`) REFERENCES `package` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
