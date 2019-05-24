<?php
require_once 'models/User.php';

require_once 'sendpulse-rest-api-php/src/ApiInterface.php';
require_once 'sendpulse-rest-api-php/src/ApiClient.php';
require_once 'sendpulse-rest-api-php/src/Storage/TokenStorageInterface.php';
require_once 'sendpulse-rest-api-php/src/Storage/FileStorage.php';
require_once 'sendpulse-rest-api-php/src/Storage/SessionStorage.php';
require_once 'sendpulse-rest-api-php/src/Storage/MemcachedStorage.php';
require_once 'sendpulse-rest-api-php/src/Storage/MemcacheStorage.php';


$postData = file_get_contents('php://input');

$data = json_decode($postData, true);

// запись mail и промокода в базу

$promo = $_SESSION['action'].'_'.$_SESSION['play_key'];

$promo_user = substr($promo, -7);

// блок отправки письма
$file = "views/mail/do-my.pdf";

$mailTo = $data['mail']; // кому
$from = "info@mail.do-my.ru"; // от кого
$subject = "Привет, жду ответа"; // тема письма


// блок отправки через пульс
use Sendpulse\RestApi\ApiClient;
use Sendpulse\RestApi\Storage\FileStorage;

$SPApiClient = new ApiClient(API_USER_ID, API_SECRET, new FileStorage());

// $list = $SPApiClient->listAddressBooks();

/*
 * Example: Add new email to mailing lists
 */
 $bookID = BOOK_ID;
 $emails = array(
    array(
        'email' => $data['mail'],
        'variables' => array(
         'phone' => $promo_user,
         'name' => $promo_user,
         )
    )
);

$mail_go = $SPApiClient->addEmails($bookID, $emails);


//запись почты в базу

User::putUserMail($mailTo);//запись почты в базу

$place = $data['place'];
$room = $data['room'];

User::putUserTrofy($_SESSION['action'], $promo, $place, $room);//запись трофеев в базу пока без позиции и желаний

if ($mail_go->result == true) {$_SESSION['active_question'] = $_SESSION['active_question']+1;}//делаем метку в сессию что подарок получен

echo json_encode($mail_go);

die;