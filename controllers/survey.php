<?php

require_once 'models/Question.php';

$question = new Question(2);

// $questiones = Question::getAll(2);
echo "Проверка базы: запрос по 3 вопросу ";
echo '<pre>';
var_dump($question);

// echo "Проверка базы: запрос всех вопросов";
// echo '<pre>';
// var_dump($questiones);
