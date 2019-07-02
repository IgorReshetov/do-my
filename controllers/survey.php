<?php
require_once 'models/Question.php';
require_once 'models/Answer.php';
require_once 'models/User.php';

$user = $_SESSION['life']; 
$_SESSION['life'] = 'old';

if(isset($_REQUEST['back'])){$user = 'back';}


$count = Question:: getQuestionsCount ($_SESSION['action'], 1)['questions_count']+Question:: getQuestionsCount ($_SESSION['action'], 2)['questions_count']+Question:: getQuestionsCount ($_SESSION['action'], 3)['questions_count'];
$active_question = $_SESSION['active_question'];


$title = "Тест: Как выбрать квартиру?";
$prize = "Скидку более миллиона рублей на квартиру в ЖК \"Любовь и голуби\"";


if ($active_question == 0 && count($_SESSION['user_answer']) == 0) {
    $play = 'play1';
    
} else {
    if ($active_question < $count) {$play = 'play2';}
    if ($active_question == $count) {$play = 'play3'; $title = "Поздравляем, вы прошли тест!";}
    if ($active_question > $count) {
        $play = 'play4';
        $_SESSION['active_question']= 0;
        $_SESSION['level_access']= 1;
        $_SESSION['user_answer']= array();
        $_SESSION['play_key'] = uniqid().rand(1000000, 9999999);
        $_SESSION['hint']= 9;
    }
}

if(isset($_REQUEST['reset'])){
    $play = 'play1';
    $_SESSION['active_question']= 0;
    $_SESSION['level_access']= 1;
    $_SESSION['user_answer']= array();
    $_SESSION['play_key'] = uniqid().rand(1000000, 9999999);
    $_SESSION['hint']= 9;  
}

if(($active_question == $count)){

$stat = User::getUserStat($_SESSION['play_key']);

// переставляем общие на нулевую позицию при наличии
for ($i=0; $i<count($stat); $i++) {
    if ($stat[$i]{'group_name'} == 'Общие') {
        $tranzit = $stat[0]{'group_name'};
        $stat[0]{'group_name'} = $stat[$i]{'group_name'};
        $stat[$i]{'group_name'} = $tranzit;
    }
}

}


require_once 'views/survey.php';
