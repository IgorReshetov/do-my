<?php
require_once 'models/Question.php';
require_once 'models/Answer.php';
require_once 'models/User.php';

$user = $_SESSION['life']; 
$_SESSION['life'] = 'old';

if(isset($_REQUEST['back'])){$user = 'back';}

if(isset($_REQUEST['reset'])){
    $play = 'play1';
    $_SESSION['active_question']= 0;
    $_SESSION['level_access']= 1;
    $_SESSION['user_answer']= array();
    $_SESSION['play_key'] = uniqid().rand(1000000, 9999999);
    $_SESSION['hint']= 9;  
}

$count = Question:: getQuestionsCount ($_SESSION['action'], 1)['questions_count']+Question:: getQuestionsCount ($_SESSION['action'], 2)['questions_count']+Question:: getQuestionsCount ($_SESSION['action'], 3)['questions_count'];
$active_question = $_SESSION['active_question'];


$title = "Тест: Как сделать ремонт?";
$prize = "Скидку на ремонт 10% со сроком выполнения работ 1 месяц от подрядчика Проффсервис";


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



if(($active_question == $count)){

    $stat = User::getUserStat($_SESSION['play_key']);

    $form = User::getUserForm($_SESSION['play_key']);

    $param = $form[6]{'answer'};

    switch ($param) {
        case "369":
        $param ="сумма 100-300тр,скидка 10проц,срок 1мес";
        $prize = "Скидку на ремонт 10% со сроком выполнения работ 1 месяц от ПроффCервис";
        break;
        case "370":
        $param ="сумма 300-600тр,скидка 7проц,срок 2мес";
        $prize = "Скидку на ремонт 7% со сроком выполнения работ 2 месяца от ПроффCервис";
        break;
        case "371":
        $param ="сумма 600-1000тр,скидка 5проц,срок 3мес";
        $prize = "Скидку на ремонт <b>5%</b> со сроком выполнения работ <b>3 месяца</b> от ПроффCервис";
        break;
        case "372":
        $param ="сумма >1000тр,скидка 5проц,срок 5мес";
        $prize = "Скидку на ремонт 5% со сроком выполнения работ 5 месяцев от ПроффCервис";
        break;

        default:
    
        break;
        }

    $promo_user = $_SESSION['play_key'];

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
