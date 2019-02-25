<?php
require_once 'models/Answer.php';


if( !isset($_SESSION['user_answer']) ) {
    $_SESSION['user_answer']= array();
} 

$postData = file_get_contents('php://input');

$data = json_decode($postData, true);

$id_question = $data['id_question'];
$answer = new Answer(1, $id_question);
$id_answer = $data['id_answer'];
$sign_bot = $data['sign_bot'];
$answer_is_true = $answer->is_true[$id_answer-1];
$answer_is_true_comment = $answer->is_true_comment[$id_answer-1];
$time_answer = time();

$retry = 0;
foreach ($_SESSION['user_answer'] as $key => $user_answer) { //проверяем на наличие ранее отвеченного вопроса и если ответ есть - перезаписываем
    if ($user_answer['id_question'] == $id_question) {
        $i = $key;
        $retry = 1;
    }
    else {
    $i = count($_SESSION['user_answer']);
    }
}


(($i == "") ? $i = 0 : $i = $i);
$_SESSION['user_answer'][$i]['id_question'] = $id_question;
$_SESSION['user_answer'][$i]['id_answer'] = $id_answer;
$_SESSION['user_answer'][$i]['answer_is_true'] = $answer_is_true;
$_SESSION['user_answer'][$i]['time_answer'] = $time_answer;

$data = array();

// проверка на бота по времени ответов на вопросы и в случае провала проверки  записываем признак бота в сессию
if ($i == 0) {$delta = $_SESSION['user_answer'][$i]['time_answer'] - $_SESSION['time_start'];}
else {$delta = $_SESSION['user_answer'][$i]['time_answer'] - $_SESSION['user_answer'][$i-1]['time_answer'];}

if ($retry == 0) {
    if ($delta <= 10) {$_SESSION['bot'] = 1;}
}
else {
    if ($delta <= 3) {$_SESSION['bot'] = 1;}
}
if ($sign_bot == 1) {$_SESSION['bot'] = 1;}


// здесь нужно дописать проверку на последний вопрос уровня, если вопрос последний - идет запись ответов в базу под сессией пользователя.


//  отправляем ответ на фронт об истинности вопроса и комментарии к нему
$data =
[
'answer_is_true' => $answer_is_true ,
'answer_is_true_comment' => $answer_is_true_comment
];
 
echo json_encode($data);

die;