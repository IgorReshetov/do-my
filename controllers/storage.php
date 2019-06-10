<?php


if(isset($_REQUEST['book'])){$book = $_REQUEST['book'];}

$book = 5;

switch ($book) {
    case 1:
    $file_name = "60 ответов квиза по жилью";
    $file_paht = "http://do-my.ru/storage/book_1.pdf";
    break;
    
    case 2:
    $file_name = "30 ответов квиза по жилью";
    $file_paht = "http://do-my.ru/storage/book_2.pdf";
    break;

    case 3:
    $file_name = "30 ответов квиза по жилью";
    $file_paht = "http://do-my.ru/storage/book_3.pdf";
    break;

    case 4:
    $file_name = "30 ответов квиза по жилью";
    $file_paht = "http://do-my.ru/storage/book_4.pdf";
    break;

    case 5:
    $file_name = "Скидка на квартиру";
    $file_paht = "http://do-my.ru/storage/love_pigeons.pdf";
    break;

    default:
    die;
    break;
    }


require_once 'views/storage.php';