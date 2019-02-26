<?php 
define("INDEX", ""); // УСТАНОВКА КОНСТАНТЫ ГЛАВНОГО КОНТРОЛЛЕРА

require_once 'cfg/config.php'; // ПОДКЛЮЧЕНИЕ КОНФИГУРАЦИИ

require_once 'models/db.php'; // ПОДКЛЮЧЕНИЕ ЯДРА БД

ini_set('session.gc_maxlifetime', SESSION_LIFE); //ВРЕМЯ ХРАНЕИЯ КУКИ И СЕССИИ
session_set_cookie_params(COOKIE_LIFE);

session_start();

$check = $_SERVER['REMOTE_ADDR'];

if( !isset($_SESSION['bot']) ) { // ПРОВЕРЯЕМ IP АДРЕС ПО СТОП ЛИСТУ и ПО УМОЛЧАНИЮ УСТАНАВЛИВАЕТСЯ ОТСУТСТВИЕ УГРОЗУ ОПАСНОСТИ БОТА
    $query = "SELECT * FROM stop_list WHERE ip = $check";
    $result = $mysqli->query($query);
    if ($result == false) {$_SESSION['bot'] = 0;}
    else {$_SESSION['bot'] = 2;}
}
$_SESSION['time_start'] = time();

if (DEV_MODE == true) {
    $admin_page_title = 'Думай-тест';   
} else {
    $admin_page_title = 'Думай';
}

// ГЛАВНЫЙ КОНТРОЛЛЕР
$page = addslashes(((isset($_GET['page'])) && $_GET['page'] !== "")?$_GET['page']:false);

if ($_SESSION['bot'] == 1) {$page = "check_bot";}
if ($_SESSION['bot'] == 2) {$page = "die_bot";}

switch ($page) {
    case "project":
    require_once 'controllers/proect.php';
    break;
    case "privacy":
    require_once 'views/privacy.php';
    break;
    case "get_question":
    require_once 'controllers/handlers/get_question.php';
    break;
    case "put_answer":
    require_once 'controllers/handlers/put_answer.php';
    break;
    case "check_bot":
    require_once 'controllers/check_bot.php';
    break;
    case "die_bot":
    require_once 'controllers/die_bot.php';
    break;
    default:
    require_once 'controllers/survey.php';
    break;
    }
