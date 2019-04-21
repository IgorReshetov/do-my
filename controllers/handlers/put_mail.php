<?php
require_once 'models/User.php';
require_once 'models/Mail.php';

$postData = file_get_contents('php://input');

$data = json_decode($postData, true);



// блок отправки письма
$file = "do-my.pdf"; // файл
$mailTo = $data; // кому
$from = "rumyancevaa@afanasy.ru"; // от кого
$subject = "Подарок "; // тема письма
// текст письма
$message = require_once 'views/templates/mail_user.php'; 

echo $message;

$mail_user = new Mail($mailTo, $from, $subject, $message, $file);