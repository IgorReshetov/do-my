<?php

class Answer 
{
    public $id_answer;
    public $answer;
    public $info;
    public $is_have_comment;
    public $is_must_comment;
    public $is_have_scale;
    public $scale_min;
    public $scale_max;
    public $scale_step;
    public $show_index;

    public function __construct($id_tree, $id_question)      //варианты ответов для вопроса
    {
        global $mysqli;                                      // заводим базу в область видимости
        $id_tree = $mysqli->real_escape_string($id_tree);
        $id_question = $mysqli->real_escape_string($id_question);             //экранируем спецсимволы от sql инъекций
     
        $query = "call getAnswer($id_tree, $id_question)";
        $mysqli->multi_query($query);
        $result = $mysqli->store_result();

        while ($answer_data = $result->fetch_assoc()) {
             $this->id_answer[] =           $answer_data['id_answer'];
             $this->answer[] =              $answer_data['answer'];
             $this->info[] =                $answer_data['info'];
             $this->is_have_comment[] =     $answer_data['is_have_comment'];
             $this->is_must_comment[] =     $answer_data['is_must_comment'];
             $this->is_have_scale[] =       $answer_data['is_have_scale'];
             $this->scale_min[] =           $answer_data['scale_min'];
             $this->scale_max[] =           $answer_data['scale_max'];
             $this->scale_step[] =          $answer_data['scale_step'];
             $this->show_index[] =          $answer_data['show_index'];
        }
        $result->close();
        $mysqli->next_result();
    }
}
