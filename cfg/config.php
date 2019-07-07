<?php 
defined('INDEX') OR die('Прямой доступ к странице запрещён!');
// Данные для подключения к базе
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'db_domy');

// Время хранения куки и сессии
define('COOKIE_LIFE', 2592000);
define('SESSION_LIFE', 2592000);

//ВЕРСИЯ
define('VER', 5);

//КОНСТАНТЫ
define('DEV_MODE', false);
define('ACTION', 8);

// Для пульса
define('API_USER_ID', '0a74d6f622f74cbe5a134a3ea5fa0b56');
define('API_SECRET', '63d86eba1836e2eec7032aaa6792e69e');
define('BOOK_ID', 1838762);