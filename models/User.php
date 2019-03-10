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

    public static function putUserAnswer($id_user, $id_question, $id_answer, $info = 'NULL', $scale_value = 'NULL')
    {
        global $mysqli;
        $id_user = $mysqli->real_escape_string($id_user);
        $id_question = $mysqli->real_escape_string($id_question);
        $id_answer = $mysqli->real_escape_string($id_answer);
        $scale_value = $mysqli->real_escape_string($scale_value);

        $query = "call putUserAnswer($id_user, $id_question, $id_answer, $info, $scale_value)";
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
