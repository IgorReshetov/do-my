<?php
require_once 'models/Question.php';
require_once 'models/Answer.php';

// $question = new Question(1,2);


$answer = new Answer(1, 1);


// var_dump ($question);

var_dump ($answer);

require_once 'views/survey.php';
