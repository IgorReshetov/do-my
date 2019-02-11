<?php

require_once 'models/Question.php';
require_once 'models/Answer.php';

// ПРИМЕР работы хранимой процедуры

// создаю таблицу для пробы
$mysqli->query("DROP TABLE IF EXISTS test");
$mysqli->query("CREATE TABLE test(id INT)");
$mysqli->query("INSERT INTO test(id) VALUES (1), (2), (3)");

// создаю процедуру для пробы
$mysqli->query("DROP PROCEDURE IF EXISTS p");
$mysqli->query('CREATE PROCEDURE p() READS SQL DATA BEGIN SELECT id FROM test; END;');

// побеждаю проблему с повторным вызовом процедуры
$mysqli->multi_query("CALL p()");
$res = $mysqli->store_result();
echo '<pre>';
var_dump($res->fetch_all());
$res->close();
$mysqli->next_result();


$mysqli->query("INSERT INTO test(id) VALUES (10), (20), (30)");

$mysqli->multi_query("CALL p()");
$res = $mysqli->store_result();
echo '<pre>';
var_dump($res->fetch_all());
$mysqli->next_result();