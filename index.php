<?php 
define("INDEX", ""); // УСТАНОВКА КОНСТАНТЫ ГЛАВНОГО КОНТРОЛЛЕРА

session_start();

require_once 'cfg/config.php'; // ПОДКЛЮЧЕНИЕ КОНФИГУРАЦИИ
require_once 'models/db.php'; // ПОДКЛЮЧЕНИЕ ЯДРА БД

// ГЛАВНЫЙ КОНТРОЛЛЕР
require_once 'controllers/home.php';
