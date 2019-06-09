<?php

require_once 'models/Question.php';
require_once 'models/Answer.php';

$postData = file_get_contents('php://input');

$data = json_decode($postData, true);

$id_question = $data['numStartQst'];

$i = $data['numStartQst'];

//переводим порядковый номер вопроса в ID
if ($id_question == 0) {
    $id_question = 0;
    $check_tree = 0;
} else {
    $id_question = $_SESSION['user_answer'][$id_question-1]['id_question'];
    $check_tree = $_SESSION['user_answer'][$i-1]['is_tree'];
}

// проверяем на ветвление и включаев ветвление для вопросов веток

if ($check_tree == 1) {
    if (is_array($_SESSION['user_answer'][$i-1]['id_answer'])){
        $id_answer = $_SESSION['user_answer'][$i-1]['id_answer'][0];
    }else{
        $id_answer = $_SESSION['user_answer'][$i-1]['id_answer'];
    }
}else {
    $id_answer = 0;
}

$question = new Question($_SESSION['action'], $id_question, $id_answer);
if ($question->id_level > $_SESSION['level_access'])
{
$question = 'нет доступа к следующему уровню';
$answer = false;
} else {

$answer = new Answer($_SESSION['action'], $question->id_parent);

$answer->is_true[] = [];
$answer->is_true_comment[] = [];
$answer->scale_min_true[] =  [];
$answer->scale_max_true[] =  [];
$answer->word_true[] =  []; 
$answer->show_index[] = [];

}

// запись в сессию данных о вопросе
$_SESSION['user_answer'][$i]['is_tree'] = $question->is_tree;
$_SESSION['user_answer'][$i]['is_form'] = $question->is_form;
$_SESSION['user_answer'][$i]['is_picture'] = $question->is_picture;
$_SESSION['user_answer'][$i]['is_scale'] = $question->is_scale;
$_SESSION['user_answer'][$i]['is_rank'] = $question->is_rank;
$_SESSION['user_answer'][$i]['is_word'] = $question->is_word;

$data = array();
$data =
[
'question' => $question,
'answer' => $answer
];

echo json_encode($data);

die;
