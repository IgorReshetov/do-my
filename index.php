<?php 
define("INDEX", ""); // УСТАНОВКА КОНСТАНТЫ ГЛАВНОГО КОНТРОЛЛЕРА

require_once 'cfg/config.php'; // ПОДКЛЮЧЕНИЕ КОНФИГУРАЦИИ

require_once 'models/db.php'; // ПОДКЛЮЧЕНИЕ ЯДРА БД

require_once 'models/Page.php'; // ПОДКЛЮЧЕНИЕ ГЛАВНОГО КОНТРОЛЕРА

require_once 'models/Session.php'; // ПОДКЛЮЧЕНИЕ КОНТРОЛЕРА СЕССИИ

// Переход на страницу через Get параметр
$page = (isset($_GET['page']) && $_GET['page'] !== "")?$_GET['page']:'first';

New Session;

New Page ($page);
