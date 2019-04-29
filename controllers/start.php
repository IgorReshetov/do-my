<?php

$user = $_SESSION['life']; 
$_SESSION['life'] = 'old';

require_once 'views/start.php';
