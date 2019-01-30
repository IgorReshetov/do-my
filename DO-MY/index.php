<?php 
define("INDEX", ""); // УСТАНОВКА КОНСТАНТЫ ГЛАВНОГО КОНТРОЛЛЕРА

session_start();

require_once 'cfg/config.php'; // ПОДКЛЮЧЕНИЕ КОНФИГУРАЦИИ

if (DEV_MODE == true) {
    $admin_page_title = 'Думай-тест';   
} else {
    $admin_page_title = 'Думай';
}

require_once 'models/db.php'; // ПОДКЛЮЧЕНИЕ ЯДРА БД

// ГЛАВНЫЙ КОНТРОЛЛЕР
$page = (((isset($_GET['page'])) && $_GET['page'] !== "")?$_GET['page']:false);
switch ($page) {
    case "project":
    require_once 'controllers/proect.php';
    break;
    case "privacy":
    require_once 'views/privacy.php';
    break;
    default:
    require_once 'controllers/start.php';
    break;
    }
