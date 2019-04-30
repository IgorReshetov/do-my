<?php
require_once 'models/User.php';

$last_session_id = $_COOKIE ['PHPSESSID'];

$user = new User($last_session_id);

$stat = User::getUserStat($user->id_user, ACTION);

echo json_encode($stat);

die;