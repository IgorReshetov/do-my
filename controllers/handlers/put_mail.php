<?php
require_once 'models/User.php';
require_once 'models/Mail.php';

$postData = file_get_contents('php://input');

$data = json_decode($postData, true);

// запись mail и промокода в базу



// блок отправки письма
$file = "views/mail/do-my.pdf";
// $filename = 'do-my.pdf'; // файл
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
  <img src="https://do-my.ru/test/views/images/icon/logomail.png">
  <br>
  <h2>Благодарим за прохождеие квиза от сервиса "Думай"!</h1>
  <br>
  <br>
  <h2>Направляуем вам:</h1>
  <h3>- буклет с пояснениями по пройденным вопросам квиза;</h2>
  <h3>- и специальное предложение от застройщика.</h2>
  <br>
  <br>
  <h4> Ваш промокод ___________.</h4>
  <br>
  <br>
  <h4>C уважением, команда сервиса "Думай"</h4>
</body>
</html>
';

$mail_user = new Mail($mailTo, $from, $subject, $message, $file);


echo json_encode($mail_user);

die;