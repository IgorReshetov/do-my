<?php 

require_once 'views/templates/header.php';
?>

<div class="wrapper main">
    <h1 class="title">Эта игра подскажет, где вам лучше жить </h1>
    <div class="board">
        <div class="board-left">
            <div class="result1">
                <div>Easy done</div>
            </div>
            <div class="result2">
                <div>Medium done</div>
            </div>
        </div>
        <div class='slider-box-main'>
            <div class="slider-box-level">
                <div class="slider-level">
                    <div class="step-level">1/6</div>
                </div>
                <div class="slider-level-fovard">
                    <div class="step-level2">2</div>
                    <div class="step-level3">2</div>
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
        <div class="board-right"></div>
    </div>
    <table class="opros">
        <tbody>
        <tr class = "first">
            <th colspan="2" id="Q"></th>
        </tr>
        <tr>
            <td id="A0" class="left"></td>
            <td class="right">
                <label>
                <input type="radio" name="radio" value="0">
                <div class="addpsev"></div>
                </label>
            </td>
        </tr>
        <tr>
            <td id="A1" class="left"></td>
            <td class="right">
                <label>
                <input type="radio" name="radio" value="0">
                <div class="addpsev"></div>
                </label>
            </td>
        </tr>
        <tr>
            <td id="A2" class="left"></td>
            <td class="right">
                <label>
                <input type="radio" name="radio" value="0">
                <div class="addpsev"></div>
                </label>
            </td>
        </tr>
        <tr>
            <td id="A3" class="left"></td>
            <td class="right">
                <label>
                <input type="radio" name="radio" value="0">
                <div class="addpsev"></div>
                </label>
            </td>
        </tr>
        <tr>
            <td id="A4" class="left"></td>
            <td class="right">
                <label>
                <input type="radio" name="radio" value="0">
                <div class="addpsev"></div>
                </label>
            </td>
        </tr>
        <tr>
            <td id="A5" class="left"></td>
            <td class="right">
                <label> 
                <input type="radio" name="radio" value="0">
                <div class="addpsev"></div>
                </label>
            </td>
        </tr>
        <tr>
            <td id="A6" class="left"></td>
            <td class="right">
                <label>
                <input type="radio" name="radio" value="0">
                <div class="addpsev"></div>
                </label>
            </td>
        </tr>
        </tbody>
    </table>

    <table class="prev_next">
        <tr id = "tr-answer">
            <td id="next" class = "next" >ОТВЕТИТЬ</td>
        </tr>
    </table>

    <div id='button' class = 'button <?=$play?>'></div>

    <div id="result">
        <div id="result-left"></div>
        <div id="result-center">
            <div class="result-image">
                <div id="image"></div>
            </div>
            <div class="result-info">
                <div id="true">Вы знаете правильный ответ. Поздравляем!</div>
                <div id="false">Вы ошиблись. Вопрос ждет вашего возвращения.</div>
            </div>
            <div class="result-why">
                <div id="why-title">Пояснение:</div>
                <div id="why"></div>
            </div>
            <div class="result-forwad">
                <div id="forward" class="forward" >ПРОДОЛЖИТЬ</div>
            </div>
        </div>
        <div id="result-right"></div>
    </div>
       
    <!-- 'это будущий блок проверки на бота. сюда помещаем ловушки кнопки и чекбоксы, разбросанные незаметно для пользователя по всему экрану -->
    <div class="hello"></div> 

</div>

<div id="dark"></div>

<script src="views/js/survey.js"></script>
<?php

require_once 'views/templates/footer.php';