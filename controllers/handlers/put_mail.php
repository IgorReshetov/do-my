<?php
require_once 'models/User.php';
require_once 'models/Mail.php';

$postData = file_get_contents('php://input');

$data = json_decode($postData, true);

// запись mail и промокода в базу

$promo = $_SESSION['action'].'_'.$_SESSION['play_key'];

// блок отправки письма
$file = "views/mail/do-my.pdf";

$mailTo = $data['mail']; // кому
$from = "info@mail.do-my.ru"; // от кого
$subject = "Привет, жду ответа"; // тема письма

// текст письма
$message = ' Привет, срочно напиши как у тебя дела"!


   Направляуем вам:
- буклет с пояснениями по пройденным вопросам квиза;
- и специальное предложение от застройщика.


Ваш промокод:  '.$promo.'


C уважением, команда сервиса "Думай"';


// ВАРИАНТ HTML
// <html>
// <head>
//   <title>Думай</title>
// </head>
// <body>
//   <br>
//   <h2>Благодарим за прохождеие квиза от сервиса "Думай"!</h1>
//   <br>
//   <br>
//   <h3>Направляуем вам:</h1>
//   <h3>- буклет с пояснениями по пройденным вопросам квиза;</h2>
//   <h3>- и специальное предложение от застройщика.</h2>
//   <br>
//   <br>
//   <h4> Ваш промокод '.$promo.'.</h4>
//   <br>
//   <br>
//   <h4>C уважением, команда сервиса "Думай"</h4>
// </body>
// </html>


$mail_user = new Mail($mailTo, $from, $subject, $message, $file);



User::putUserMail($mailTo);//запись почты в базу

User::putUserTrofy($_SESSION['action'], $promo);//запись трофеев в базу пока без позиции и желаний

// if ($mail_user->result == true) {$_SESSION['active_question'] = $_SESSION['active_question']+1;}//делаем метку в сессию что подарок получен

echo json_encode($mail_user);

die;