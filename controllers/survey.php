<?php
require_once 'models/Question.php';
require_once 'models/Answer.php';


$question = new Question(3);


$answer = new Answer(3, $question->id_parent);

echo '<br>';
echo '<br>';
echo '<br>';
echo '<br>';
echo '<br>';
echo '<br>';
echo '<br>';
echo '<pre>';
var_dump ($question);

echo '<br>';
echo '<pre>';
var_dump ($answer);

require_once 'views/survey.php';
