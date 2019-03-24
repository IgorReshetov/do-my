<?php
require_once 'models/Question.php';
require_once 'models/Answer.php';

$count = Question:: getQuestionsCount (1, 1)+Question:: getQuestionsCount (1, 2)+Question:: getQuestionsCount (1, 3);
$active_question = $_SESSION['active_question'];

if ($active_question == 0) {
    $play = 'play1';
} else {
    if ($active_question < $count) {$play = 'play2';}
    if ($active_question >= $count) {
        $play = 'play3';
        $_SESSION['active_question']= 0;
        $_SESSION['level_access']= 1;
        $_SESSION['user_answer']= array();
    }
}


require_once 'views/survey.php';
