<?php 

require_once 'views/templates/header.php';
?>

<div class="main">
    <div class="slider-box-survey-arround">
        <div class="slider-box-survey-before"></div>
        <div class="slider-box-survey-after"></div>
        <div class="slider-box-survey">
            <div class="slider-survey">
                <div class="step-survey"></div>
                <div class="step-survey"></div>
                <div class="step-survey"></div>
                <div class="step-survey"></div>
                <div class="step-survey"></div>
                <div class="step-survey"></div>
                <div class="step-survey"></div>
                <div class="step-survey"></div>
                <div class="step-survey"></div>
                <div class="step-survey"></div>
                <div class="step-survey"></div>
                <div class="step-survey"></div>
            </div>
        </div>
    </div>
    <table class="opros">
        <tr>
            <th colspan="2" id="Q"></th>
        </tr>
        <tr>
            <td class="right">
                <input type="radio" name="radio" value="0">
            </td>
            <td id="A0" class="left">Вариант ответа 1</td>
        </tr>
        <tr>
            <td class="right">
                <input type="radio" name="radio" value="1">
            </td>
            <td id="A1" class="left">Вариант ответа 2</td>
        </tr>
        <tr>
            <td class="right">
                <input type="radio" name="radio" value="2">
            </td>
            <td id="A2" class="left">Вариант ответа 3</td>
        </tr>
        <tr>
            <td class="right">
                <input type="radio" name="radio" value="3">
            </td>
            <td id="A3" class="left">Вариант ответа 4</td>
        </tr>
        <tr>
            <td class="right">
                <input type="radio" name="radio" value="4">
            </td>
            <td id="A4" class="left">Вариант ответа 5</td>
        </tr>
    </table>

    <table class="prev_next">
        <tr>
            <td id="prev">Предыдущий вопрос</td>
            <td id="next">ОТВЕТИТЬ</td>
        </tr>
    </table>

    <div id='button'>Начать опрос</div>

    <!-- 'это будущий блок проверки на бота. сюда помещаем ловушки кнопки и чекбоксы, разбросанные незаметно для пользователя по всему экрану -->
    <div class="hello"></div> 

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