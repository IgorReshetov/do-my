<?php


class User 
{
    public $id_user;
    public $last_session_id;
    public $ip_user;
    // public $login;
    // public $email;
    // public $pass;
    // public $role;
    // public $fio;
    // public $last_session_dt;
    // public $last_session_device;
    // public $last_session_gps;

    public function __construct($last_session_id)
    {
        global $mysqli;
        $last_session_id = $mysqli->real_escape_string($last_session_id);
        $query = "SELECT ID_USER as id_user, LAST_SESSION_ID as last_session_id, IP_USER as ip_user FROM usr_login WHERE last_session_id LIKE '$last_session_id'";
        $mysqli->multi_query($query);
        $result = $mysqli->store_result();
                          
        if ($result->num_rows > 0) {
        
            $user_data = $result->fetch_assoc();

            $this->id_user = $user_data['id_user'];
            $this->last_session_id = $user_data['last_session_id'];
            $this->ip_user = $user_data['ip_user'];
           
        }
        else {
        return false;
        }
        $result->close();
        $mysqli->next_result();
    }

    public static function signUpAuto($last_session_id, $ip_user)
    {
        global $mysqli;
        $last_session_id = $mysqli->real_escape_string($last_session_id);
        $ip_user = $mysqli->real_escape_string($ip_user);
        $user = new self($last_session_id);

        if($user->id_user == NULL) {
           
            $query = "INSERT INTO usr_login (LAST_SESSION_ID, IP_USER)
                    VALUES ('$last_session_id', '$ip_user')"; 
            $mysqli->multi_query($query);
            $result = $mysqli->store_result();
            
            return true;

        } else {
            return false;
        }
        $result->close();
        $mysqli->next_result();
    }

    public static function putUserAnswer($id_user, $id_action, $id_question, $id_answer, $is_true, $play_key, $info = 'NULL', $scale_value = 'NULL')
    {
        global $mysqli;
        $id_user = $mysqli->real_escape_string($id_user);
        $id_question = $mysqli->real_escape_string($id_question);
        $id_answer = $mysqli->real_escape_string($id_answer);
        $scale_value = $mysqli->real_escape_string($scale_value);
        $is_true = $mysqli->real_escape_string($is_true);

        if ($is_true ==''){$is_true  = 'NULL';};
        $query = "call putUserAnswer($id_user, $id_question, '$id_answer', '$info', $scale_value, $is_true,  $id_action, '$play_key')";
        $mysqli->multi_query($query);
        $result = $mysqli->store_result();
        if($result == true) {
            return true;
        } else {
            return false;
        }

        $result->close();
        $mysqli->next_result();
    }

    public static function putUserMail($mailTo){
        global $mysqli; // заводим базу в область видимости
                
        $mailTo = $mysqli->real_escape_string($mailTo);
        
        $last_session_id = $_COOKIE ['PHPSESSID'];

        $query = "UPDATE `usr_login` SET `MAIL` = '$mailTo' WHERE `usr_login`.`LAST_SESSION_ID` = '$last_session_id'"; 
        $mysqli->multi_query($query);
        $result = $mysqli->store_result();

        if($result == true) {
            return true;
        } else {
            return false;
        }

        $result->close();
        $mysqli->next_result();

    }

    public static function putUserTrofy($id_action, $promo, $desire_1 = 'NULL', $desire_2 = 'NULL', $desire_3 = 'NULL', $desire_4 = 'NULL', $desire_5 = 'NULL', $position = 'NULL'){
        global $mysqli; // заводим базу в область видимости
        
        $last_session_id = $_COOKIE ['PHPSESSID'];
        
        $user = new self($last_session_id);
        $desire_1 = $mysqli->real_escape_string($desire_1);
        $desire_2 = $mysqli->real_escape_string($desire_2);
        $desire_3 = $mysqli->real_escape_string($desire_3);
        $desire_4 = $mysqli->real_escape_string($desire_4);
        $desire_5 = $mysqli->real_escape_string($desire_5);
        
        $query = "SELECT * FROM user_trophy WHERE ID_USER = $user->id_user AND ID_ACTION = $id_action";
        $mysqli->multi_query($query);
        $result = $mysqli->store_result();
        
                
        if ($result->num_rows == 0) {
        $mysqli->next_result();
        $query = "INSERT INTO `user_trophy` (`ID_USER`, `ID_ACTION`, `POSITION`, `PROMO_CODE`, `DESIRE_1`, `DESIRE_2`, `DESIRE_3`, `DESIRE_4`, `DESIRE_5`) VALUES ($user->id_user, $id_action, $position, '$promo', '$desire_1', '$desire_2', '$desire_3', '$desire_4', '$desire_5')"; 
        $mysqli->multi_query($query);
        $result = $mysqli->store_result();
        }

        if($result == true) {
            return true;
        } else {
            return false;
        }

        $result->close();
        $mysqli->next_result();
    }

    public static function getUserStat ($play_key){
        global $mysqli;
        
        $query = "call getUserStat('$play_key')";
        $mysqli->multi_query($query);
        $result = $mysqli->store_result();
        
        $stat = [];
        while ($stat_data = $result->fetch_assoc()) {
            $stat[] = $stat_data;
        }

        $result->close();
        $mysqli->next_result();

        return $stat;
    }

    public static function getQuestionStat ($question){
        global $mysqli;
        $question = $mysqli->real_escape_string($question);

        $query = "call getQuestionStat('$question')";
        $mysqli->multi_query($query);
        $result = $mysqli->store_result();
        
        $stat = [];
        while ($stat_data = $result->fetch_assoc()) {
            $stat[] = $stat_data;
        }

        $result->close();
        $mysqli->next_result();

        return $stat;
    }

    public static function getPromocod ($mail){
        global $mysqli;
        $mail = $mysqli->real_escape_string($mail);
        
        $query = "call getPromocod('$mail')";
        $mysqli->multi_query($query);
        $result = $mysqli->store_result();
        
        if ($result->num_rows == 0) {$promo = [];}
        else{
        $promo = [];
        while ($stat_data = $result->fetch_assoc()) {
            $promo[] = $stat_data;
        }
        }

        $result->close();
        $mysqli->next_result();

        return $promo;
    }

    public static function putUserBook($book){
        global $mysqli; // заводим базу в область видимости
        
        $last_session_id = $_COOKIE ['PHPSESSID'];
        
        $user = new self($last_session_id);
        $book = $mysqli->real_escape_string($book);
        $book = (int)$book;
        
        

        if($user->id_user == NULL) {
            $query = "UPDATE user_trophy SET GET_GIFT = GET_GIFT + 1 WHERE ID_USER = 1 AND ID_ACTION = $book"; 
            $mysqli->multi_query($query);
            $result = $mysqli->store_result();

            

        }else{
            $query = "SELECT * FROM user_trophy WHERE ID_USER = $user->id_user AND ID_ACTION = $book";
            $mysqli->multi_query($query);
            $result = $mysqli->store_result();
            
            
                
            if ($result->num_rows > 0) {
                $result->close();
                $mysqli->next_result();

                $query = "UPDATE user_trophy SET GET_GIFT = 1 WHERE ID_USER = $user->id_user AND ID_ACTION = $book"; 
                $mysqli->multi_query($query);
                $result = $mysqli->store_result();

                

            }else {
                $mysqli->next_result();

                $query = "UPDATE user_trophy SET GET_GIFT = GET_GIFT + 1 WHERE ID_USER = 1 AND ID_ACTION = $book"; 
                $mysqli->multi_query($query);
                $result = $mysqli->store_result();

                
            }
            
            if($result == true) {
                return true;
            } else {
                return false;
            }

            $result->close();
            $mysqli->next_result();
        }
    }

}


// $last_session_id = $_COOKIE ['PHPSESSID'];
// $user = new User ($last_session_id);

// User::signUpAuto(777, 666);
// $user = new User (777);
// User::putUserAnswer($user ->id_user, 2, 2);
// echo '<br>';
// echo '<br>';
// echo '<br>';
// echo '<pre>';
// var_dump ($user);
