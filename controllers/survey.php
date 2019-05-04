<?php
require_once 'models/Question.php';
require_once 'models/Answer.php';

$count = Question:: getQuestionsCount ($_SESSION['action'], 1)['questions_count']+Question:: getQuestionsCount ($_SESSION['action'], 2)['questions_count']+Question:: getQuestionsCount ($_SESSION['action'], 3)['questions_count'];
$active_question = $_SESSION['active_question'];



if ($active_question == 0 && count($_SESSION['user_answer']) == 0) {
    $play = 'play1';
    
} else {
    if ($active_question < $count) {$play = 'play2';}
    if ($active_question == $count) {$play = 'play3';}
    if ($active_question > $count) {
        $play = 'play4';
        $_SESSION['active_question']= 0;
        $_SESSION['level_access']= 1;
        $_SESSION['user_answer']= array();
        $_SESSION['play_key'] = uniqid();
    }
}

if(isset($_REQUEST['reset'])){
    $play = 'play1';
    $_SESSION['active_question']= 0;
    $_SESSION['level_access']= 1;
    $_SESSION['user_answer']= array();
    $_SESSION['play_key'] = uniqid();
}


require_once 'views/survey.php';
