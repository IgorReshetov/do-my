<?php
require_once 'models/User.php';
require_once 'models/Mail.php';

$postData = file_get_contents('php://input');

$data = json_decode($postData, true);

// запись mail и промокода в базу



// // блок отправки письма
// $file = "views/mail/do-my.pdf"; // файл
// $mailTo = $data['mail']; // кому
// $from = "info@mail.do-my.ru"; // от кого
// $subject = "Подарок от сервиса Думай"; // тема письма
// // текст письма
// $message = "Пробный текст"; 

// $mail_user = new Mail($mailTo, $from, $subject, $message, $file);


$to      = $data['mail'];
$subject = 'the subject';
$message = 'hello';
$headers = 'From: info@mail.do-my.ru' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

$result = mail("ivreshetov@mail.ru", $subject, $message, $headers);


echo json_encode($result);

die;