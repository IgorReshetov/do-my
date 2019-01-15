<?php

// ПРИМЕР КЛАССА МОДЕЛИ

// class User 
// {
//     public $id;
//     public $name;
//     public $email;
//     public $pass;
//     public $role;

//     public function __construct($id)
//     {
//         global $mysqli;

//         $query = "SELECT user_id, name, email, pass, role FROM users WHERE user_id=$id";
//         $result = $mysqli->query($query);

//         $user_data = $result->fetch_assoc();

//         $this->id = $user_data['user_id'];
//         $this->name = $user_data['name'];
//         $this->email = $user_data['email'];
//         $this->pass = $user_data['pass'];
//         $this->role = $user_data['role'];
//     }

//     public static function register($email, $pass)
//     {
//         global $mysqli;

//         if(!self::getByEmail($email)) {
//             $pass = password_hash($pass, PASSWORD_BCRYPT);

//             $query = "INSERT INTO users (name, email, pass, role)
//                     VALUES ('Пользователь', '$email', '$pass', 2)"; //мб для name и role стоит записать в базу значения по умолчанию, чтобы тут их не писать?
//             $result = $mysqli->query($query);

//             if($result) {
//                 $user = self::getByEmail($email);
//                 return $user->id;
//             } else {
//                 return false;
//             }
//         } else {
//             return false;
//         }
//     }

//     public static function getAll()
//     {
//         global $mysqli;

//         $query = "SELECT user_id FROM users";
//         $result = $mysqli->query($query);

//         $users = [];
//         while ($user_data = $result->fetch_assoc()) {
//             $users[] = new self($user_data['user_id']);
//         }

//         return $users;
//     }

//     public static function getByEmail($email)
//     {
//         global $mysqli;

//         $query = "SELECT user_id FROM users WHERE email='$email'";
//         $result = $mysqli->query($query);

//         if($result->num_rows != 0) {
//             $user_data = $result->fetch_assoc();
//             $user = new self($user_data['user_id']);
//             return $user;
//         } else {
//             return false;
//         }        
//     }
// }

// $user = new User(1);
// var_dump($user);
// echo '<hr>';
// $users = User::getAll();
// var_dump($users);
// $user = User::getByEmail('admin@admin.ru');
// echo '<pre>';
// var_dump($user);
// $user = User::register("qwerty@protonmail.com", "456");
// echo '<pre>';
// var_dump($user);