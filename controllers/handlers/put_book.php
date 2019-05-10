<?php
require_once 'models/User.php';

$postData = file_get_contents('php://input');

$data = json_decode($postData, true);

$book = $data['book'];

User::putUserBook($book);//запись трофеев в базу пока без позиции и желаний

echo json_encode(true);
die;
