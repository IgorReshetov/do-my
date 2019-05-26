<?php
require_once 'models/Question.php';
require_once 'models/Answer.php';
require_once 'models/User.php';

$user = $_SESSION['life']; 
$_SESSION['life'] = 'old';

if(isset($_REQUEST['back'])){$user = 'back';}

$count = Question:: getQuestionsCount ($_SESSION['action'], 1)['questions_count']+Question:: getQuestionsCount ($_SESSION['action'], 2)['questions_count']+Question:: getQuestionsCount ($_SESSION['action'], 3)['questions_count'];
$active_question = $_SESSION['active_question'];

if ($_SESSION['action'] == 6){
    $title = "Пройдите квиз и получите скидку более миллиона рублей на квартиру в новостройке у метро \"Селигерская\"";
    $prize = "Ту самую скидку более миллиона рублей на квартиру в новостройке у метро \"Селигерская\"";
}
if ($_SESSION['action'] == 5){
    $title = "Пройдите квиз и получите скидку более миллиона рублей на квартиру в ЖК \"Любовь и голуби\"";
    $prize = "Ту самую скидку более миллиона рублей на квартиру в ЖК \"Любовь и голуби\"";
}

if ($active_question == 0 && count($_SESSION['user_answer']) == 0) {
    $play = 'play1';
    
} else {
    if ($active_question < $count) {$play = 'play2';}
    if ($active_question == $count) {$play = 'play3'; $title = "Поздравляем, вы прошли квиз!";}
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
