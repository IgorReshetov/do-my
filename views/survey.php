<?php 

require_once 'views/templates/header.php';
?>

<div class="main">
    <table class="opros">
        <tr>
            <th colspan="2" class="Q"><?=$question->question?></th>
        </tr>
        <tr>
            <td class="right">1</td>
            <td class="left">Вариант ответа 1</td>
        </tr>
        <tr>
            <td class="right">2</td>
            <td class="left">Вариант ответа 2</td>
        </tr>
        <tr>
            <td class="right">3</td>
            <td class="left">Вариант ответа 3</td>
        </tr>
        <tr>
            <td class="right">4</td>
            <td class="left">Вариант ответа 4</td>
        </tr>
    </table>

    <table class="prev_next">
        <tr>
            <td id="prev">Предыдущий вопрос</td>
            <td id="next">Следующий вопрос</td>
        </tr>
    </table>

    <div id='button'>Начать опрос</div>
</div>

<!-- <div class="wrapper">
    <div id="Qst">?=$question->question?></div>
    <div id="Asw">1-3 месяца</div>
    <div id='button'>Следующий вопрос</div>
        
</div> -->

<!-- пример foreach php -->
<?php 
// foreach ($collections as $collection) {
// echo '<option value="'.$collection->id.'">'.$collection->title.'</option>';
// };
?>


<script src="views/js/survey.js"></script>
<?php

require_once 'views/templates/footer.php';