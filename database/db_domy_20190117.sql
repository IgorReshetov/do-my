-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Янв 17 2019 г., 21:07
-- Версия сервера: 10.1.32-MariaDB
-- Версия PHP: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `db_domy`
--

DELIMITER $$
--
-- Процедуры
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_list` ()  BEGIN
  select * from USR_LOGIN;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `spr_answer`
--

CREATE TABLE `spr_answer` (
  `ID` int(11) NOT NULL,
  `ID_GROUP` int(11) NOT NULL,
  `ANSWER` varchar(1024) NOT NULL,
  `INFO` varchar(1024) DEFAULT NULL COMMENT 'доп.инфо к ответу',
  `DT_INSERTED` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DT_MODIFIED` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `spr_answer`
--

INSERT INTO `spr_answer` (`ID`, `ID_GROUP`, `ANSWER`, `INFO`, `DT_INSERTED`, `DT_MODIFIED`) VALUES
(1, 1, 'район', NULL, '2019-01-16 23:48:24', '0000-00-00 00:00:00'),
(2, 1, 'цена', NULL, '2019-01-16 23:48:34', '0000-00-00 00:00:00'),
(3, 1, 'наличие объектов инфраструктуры (школ, больниц, садов)', NULL, '2019-01-16 23:49:04', '0000-00-00 00:00:00'),
(4, 1, 'экология', NULL, '2019-01-16 23:49:44', '2019-01-17 00:02:17'),
(5, 1, 'да', NULL, '2019-01-17 00:07:24', NULL),
(6, 1, 'нет', NULL, '2019-01-17 00:07:37', NULL),
(7, 1, '5-7 млн', NULL, '2019-01-17 00:15:33', NULL),
(8, 1, '7-10 млн', NULL, '2019-01-17 00:15:52', NULL),
(9, 1, '10-15 млн', NULL, '2019-01-17 00:16:10', NULL),
(10, 1, '15-20 млн', NULL, '2019-01-17 00:16:24', NULL),
(11, 1, 'от 20 млн', NULL, '2019-01-17 00:16:43', NULL),
(12, 1, 'да, это освободит меня от \"бумажных\" хлопот и снимет риски', NULL, '2019-01-17 22:50:15', NULL),
(13, 1, 'нет, я подкован и в состоянии самостоятельно совершить сделку', NULL, '2019-01-17 22:50:37', NULL),
(14, 1, 'до 1 месяца', NULL, '2019-01-17 22:51:37', NULL),
(15, 1, '1-3 месяца', NULL, '2019-01-17 22:51:57', NULL),
(16, 1, '3-6 месяцев', NULL, '2019-01-17 22:52:26', NULL),
(17, 1, 'от полугода до года', NULL, '2019-01-17 22:52:36', NULL),
(18, 1, 'свыше года', NULL, '2019-01-17 22:53:00', NULL),
(19, 1, 'введите ответ', NULL, '2019-01-17 22:57:42', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `spr_answer_group`
--

CREATE TABLE `spr_answer_group` (
  `ID` int(11) NOT NULL,
  `GROUP_NAME` varchar(256) NOT NULL,
  `DT_INSERTED` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DT_MODIFIED` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `spr_answer_group`
--

INSERT INTO `spr_answer_group` (`ID`, `GROUP_NAME`, `DT_INSERTED`, `DT_MODIFIED`) VALUES
(1, 'Общие', '2019-01-16 22:49:13', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `spr_answer_question`
--

CREATE TABLE `spr_answer_question` (
  `ID_QUESTION` int(11) NOT NULL,
  `ID_ANSWER` int(11) NOT NULL,
  `IS_HAVE_COMMENT` smallint(6) NOT NULL DEFAULT '0' COMMENT 'есть комментарий',
  `IS_MUST_COMMENT` smallint(6) NOT NULL DEFAULT '0' COMMENT 'комментарий обязателен для заполнения',
  `IS_HAVE_SCALE` smallint(6) DEFAULT '0' COMMENT 'есть шкала оценки',
  `SCALE_MIN` smallint(6) DEFAULT NULL COMMENT 'минимальное значение шкалы',
  `SCALE_MAX` smallint(6) DEFAULT NULL COMMENT 'максимальное значение',
  `SHOW_INDEX` smallint(6) DEFAULT NULL COMMENT 'порядок сортировки при визуалке',
  `DT_INSERTED` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DT_MODIFIED` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `spr_answer_question`
--

INSERT INTO `spr_answer_question` (`ID_QUESTION`, `ID_ANSWER`, `IS_HAVE_COMMENT`, `IS_MUST_COMMENT`, `IS_HAVE_SCALE`, `SCALE_MIN`, `SCALE_MAX`, `SHOW_INDEX`, `DT_INSERTED`, `DT_MODIFIED`) VALUES
(1, 1, 0, 0, 1, 1, 10, 1, '2019-01-17 00:03:04', '2019-01-17 00:13:57'),
(1, 2, 0, 0, 1, 1, 10, 2, '2019-01-17 00:03:32', '2019-01-17 00:13:59'),
(1, 3, 0, 0, 1, 1, 10, 3, '2019-01-17 00:04:05', '2019-01-17 00:14:02'),
(1, 4, 0, 0, 1, 1, 10, 4, '2019-01-17 00:04:27', '2019-01-17 00:14:04'),
(2, 5, 0, 0, 0, NULL, NULL, 1, '2019-01-17 00:11:54', '2019-01-17 00:14:06'),
(2, 6, 0, 0, 0, NULL, NULL, 2, '2019-01-17 00:12:16', '2019-01-17 00:14:08'),
(3, 7, 0, 0, 0, NULL, NULL, 1, '2019-01-17 00:17:26', '2019-01-17 00:18:11'),
(3, 8, 0, 0, 0, NULL, NULL, 2, '2019-01-17 00:17:33', '2019-01-17 00:18:13'),
(3, 9, 0, 0, 0, NULL, NULL, 3, '2019-01-17 00:17:43', '2019-01-17 00:18:16'),
(3, 10, 0, 0, 0, NULL, NULL, 4, '2019-01-17 00:17:52', '2019-01-17 00:18:17'),
(3, 11, 0, 0, 0, NULL, NULL, 5, '2019-01-17 00:17:58', '2019-01-17 00:18:19'),
(4, 5, 0, 0, 0, NULL, NULL, 1, '2019-01-17 00:25:25', '2019-01-17 00:25:52'),
(4, 6, 0, 0, 0, NULL, NULL, 2, '2019-01-17 00:25:45', '2019-01-17 00:25:57'),
(5, 12, 0, 0, 0, NULL, NULL, 1, '2019-01-17 22:50:57', NULL),
(5, 13, 0, 0, 0, NULL, NULL, 2, '2019-01-17 22:51:11', NULL),
(6, 14, 0, 0, 0, NULL, NULL, 1, '2019-01-17 22:53:27', '2019-01-17 22:54:18'),
(6, 15, 0, 0, 0, NULL, NULL, 2, '2019-01-17 22:53:37', '2019-01-17 22:54:20'),
(6, 16, 0, 0, 0, NULL, NULL, 3, '2019-01-17 22:53:48', '2019-01-17 22:54:21'),
(6, 17, 0, 0, 0, NULL, NULL, 4, '2019-01-17 22:54:04', '2019-01-17 22:54:22'),
(6, 18, 0, 0, 0, NULL, NULL, 5, '2019-01-17 22:54:10', '2019-01-17 22:54:23'),
(7, 19, 1, 0, 0, NULL, NULL, NULL, '2019-01-17 22:57:52', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `spr_question`
--

CREATE TABLE `spr_question` (
  `ID` int(11) NOT NULL,
  `ID_GROUP` int(11) NOT NULL,
  `QUESTION` varchar(2000) NOT NULL,
  `INFO` varchar(1024) DEFAULT NULL COMMENT 'доп.инфо к вопросу',
  `IS_MUST_HAVE_ANSWER` smallint(6) NOT NULL DEFAULT '0' COMMENT 'обязательный ответ',
  `IS_MULTI_ANSWER` smallint(6) NOT NULL DEFAULT '0' COMMENT 'множественный ответ',
  `DT_INSERT` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DT_MODIFIED` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `spr_question`
--

INSERT INTO `spr_question` (`ID`, `ID_GROUP`, `QUESTION`, `INFO`, `IS_MUST_HAVE_ANSWER`, `IS_MULTI_ANSWER`, `DT_INSERT`, `DT_MODIFIED`) VALUES
(1, 1, 'Что для вас важно при выборе квартиры (поставьте балл от 1 до 10)?', NULL, 0, 1, '2019-01-16 22:32:34', '0000-00-00 00:00:00'),
(2, 1, 'Важен ли фактор близости к работе?', NULL, 0, 0, '2019-01-16 23:11:46', '0000-00-00 00:00:00'),
(3, 1, 'За какую сумму вы планируете приобрести квартиру?', NULL, 0, 0, '2019-01-16 23:12:48', '0000-00-00 00:00:00'),
(4, 1, 'Нуждаетесь ли вы в привлечении ипотечного кредита?', NULL, 0, 0, '2019-01-16 23:14:26', '0000-00-00 00:00:00'),
(5, 1, 'Важно ли для вас сопровождение риэлтора?', NULL, 0, 0, '2019-01-16 23:15:13', '0000-00-00 00:00:00'),
(6, 1, 'Какое максимальное время вы готовы уделить поиску квартиры?', NULL, 0, 0, '2019-01-16 23:15:51', '2019-01-17 22:49:01'),
(7, 1, 'Какие еще требования вы предъявляете к квартире?', NULL, 0, 0, '2019-01-17 22:55:05', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `spr_question_group`
--

CREATE TABLE `spr_question_group` (
  `ID` int(11) NOT NULL,
  `GROUP_NAME` varchar(256) NOT NULL,
  `DT_INSERT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DT_MODIFIED` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `spr_question_group`
--

INSERT INTO `spr_question_group` (`ID`, `GROUP_NAME`, `DT_INSERT`, `DT_MODIFIED`) VALUES
(1, 'Общие', '2019-01-16 19:28:52', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `spr_question_tree`
--

CREATE TABLE `spr_question_tree` (
  `ID_TREE` int(11) NOT NULL,
  `ID_PARENT` int(11) NOT NULL,
  `ID_CHILD` int(11) NOT NULL,
  `ID_ASWER_BRANCH` int(11) DEFAULT NULL COMMENT 'id выбранного ответа по которому попадаем в эту ветку вопросов',
  `DT_INSERTED` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DT_MODIFIED` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `spr_question_tree`
--

INSERT INTO `spr_question_tree` (`ID_TREE`, `ID_PARENT`, `ID_CHILD`, `ID_ASWER_BRANCH`, `DT_INSERTED`, `DT_MODIFIED`) VALUES
(1, 1, 2, NULL, '2019-01-16 23:19:36', '0000-00-00 00:00:00'),
(1, 2, 3, NULL, '2019-01-16 23:20:01', '0000-00-00 00:00:00'),
(1, 3, 4, NULL, '2019-01-16 23:20:15', '0000-00-00 00:00:00'),
(1, 4, 5, NULL, '2019-01-16 23:20:31', '0000-00-00 00:00:00'),
(1, 5, 6, NULL, '2019-01-16 23:20:39', '0000-00-00 00:00:00'),
(1, 6, 7, NULL, '2019-01-17 23:04:27', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `spr_tree`
--

CREATE TABLE `spr_tree` (
  `ID` int(11) NOT NULL,
  `TREE_NAME` varchar(256) NOT NULL,
  `DT_INSERTED` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DT_MODIFIED` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `spr_tree`
--

INSERT INTO `spr_tree` (`ID`, `TREE_NAME`, `DT_INSERTED`, `DT_MODIFIED`) VALUES
(1, 'Основное', '2019-01-16 23:16:39', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `usr_answer`
--

CREATE TABLE `usr_answer` (
  `ID` int(11) NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `ID_QUESTION` int(11) NOT NULL,
  `ID_ANSWER` int(11) NOT NULL,
  `COMMENT` varchar(1024) DEFAULT NULL,
  `SCALE_VALUE` smallint(6) DEFAULT NULL COMMENT 'значение шкалы',
  `DT_INSERTED` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DT_MODIFIED` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `usr_answer`
--

INSERT INTO `usr_answer` (`ID`, `ID_USER`, `ID_QUESTION`, `ID_ANSWER`, `COMMENT`, `SCALE_VALUE`, `DT_INSERTED`, `DT_MODIFIED`) VALUES
(1, 1, 1, 3, NULL, 5, '2019-01-17 00:23:40', NULL),
(2, 1, 2, 6, NULL, NULL, '2019-01-17 00:24:07', NULL),
(3, 1, 7, 19, 'высокие потолки', NULL, '2019-01-17 22:59:16', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `usr_login`
--

CREATE TABLE `usr_login` (
  `ID` int(11) NOT NULL,
  `USER_ID` varchar(255) DEFAULT NULL COMMENT 'технический идентифкатор неавторизованного юзера',
  `LOGIN` varchar(255) DEFAULT NULL,
  `FIO` varchar(255) DEFAULT NULL,
  `PSW` varchar(255) DEFAULT NULL,
  `LAST_SESSION_ID` int(11) DEFAULT NULL,
  `LAST_SESSION_DT` datetime DEFAULT NULL,
  `LAST_SESSION_DEVICE` varchar(255) DEFAULT NULL,
  `LAST_SESSION_GPS` varchar(255) DEFAULT NULL,
  `DT_INSERTED` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DT_MODIFIED` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `usr_login`
--

INSERT INTO `usr_login` (`ID`, `USER_ID`, `LOGIN`, `FIO`, `PSW`, `LAST_SESSION_ID`, `LAST_SESSION_DT`, `LAST_SESSION_DEVICE`, `LAST_SESSION_GPS`, `DT_INSERTED`, `DT_MODIFIED`) VALUES
(1, NULL, 'user1', NULL, NULL, NULL, NULL, NULL, NULL, '2019-01-17 00:20:50', NULL);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `spr_answer`
--
ALTER TABLE `spr_answer`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IX_ANSWER_GROUP_UNIQ` (`ID_GROUP`,`ANSWER`(255),`DT_MODIFIED`),
  ADD KEY `IX_ANSWER_UNIQ` (`ID_GROUP`,`ANSWER`(255));

--
-- Индексы таблицы `spr_answer_group`
--
ALTER TABLE `spr_answer_group`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `spr_answer_question`
--
ALTER TABLE `spr_answer_question`
  ADD UNIQUE KEY `IX_QUESTION_ANSWER_UNIQ` (`ID_QUESTION`,`ID_ANSWER`),
  ADD KEY `FK_ANSWER` (`ID_ANSWER`),
  ADD KEY `IX_ANSWER_QUESTION` (`ID_QUESTION`,`ID_ANSWER`),
  ADD KEY `IX_SHOW_INDEX` (`SHOW_INDEX`);

--
-- Индексы таблицы `spr_question`
--
ALTER TABLE `spr_question`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `IX_QUESTION_UNIQ` (`ID_GROUP`,`QUESTION`(255));

--
-- Индексы таблицы `spr_question_group`
--
ALTER TABLE `spr_question_group`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `spr_question_tree`
--
ALTER TABLE `spr_question_tree`
  ADD KEY `FK_QUESTION_PARENT` (`ID_PARENT`),
  ADD KEY `FK_QUESTION_CHILD` (`ID_CHILD`),
  ADD KEY `FK_TREE` (`ID_TREE`),
  ADD KEY `FK_ANSWER_BRANCH_ID` (`ID_ASWER_BRANCH`);

--
-- Индексы таблицы `spr_tree`
--
ALTER TABLE `spr_tree`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `usr_answer`
--
ALTER TABLE `usr_answer`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_USER_ID` (`ID_USER`),
  ADD KEY `FK_QUESTION_ID` (`ID_QUESTION`),
  ADD KEY `FK_ANSWER_ID` (`ID_ANSWER`);

--
-- Индексы таблицы `usr_login`
--
ALTER TABLE `usr_login`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `spr_answer`
--
ALTER TABLE `spr_answer`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT для таблицы `spr_answer_group`
--
ALTER TABLE `spr_answer_group`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `spr_question`
--
ALTER TABLE `spr_question`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `spr_question_group`
--
ALTER TABLE `spr_question_group`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `spr_tree`
--
ALTER TABLE `spr_tree`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `usr_answer`
--
ALTER TABLE `usr_answer`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `usr_login`
--
ALTER TABLE `usr_login`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `spr_answer`
--
ALTER TABLE `spr_answer`
  ADD CONSTRAINT `FK_ANSWER_GROUP` FOREIGN KEY (`ID_GROUP`) REFERENCES `spr_answer_group` (`ID`);

--
-- Ограничения внешнего ключа таблицы `spr_answer_question`
--
ALTER TABLE `spr_answer_question`
  ADD CONSTRAINT `FK_ANSWER` FOREIGN KEY (`ID_ANSWER`) REFERENCES `spr_answer` (`ID`),
  ADD CONSTRAINT `FK_QUESTION` FOREIGN KEY (`ID_QUESTION`) REFERENCES `spr_question` (`ID`);

--
-- Ограничения внешнего ключа таблицы `spr_question`
--
ALTER TABLE `spr_question`
  ADD CONSTRAINT `FK_QUESTION_GROUP` FOREIGN KEY (`ID_GROUP`) REFERENCES `spr_question_group` (`ID`);

--
-- Ограничения внешнего ключа таблицы `spr_question_tree`
--
ALTER TABLE `spr_question_tree`
  ADD CONSTRAINT `FK_ANSWER_BRANCH_ID` FOREIGN KEY (`ID_ASWER_BRANCH`) REFERENCES `spr_answer` (`ID`),
  ADD CONSTRAINT `FK_QUESTION_CHILD` FOREIGN KEY (`ID_CHILD`) REFERENCES `spr_question` (`ID`),
  ADD CONSTRAINT `FK_QUESTION_PARENT` FOREIGN KEY (`ID_PARENT`) REFERENCES `spr_question` (`ID`),
  ADD CONSTRAINT `FK_TREE` FOREIGN KEY (`ID_TREE`) REFERENCES `spr_tree` (`ID`);

--
-- Ограничения внешнего ключа таблицы `usr_answer`
--
ALTER TABLE `usr_answer`
  ADD CONSTRAINT `FK_ANSWER_ID` FOREIGN KEY (`ID_ANSWER`) REFERENCES `spr_answer` (`ID`),
  ADD CONSTRAINT `FK_QUESTION_ID` FOREIGN KEY (`ID_QUESTION`) REFERENCES `spr_question` (`ID`),
  ADD CONSTRAINT `FK_USER_ID` FOREIGN KEY (`ID_USER`) REFERENCES `usr_login` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
