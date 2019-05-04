<?php
require_once 'models/User.php';
require_once 'models/Mail.php';

$postData = file_get_contents('php://input');

$data = json_decode($postData, true);


$promo = User::getPromocod ($data['mail']);

if (count($promo) == 0) {echo json_encode(count($promo));}
else {
if (count($promo) == 1) {$message_promo = "Направляем Ваш промокод по пройденному  квизу:\n\n";
$subject = "Промокод по квизу";}
else{$message_promo = "Направляем Ваши промокоды по пройденным  квизам:\n\n";
$subject = "Промокоды по квизам";
}

$mailTo = $data['mail']; // кому
$from = "do-my.ru@mail.ru"; // от кого
$subject = "Промокоды по квизам"; // тема письма

// текст письма

foreach ($promo as $key => $row) {
 $message_promo .= $row{'promocode'}." по квизу \"".$row{'action_name'}."\"\n";
 $message_promo .= "\n";
}

$message = 'Здравствуйте!

'.$message_promo.'
C уважением, команда сервиса "Думай"';



$mail_user = new Mail($mailTo, $from, $subject, $message);


echo json_encode(count($promo));
}
die;