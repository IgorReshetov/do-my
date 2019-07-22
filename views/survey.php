<?php 

require_once 'views/templates/header.php';
?>

<div id ='id-preloader' class="start-preloader">
<div class="loader"></div>
</div>

<div class="wrapper main">
    <h1 class="title <?=($play == 'play1')?'display-none':'display-block'?>" id= "fox-start" user = "<?=$user?>"><?=$title?></h1>
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
                    <div class="present"></div>
                </div>
            </div>
            <div class="slider-box-survey-arround">       
                <div class="slider-box-survey-before"></div>
                <div class="slider-box-survey-after"></div>
                <div class="slider-box-survey-hidden">
                    <div class="slider-box-survey-margin1">
                        <div class="slider-box-survey-margin2">
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
                                <div class="step-survey"></div>
                                <div class="step-survey"></div>
                                <div class="step-survey"></div>
                                <div class="step-survey"></div>
                                <div class="step-survey-start">Start</div>
                                <div class="step-survey-finish">Finish</div>
                            </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="board-right">
            <div class="board-right-hint">
                <div class="board-right-hint-value">3</div>
            </div>
        </div>
    </div>
    <table class="opros">
        <tbody>
        <tr class = "first">
            <th id="Q" colspan="2" ></th>
        </tr>
        <tr class = "second">
            <th id="QP" class = "first-picture" colspan="2" >
                    <div id="PF0" class="first-picture-wriper">
                        <div class="first-picture-block"></div>
                        <div class="first-picture-addpsev"></div>
                    </div>
                    <div id="PF1" class="first-picture-wriper">
                        <div class="first-picture-block"></div>
                        <div class="first-picture-addpsev"></div>
                    </div>
            </th>
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

    <div class="range" id = "range">
        <div class="range-dash">
        <input class="range-focus" id = "range-focus" type="range" name="range" min="0" max="100" step="20" value="50">
        <div class="range-min"></div>
        <div class="range-max"></div>
        <div class="range-value"></div>
        </div>
    </div>
    
    <div class="picture">
        <div class="picture-dash">
        <label id="P0" class="picture-wriper">
            <input class="picture-input" type="radio" name="radio" value="0">
            <div class="picture-addpsev"></div>
            <div class="picture-block"></div>
            <div class="picture-block-text"></div>
        </label>
        <label id="P1" class="picture-wriper">
            <input class="picture-input" type="radio" name="radio" value="0">
            <div class="picture-addpsev"></div>
            <div class="picture-block"></div>
            <div class="picture-block-text"></div>
        </label>
        <label id="P2" class="picture-wriper">
            <input class="picture-input" type="radio" name="radio" value="0">
            <div class="picture-addpsev"></div>
            <div class="picture-block"></div>
            <div class="picture-block-text"></div>
        </label>
        <label id="P3" class="picture-wriper">
            <input class="picture-input" type="radio" name="radio" value="0">
            <div class="picture-addpsev"></div>
            <div class="picture-block"></div>
            <div class="picture-block-text"></div>
        </label>
        <label id="P4" class="picture-wriper">
            <input class="picture-input" type="radio" name="radio" value="0">
            <div class="picture-addpsev"></div>
            <div class="picture-block"></div>
            <div class="picture-block-text"></div>
        </label>
        <label id="P5" class="picture-wriper">
            <input class="picture-input" type="radio" name="radio" value="0">
            <div class="picture-addpsev"></div>
            <div class="picture-block"></div>
            <div class="picture-block-text"></div>
        </label>
        </div>
    </div>

    <table class="prev_next">
        <tr id = "tr-answer">
            <td class="prev_next-block">
            <div id="hint" class = "hint" >ПОДСКАЗКА</div>
            </td>
            <td class="prev_next-block">
            <div id="next" class = "next" >ОТВЕТИТЬ</div>
            </td>
        </tr>
    </table>

    
    <?php
    // переключатель ландинга для первого захода, либо кнопки круга при повторном заходе
    if ($play == 'play1'){
        echo ('
        <div class="land" id = "land">
        <div class="land-block land-block1">
            <div class="land-block-text land-block1-text">
                <div class="land-block-question land-block1-question"></div>
                <div class="land-block-answer land-block1-answer">Получите оптимальную квартиру<br>за 15 минут теста<br>вместо месяца самостоятельного поиска</div>
            </div>
        </div>
        <div class="land-block land-block5">
            <div class="land-block-text land-block5-button" id = "land-block5-button">Начать</div>
        </div>
    </div>
    ');

    }else{
        echo ("
        <div id='button' class = 'button $play'></div>
        ");
    }
    ?>

    <div id="result">
        <div id="result-left"></div>
        <div id="result-center">
            <div class="result-image">
                <div id="image"></div>
            </div>
            <div class="result-info">
                <div id="true"></div>
                <div id="false"></div>
            </div>
            <div class="result-why">
                <div id="why-title">Пояснение:</div>
                <div id="why"></div>
            </div>
            <div class="result-forwad">
                <div id="forward" class="forward" >ПРОДОЛЖИТЬ</div>
                <div id="saveGame" class="forward" >СОХРАНИТЬ <br>и вернуться позже</div>
            </div>
        </div>
        <div id="result-right"></div>
    </div>

    <div class="gift">
        <div class="gift-left"></div>
        <div class="gift-center">
            <div class="gift-heard">
                <div class="gift-heard-text">
                    <div class="gift-heard-blok-text">Поздравляем! <br> Вы завершили наш тест</div>
                </div>
                <div class="gift-heard-present">
                    <div class="gift-block-present"></div>
                </div>
            </div>
            <div class="gift-block1"></div>
                <div class="gift-block1-head">Результаты прохождения теста:</div>
                <div class="gift-block1-row">
            
            <?php
            //готовим диаграммы статистики по итогам игры /доработка для IE
            if(($active_question == $count)){

                $sum_count_true=0;
                $sum_count_all=0;
                
                for ($i=0; $i<count($stat); $i++) {
                    $sum_count_true = $sum_count_true + $stat[$i]{'count_true'};
                    $sum_count_all = $sum_count_all + $stat[$i]{'count_all'};
                    $rate = round($stat[$i]{'count_true'}/$stat[$i]{'count_all'}*100)."%";
                    $graf = round($stat[$i]{'count_true'}/$stat[$i]{'count_all'}*100)." ".(100-round($stat[$i]{'count_true'}/$stat[$i]{'count_all'}*100));
                    echo ('
                        <div class="gift-block1-diagr">
                            <svg width="100%" height="100%" viewBox="0 0 42 42" class="gift-svg">
                                <circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
                                <circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d2d3d4" stroke-width="4"></circle>
                                <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#0000ff" stroke-width="4" stroke-dasharray="'.$graf.'" stroke-dashoffset="25"></circle>
                            </svg>
                            <div class="gift-block1-diagr-data">'.$rate.'</div>
                            <div class="gift-block1-diagr-label">'.$stat[$i]{'group_name'}.'</div>
                        </div>
                    ');
                }

      
                $graf = round(($sum_count_true/$sum_count_all)*100)." ".(100-round(($sum_count_true/$sum_count_all)*100));

                $rate = round(($sum_count_true/$sum_count_all)*100)."%";
                echo ('
                    <div class="gift-block1-diagr">
                        <svg width="100%" height="100%" viewBox="0 0 42 42" class="gift-svg">
                            <circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
                            <circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d2d3d4" stroke-width="6"></circle>
                            <circle id = "svg-index" class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#0000ff" stroke-width="6" stroke-dasharray="'.$graf.'" stroke-dashoffset="25"></circle>
                        </svg>
                        <div class="gift-block1-diagr-data">'.$rate.'</div>
                        <div class="gift-block1-diagr-label">Все</div>
                    </div>
                ');
            }
            
            ?>
                </div>
            <div class="gift-block2">
                <div class="gift-block2-head">Идеальной для вас будет квартира в ЖК "Любовь и голуби"</div>
                <div class="gift-block2-head-spisok">Мы подготовили вам в подарок:</div>
                <div class="gift-block2-text">
                    <div class="gift-block-text-icon">
                        <div class="gift-block-text-icon-yellow"></div>
                    </div>
                    <div class="gift-block-text-text"><?=$prize?></div>
                </div>
                
                <div class="gift-block2-text">
                    <div class="gift-block-text-icon">
                        <div class="gift-block-text-icon-red"></div>
                    </div>
                    <div class="gift-block-text-text">Ответы на вопросы нашего теста, чтобы впредь вы никода не ошибались при выборе квартиры</div>
                </div> 
                
                <!-- выбор двых параметров пожеланий -->
                <!-- <div class="gift-block2-desires">
                    <div class="gift-block2-desire1">
                        <select name="place" id="gift-block2-desire1-place">
                        <option value="0" style="display:none">Округ Москвы, где вы ищите квартиру</option>
                        <option value="C">Центральный округ Москвы</option>
                        <option value="N">Северный округ Москвы</option>
                        <option value="NW">Северо-Восточный округ Москвы</option>
                        <option value="W">Восточный округ Москвы</option>
                        <option value="SW">Юго-Восточный округ Москвы</option>
                        <option value="S">Южный округ Москвы</option>
                        <option value="SE">Юго-Западный округ Москвы</option>
                        <option value="E">Западный округ Москвы</option>
                        <option value="NE">Северо-Западный округ Москвы</option>
                        <option value="Z">Зеленоградский округ Москвы</option>
                        <option value="N">Новая Москва Москвы</option>
                        </select>
                    </div>
                    <div class="gift-block2-desire2">
                        <select name="room" id="gift-block2-desire2-room">
                        <option value="0" style="display:none">Количество комнат в квартире</option>
                        <option value="1">Однокмонатная квартира</option>
                        <option value="2">Двухкомнатная квартира</option>
                        <option value="3">Трехкомнатная квартира</option>
                        <option value="4">Четырехкомнатная квартира</option>
                        </select>
                    </div>
                </div> -->

            </div>
            <div class="gift-block3">
                <div class="gift-block3-head">Получите подарок на свой email:</div>
                <div class="gift-get" id = "gift-get">
                    <div class="gift-mail-small-box">
                        <input class="gift-get-mail" onfocus="fox.speak_multi();" id = "mail" name = "mail" type="text" placeholder= "Введите email">
                    </div>
                    <label class="gift-get-check" id = "privacy">
                        <div class="gift-get-check-right" id = "check-text">Подтвердите oзнакомление с политикой конфиденциальности</div>
                        <div class="gift-get-check-left">
                            <input type="checkbox" class = "check-privacy" id ="privacy-check" name ="privacy" value="0">
                            <div class="addpsev-privacy"></div>
                        </div>
                    </label>
                </div>
                <div class="gift-button" >
                    <div class="gift-button-get" id = "gift-button-get">ПОЛУЧИТЬ</div>
                </div>
            </div>
            
        </div>
        <div class="gift-right"></div>
    </div>

         
    <!-- 'это будущий блок проверки на бота. сюда помещаем ловушки кнопки и чекбоксы, разбросанные незаметно для пользователя по всему экрану -->
    <div class="hello"></div> 



</div>

<div id="dark"></div>

<script src="views/js/jquery-3.3.1.js"></script>
<script src="views/js/preloader.js?ver=<?=VER?>"></script>
<script src="views/js/survey.js?ver=<?=VER?>"></script>


<?php

require_once 'views/templates/footer.php';