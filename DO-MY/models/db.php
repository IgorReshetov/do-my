<?php 

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
$mysqli->set_charset('utf8');

// todo: сделать отдельный класс по работе с базой