<?php
require_once 'models/User.php';

$stat = User::getUserStat($_SESSION['play_key']);

echo json_encode($stat);

die;