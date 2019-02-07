<?php

require_once 'models/Question.php';
require_once 'models/Answer.php';

// $question = new Question(2, 10, 5);

// echo "Check getQuestion:";
// echo '<pre>';
// var_dump($question);

$answer = new Answer(2, 8);

echo "Check getAnswer:";
echo '<pre>';
var_dump($answer);


// echo "Проверка базы: запрос всех вопросов";
// echo '<pre>';
// var_dump($questiones);
