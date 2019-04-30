<?php

$user = $_SESSION['life']; 
$_SESSION['life'] = 'old';

if(isset($_REQUEST['back'])){$user = 'back';}

require_once 'views/start.php';
