<?php

class Question 
{
    public $id_answer_branch;
    public $question;
    public $questiones;
    public $info;
    public $is_must_have_answer;
    public $is_multi_answer;
    public $id_level;

    public function __construct($id_tree, $id_parent = 0, $id_answer_branch = 0) //создаем вопрос, если задан только первый аргумент возвращается первый вопрос дерева
    {
        global $mysqli;                                                          // заводим базу в область видимости
        $id_tree = $mysqli->real_escape_string($id_tree);
        $id_parent = $mysqli->real_escape_string($id_parent);
        $id_answer_branch = $mysqli->real_escape_string($id_answer_branch);                       //экранируем спецсимволы от sql инъекций

        $query = "call getQuestion($id_tree, $id_parent, $id_answer_branch)";
        $mysqli->multi_query($query);
        $result = $mysqli->store_result();

        if ($result->num_rows > 0) {
            $question_data = $result->fetch_assoc();
            
            $this->id_parent =           $question_data['id_parent'];
            $this->question =            $question_data['question'];
            $this->info =                $question_data['info'];
            $this->is_must_have_answer = $question_data['is_must_have_answer'];
            $this->is_multi_answer =     $question_data['is_multi_aswer'];
            $this->id_level =     $question_data['id_level'];
        }
        $result->close();
        $mysqli->next_result();
    }

    public static function getAll($id_tree) { //функция выдычи всех вопросов дерева
        global $mysqli;
        $id_tree = $mysqli->real_escape_string($id_tree);
       
        $query = "call getAll($id_tree)";
        $mysqli->multi_query($query);
        $result = $mysqli->store_result();

        if ($result->num_rows > 0) {
        $questiones = $result->fetch_assoc();
        }
        $result->close();
        $mysqli->next_result();
        return $questiones;
    }

    public static function getQuestionsCount ($id_tree, $id_level) { //функция выдачи колличества вопросов в уровне, либо всех вопросов
        global $mysqli;
        $id_tree = $mysqli->real_escape_string($id_tree);
        $id_level = $mysqli->real_escape_string($id_level);
       
        $query = "call getQuestionsCount($id_tree, $id_level)";
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