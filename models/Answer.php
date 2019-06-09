<?php

class Answer 
{
    public $id_answer;
    public $id_child;
    public $answer;
    public $info;
    public $is_have_comment;
    public $is_must_comment;
    public $scale_min_true;
    public $scale_max_true;
    public $word_true;
    public $show_index;
    public $is_true;
    public $is_true_comment;

    public function __construct($id_action, $id_question)      //варианты ответов для вопроса
    {
        global $mysqli;                                      // заводим базу в область видимости
        $id_action = $mysqli->real_escape_string($id_action);
        $id_question = $mysqli->real_escape_string($id_question);             //экранируем спецсимволы от sql инъекций
     
        $query = "call getAnswer($id_action, $id_question)";
        $mysqli->multi_query($query);
        $result = $mysqli->store_result();

        while ($answer_data = $result->fetch_assoc()) {
             $this->id_answer[] =           $answer_data['id_answer'];
             $this->id_child[] =            $answer_data['id_child'];
             $this->answer[] =              $answer_data['answer'];
             $this->info[] =                $answer_data['info'];
             $this->is_have_comment[] =     $answer_data['is_have_comment'];
             $this->is_must_comment[] =     $answer_data['is_must_comment'];
             $this->scale_min_true[] =      $answer_data['scale_min_true'];
             $this->scale_max_true[] =      $answer_data['scale_max_true'];
             $this->word_true[] =           $answer_data['word_true'];
             $this->show_index[] =          $answer_data['show_index'];
             $this->is_true[] =             $answer_data['is_true'];
             $this->is_true_comment[] =     $answer_data['is_true_comment'];
        }
        $result->close();
        $mysqli->next_result();
    }
}

// $tets = New Answer (1,3);

// echo '<pre>';
// var_dump($tets);
