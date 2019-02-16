<?php
require_once 'models/Question.php';
require_once 'models/Answer.php';

$postData = file_get_contents('php://input');

$id_question = json_decode($postData, true);

$question = new Question(1, $id_question);
$answer = new Answer(1, $question->id_parent);

$data = array();
$data =
[
'question' => $question,
'answer' => $answer
];

echo json_encode($data);
