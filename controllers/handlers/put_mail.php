<?php
require_once 'models/User.php';
require_once 'models/Mail.php';

$postData = file_get_contents('php://input');

$data = json_decode($postData, true);

// запись mail и промокода в базу

$promo = uniqid(ACTION."_",true);

// блок отправки письма
$file = "views/mail/do-my.pdf";

$mailTo = $data['mail']; // кому
$from = "info@mail.do-my.ru"; // от кого
$subject = "Предложение от застройщика"; // тема письма

// текст письма
$message = '
<html>
<head>
  <title>Думай</title>
</head>
<body>
  <br>
  <h2>Благодарим за прохождеие квиза от сервиса "Думай"!</h1>
  <br>
  <br>
  <h3>Направляуем вам:</h1>
  <h3>- буклет с пояснениями по пройденным вопросам квиза;</h2>
  <h3>- и специальное предложение от застройщика.</h2>
  <br>
  <br>
  <h4> Ваш промокод '.$promo.'.</h4>
  <br>
  <br>
  <h4>C уважением, команда сервиса "Думай"</h4>
</body>
</html>
';

// $mail_user = new Mail($mailTo, $from, $subject, $message, $file);

$mail_user = true;

User::putUserMail($mailTo);//запись почты в базу

User::putUserTrofy(ACTION, $promo);//запись трофеев в базу пока без позиции и желаний

if ($mail_user == true) {$_SESSION['active_question'] = $_SESSION['active_question']+1;}//делаем метку в сессию что подарок получен

echo json_encode($mail_user);

die;