<?php 
define("INDEX", ""); // УСТАНОВКА КОНСТАНТЫ ГЛАВНОГО КОНТРОЛЛЕРА

session_start();

require_once 'cfg/config.php'; // ПОДКЛЮЧЕНИЕ КОНФИГУРАЦИИ
require_once 'models/db.php'; // ПОДКЛЮЧЕНИЕ ЯДРА БД

// ГЛАВНЫЙ КОНТРОЛЛЕР
$page = (((isset($_GET['page'])) && $_GET['page'] !== "")?$_GET['page']:false);
switch ($page) {
    case "proect":
    require_once 'controllers/proect.php';
    break;
    default:
    require_once 'controllers/start.php';
    break;
    }
