<?php

require_once 'models/Question.php';
require_once 'models/Answer.php';

$postData = file_get_contents('php://input');

$data = json_decode($postData, true);

$id_question = $data['numStartQst'];


$question = new Question(1, $id_question);
$answer = new Answer(1, $question->id_parent);

$answer->is_true[] = [];
$answer->is_true_comment[] = [];

$data = array();
$data =
[
'question' => $question,
'answer' => $answer
];

echo json_encode($data);
die;
