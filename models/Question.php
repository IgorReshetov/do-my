<?php

class Question 
{
    public $question;
    public $info;
    public $is_form;
    public $is_picture;
    public $is_scale;
    public $is_scale_min;
    public $is_scale_max;
    public $is_scale_step;
    public $scale_unit;
    public $is_rank;
    public $is_word;
    public $is_multi_answer;
    public $id_level;
    public $is_stat;

    public function __construct($id_action, $id_parent = 0, $id_answer_branch = 0) //создаем вопрос, если задан только первый аргумент возвращается первый вопрос дерева
    {
        global $mysqli;                                                          // заводим базу в область видимости
        $id_action = $mysqli->real_escape_string($id_action);
        $id_parent = $mysqli->real_escape_string($id_parent);
        $id_answer_branch = $mysqli->real_escape_string($id_answer_branch);                       //экранируем спецсимволы от sql инъекций

        $query = "call getQuestion($id_action, $id_parent, $id_answer_branch)";
        $mysqli->multi_query($query);
        $result = $mysqli->store_result();

        if ($result->num_rows > 0) {
            $question_data = $result->fetch_assoc();
            
            $this->id_parent =           $question_data['id_parent'];
            $this->question =            $question_data['question'];
            $this->info =                $question_data['info'];
            $this->is_form = $question_data['is_form'];
            $this->is_picture = $question_data['is_picture'];
            $this->is_scale = $question_data['is_scale'];
            $this->is_scale_min = $question_data['is_scale_min'];
            $this->is_scale_max = $question_data['is_scale_max'];
            $this->is_scale_step = $question_data['is_scale_step'];
            $this->is_scale_unit = $question_data['is_scale_unit'];
            $this->is_rank = $question_data['is_rank'];
            $this->is_word = $question_data['is_word'];
            $this->is_multi_answer =     $question_data['is_multi_aswer'];
            $this->id_level =     $question_data['id_level'];
            $this->is_stat =     $question_data['is_stat'];
        }
        $result->close();
        $mysqli->next_result();
    }

    public static function getAll($id_action) { //функция выдычи всех вопросов дерева
        global $mysqli;
        $id_action = $mysqli->real_escape_string($id_action);
       
        $query = "call getAll($id_action)";
        $mysqli->multi_query($query);
        $result = $mysqli->store_result();

        if ($result->num_rows > 0) {
        $questiones = $result->fetch_assoc();
        }
        $result->close();
        $mysqli->next_result();
        return $questiones;
    }

    public static function getQuestionsCount ($id_action, $id_level) { //функция выдачи колличества вопросов в уровне, либо всех вопросов
        global $mysqli;
        $id_action = $mysqli->real_escape_string($id_action);
        $id_level = $mysqli->real_escape_string($id_level);
       
        $query = "call getQuestionsCount($id_action, $id_level)";
        $mysqli->multi_query($query);
        $result = $mysqli->store_result();

        if ($result->num_rows > 0) {
        $questiones_count = $result->fetch_assoc();
        }
        $result->close();
        $mysqli->next_result();
        return $questiones_count;
    }
}