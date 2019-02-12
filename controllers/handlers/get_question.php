<?php
require_once 'models/Question.php';
require_once 'models/Answer.php';
$id_question = addslashes((((isset($_REQUEST['id_question'])) && $_REQUEST['id_question'] !== "")?$_REQUEST['id_question']:0));


$question = new Question(1, $id_question);
$answer = new Answer(1, $question->id_parent);

$data = array();
$data =
[
'question' => $question,
'answer' => $answer
];

echo json_encode($data);
