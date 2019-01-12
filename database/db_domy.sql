-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Янв 12 2019 г., 22:21
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

-- --------------------------------------------------------

--
-- Структура таблицы `spr_answer`
--

CREATE TABLE `spr_answer` (
  `ID` int(11) NOT NULL,
  `ID_GROUP` int(11) NOT NULL,
  `ANSWER` varchar(1024) NOT NULL,
  `DT_INSERTED` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IS_DEL` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `spr_answer_group`
--

CREATE TABLE `spr_answer_group` (
  `ID` int(11) NOT NULL,
  `GROUP_NAME` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `spr_answer_question`
--

CREATE TABLE `spr_answer_question` (
  `ID_QUESTION` int(11) NOT NULL,
  `ID_ANSWER` int(11) NOT NULL,
  `IS_MUST_HAVE` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `spr_question`
--

CREATE TABLE `spr_question` (
  `ID` int(11) NOT NULL,
  `ID_GROUP` int(11) NOT NULL,
  `QUESTION` varchar(2000) NOT NULL,
  `IS_MULTI_ANSWER` smallint(6) NOT NULL,
  `DT_INSERT` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IS_DEL` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `spr_question_group`
--

CREATE TABLE `spr_question_group` (
  `ID` int(11) NOT NULL,
  `GROUP_NAME` varchar(256) NOT NULL,
  `DT_INSERT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IS_DEL` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `spr_question_tree`
--

CREATE TABLE `spr_question_tree` (
  `ID_PARENT` int(11) NOT NULL,
  `ID_CHILD` int(11) NOT NULL,
  `ID_TREE` int(11) NOT NULL,
  `DT_INSERTED` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IS_DEL` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `spr_tree`
--

CREATE TABLE `spr_tree` (
  `ID` int(11) NOT NULL,
  `TREE_NAME` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `usr_answer`
--

CREATE TABLE `usr_answer` (
  `ID` int(11) NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `ID_QUESTION` int(11) NOT NULL,
  `ID_ANSWER` int(11) NOT NULL,
  `COMMENT` varchar(256) NOT NULL,
  `DT_INSERTED` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IS_DEL` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `usr_login`
--

CREATE TABLE `usr_login` (
  `ID` int(11) NOT NULL,
  `LOGIN` varchar(256) NOT NULL,
  `FIO` varchar(256) NOT NULL,
  `PSW` varchar(256) NOT NULL,
  `BIRTHDAY` date NOT NULL,
  `DT_INSERTED` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `IS_DEL` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `spr_answer`
--
ALTER TABLE `spr_answer`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_GROUP_NAME_ANSWER` (`ID_GROUP`);

--
-- Индексы таблицы `spr_answer_group`
--
ALTER TABLE `spr_answer_group`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `spr_answer_question`
--
ALTER TABLE `spr_answer_question`
  ADD KEY `FK_ANSW_SPR` (`ID_ANSWER`),
  ADD KEY `FK_QUEST_SPR` (`ID_QUESTION`);

--
-- Индексы таблицы `spr_question`
--
ALTER TABLE `spr_question`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_GROUP_NAME` (`ID_GROUP`);

--
-- Индексы таблицы `spr_question_group`
--
ALTER TABLE `spr_question_group`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `spr_question_tree`
--
ALTER TABLE `spr_question_tree`
  ADD KEY `FK_TREE_NAME` (`ID_TREE`),
  ADD KEY `FK_PARENT_QUESTION` (`ID_PARENT`),
  ADD KEY `FK_CHILD_QUESTION` (`ID_CHILD`);

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
  ADD KEY `FK_ANSWER_SPR` (`ID_ANSWER`),
  ADD KEY `FK_QUESTION_SPR` (`ID_QUESTION`),
  ADD KEY `FK_USER` (`ID_USER`);

--
-- Индексы таблицы `usr_login`
--
ALTER TABLE `usr_login`
  ADD PRIMARY KEY (`ID`);

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `spr_answer`
--
ALTER TABLE `spr_answer`
  ADD CONSTRAINT `FK_GROUP_NAME_ANSWER` FOREIGN KEY (`ID_GROUP`) REFERENCES `spr_answer_group` (`ID`);

--
-- Ограничения внешнего ключа таблицы `spr_answer_question`
--
ALTER TABLE `spr_answer_question`
  ADD CONSTRAINT `FK_ANSW_SPR` FOREIGN KEY (`ID_ANSWER`) REFERENCES `spr_answer` (`ID`),
  ADD CONSTRAINT `FK_QUEST_SPR` FOREIGN KEY (`ID_QUESTION`) REFERENCES `spr_question` (`ID`);

--
-- Ограничения внешнего ключа таблицы `spr_question`
--
ALTER TABLE `spr_question`
  ADD CONSTRAINT `FK_GROUP_NAME` FOREIGN KEY (`ID_GROUP`) REFERENCES `spr_question_group` (`ID`);

--
-- Ограничения внешнего ключа таблицы `spr_question_tree`
--
ALTER TABLE `spr_question_tree`
  ADD CONSTRAINT `FK_CHILD_QUESTION` FOREIGN KEY (`ID_CHILD`) REFERENCES `spr_question` (`ID`),
  ADD CONSTRAINT `FK_PARENT_QUESTION` FOREIGN KEY (`ID_PARENT`) REFERENCES `spr_question` (`ID`),
  ADD CONSTRAINT `FK_TREE_NAME` FOREIGN KEY (`ID_TREE`) REFERENCES `spr_tree` (`ID`);

--
-- Ограничения внешнего ключа таблицы `usr_answer`
--
ALTER TABLE `usr_answer`
  ADD CONSTRAINT `FK_ANSWER_SPR` FOREIGN KEY (`ID_ANSWER`) REFERENCES `spr_answer` (`ID`),
  ADD CONSTRAINT `FK_QUESTION_SPR` FOREIGN KEY (`ID_QUESTION`) REFERENCES `spr_question` (`ID`),
  ADD CONSTRAINT `FK_USER` FOREIGN KEY (`ID_USER`) REFERENCES `usr_login` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
