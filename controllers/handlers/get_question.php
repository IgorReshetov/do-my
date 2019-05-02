<?php

require_once 'models/Question.php';
require_once 'models/Answer.php';

$postData = file_get_contents('php://input');

$data = json_decode($postData, true);

$id_question = $data['numStartQst'];

//переводим порядковый номер вопроса в ID
if ($id_question == 0) {$id_question = 0;} else {$id_question = $_SESSION['user_answer'][$id_question-1]['id_question'];}

$question = new Question($_SESSION['action'], $id_question);
if ($question->id_level > $_SESSION['level_access'])
{
$question = 'нет доступа к следующему уровню';
$answer = false;
} else {

$answer = new Answer($_SESSION['action'], $question->id_parent);

$answer->is_true[] = [];
$answer->is_true_comment[] = [];
}

$data = array();
$data =
[
'question' => $question,
'answer' => $answer
];

echo json_encode($data);

die;
