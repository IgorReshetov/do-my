<?php
// echo ''
// var_dump();
// include('')
// require_once '';
// header('');exit; 

// if () {
// 
// } else {
// 
// }

// switch () {
//     case 1:
//     case 2: 
//         
//         break;
//     case 3:
//         
//     default:
// 
// }

// (( < ) ? '' : '')

// while ($i <= ) {
//  
// }


// for ($i = 1; $i <= ; $i++) {
//     
// }

// foreach ($ as $ => $) {
//     
// }


// РАБОТА С БАЗОЙ
// ВСТАВКА
// $query = "INSERT INTO articles (author, text)
// VALUES ('$author', '$text')";
// $result = mysqli_query($link, $query);

//ЧТЕНИЕ
// $query = "SELECT * FROM _____ WHERE _____=_______";
// $result = mysqli_query($link, $query);

// $messages = [];
// while ($message = mysqli_fetch_assoc($result)) {
//     $messages[] = $message;
// }

// РАБОТА C СООБЩЕНИЯМИ
// $____ = $_POST['_____'];
// $____ = $_GET['_____'];



// ОТПРАВКА СООБЩЕНИЙ
// $message_id = $_GET['message_id'];

// $query = "SELECT * FROM messages WHERE message_id>$message_id";
// $result = mysqli_query($link, $query);

// $messages = [];
// while ($message = mysqli_fetch_assoc($result)) {
//     $messages[] = $message;
// }

// echo json_encode($messages);


// ПОЛУЧЕНИЕ СООБЩЕНИЙ
// $postData = file_get_contents('php://input');
// $data = json_decode($postData, true);

// $query = "INSERT INTO messages (name, text, date_created) 
//           VALUES ('{$data['name']}', '{$data['text']}', NOW())";

// $result = mysqli_query($link, $query);

// РАБОТА с СЕССИЯМИ

// session_start();

// setcookie('name', 'Value', time()+60*60*24*7);

//  setcookie('name'): - удалить куку

// $_SESSION = [];

// session_destroy();




?>