<?php 

require_once 'views/templates/header.php';
?>

<div class="main">
    <div class='slider-box-main'>
        <div class="slider-box-level">
            <div class="slider-level">
                <div class="step-level">1/6</div>
                <!-- <div class="step-level"></div>
                <div class="step-level"></div>     -->
            </div>
        </div>
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
            <td id="prev" style="display:none">Предыдущий вопрос</td>
            <td id="next" >ОТВЕТИТЬ</td>
        </tr>
    </table>

    <div id='button'>Начать опрос</div>

    <div id="result">
        <img id="image_true" src="views/images/survey/elephant.png" alt="">
        <img id="image_false" src="views/images/icon/Vlad_Pal.jpg" alt="">  
        <div id="true">Вы знаете правильный ответ. Поздравляем.</div>
        <div id="false">Кажется вы ошиблись. Попробуйте снова.</div>
        <div id="why">1111</div>
        <div id="forward">Продолжить</div>
    </div> 
   
    <!-- 'это будущий блок проверки на бота. сюда помещаем ловушки кнопки и чекбоксы, разбросанные незаметно для пользователя по всему экрану -->
    <div class="hello"></div> 

</div>

<div id="dark"></div>

<script src="views/js/survey.js"></script>
<?php

require_once 'views/templates/footer.php';