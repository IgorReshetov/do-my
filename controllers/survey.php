<?php
require_once 'models/Question.php';
require_once 'models/Answer.php';


$question = new Question(3);


$answer = new Answer(3, $question->id_parent);


require_once 'views/survey.php';
