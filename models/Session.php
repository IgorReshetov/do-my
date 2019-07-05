<?php

class Session 
{
    
    public function __construct()      
    {
        global $mysqli; 
        
        ini_set('session.gc_maxlifetime', SESSION_LIFE); //ВРЕМЯ ХРАНЕИЯ КУКИ И СЕССИИ
        session_set_cookie_params(COOKIE_LIFE);

        session_start();

        $check = $mysqli->real_escape_string($_SERVER['REMOTE_ADDR']);

                               
        if( !isset($_SESSION['active_question']) ) {
            $_SESSION['active_question']= 0;
            $_SESSION['life'] = 'new';
        }

        if( !isset($_SESSION['level_access']) ) {
            $_SESSION['level_access']= 1;
        }

        if( !isset($_SESSION['hint']) ) {
            $_SESSION['hint']= 9;
        }

        if( !isset($_SESSION['play_key']) ) {
            $_SESSION['play_key'] = uniqid().rand(1000000, 9999999);
        }

        if( !isset($_SESSION['user_answer']) ) {
            $_SESSION['user_answer']= array();
        }

        // временная заглушка на период теста ABC, чтоб пользователь не мог попадать на разные тесты.
        if( !isset($_SESSION['action']) ) {
            $_SESSION['action']= ACTION;
        }

        // проверка на бота
        // if( !isset($_SESSION['bot']) ) { // ПРОВЕРЯЕМ IP АДРЕС ПО СТОП ЛИСТУ и ПО УМОЛЧАНИЮ УСТАНАВЛИВАЕТСЯ ОТСУТСТВИЕ УГРОЗУ ОПАСНОСТИ БОТА
        //     $query = "SELECT * FROM stop_list WHERE ip = $check";
        //     $result = $mysqli->query($query);
        //     if ($result == false) {$_SESSION['bot'] = 0;}
        //     else {$_SESSION['bot'] = 2;}
        // }
        $_SESSION['time_start'] = time();
        $_SESSION['ip_user'] = $check;

           
    }
}