<?php

if( !isset($_SESSION['proect_left']) ) {
    $proect_left =[2,0,0,0,0,0,0];
} else {
    $proect_left = $_SESSION['proect_left']; 
}
if( !isset($_SESSION['proect_right']) ) {
    $proect_right =[2,0,0,0,0,0,0];
} else {
    $proect_right = $_SESSION['proect_right']; 
}

require_once 'views/proect.php';
