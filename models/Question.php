<?php

class Question 
{
    //public $id_tree;
    //public $id_parent; 
    //public $id_child;
    public $id_answer_branch;
    public $question;
    public $questiones;
    public $info;
    // public $image; //нужно добавить в таблицу вопросов картинки, где будут хранится ссылки на картинки
    public $is_must_have_answer;
    public $is_multi_answer;

    public function __construct($id_tree, $id_parent = null, $id_answer_branch = null) //создаем вопрос, если задан только первый аргумент возвращается первый вопрос дерева
    {
        global $mysqli; // заводим базу в область видимости
        $id_tree = addslashes($id_tree);
        $id_parent = addslashes($id_parent);
        $id_answer_branch = addslashes($id_answer_branch); //экранируем спецсимволы от sql инъекций

        # $query = "call getQuestion($id_tree, $id_parent, $id_answer_branch)"; // функции пишем в верблюжьем стиле
        $query = "call getQuestion(2, null, null)";
        $result = $mysqli->query($query);

        if ($result->num_rows > 0) {
            $question_data = $result->fetch_assoc();
            
           $this->id_parent = $question_data['id_parent'];
           $this->question = $question_data['question'];
           // $this->id_child = $question_data['id_child'];
           // $this->id_answer_branch = $question_data['id_answer_branch'];
           // $this->question = $question_data['question'];
            $this->info = $question_data['info'];
            //$this->image = $question_data['image'];
            $this->is_must_have_answer = $question_data['is_must_have_answer'];
            $this->is_multi_answer = $question_data['is_multi_aswer'];

            //var_dump($question_data);
        }
    }

    public static function getAll($id_tree) // нужно сосздать полный аналог таблицы spr_question_tree с присоединением таблицы spr_question
    {
        global $mysqli;
        $id_tree = addslashes($id_tree);
       
        $query = "call getAll($id_tree)";
        // $query = "select * from SPR_QUESTION_TREE where ID_TREE = $id_tree";
        $result = $mysqli->query($query);

        if ($result->num_rows > 0) {
        $questiones = $result->fetch_assoc();
        }
        
        return $questiones;
    }
}