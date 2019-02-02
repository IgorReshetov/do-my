<?php 
require_once 'views/templates/header.php';
?>

<div class="wrapper block-proect" id="first">
    <h1 class="proect-h1">Рекомендательный сервис выбора жилья</h1>
    <div class="row-proect" left="<?=$proect_left[0]?>" right="<?=$proect_right[0]?>" id="top">
        <div class="column1-proect column-proect column-proect-light-red">
            <div class="column-proect-text <?=($proect_left[0] == 1)?'display-block':''?>">Зачем нужен сервис?</div> 
            <div class="column-proect-text <?=($proect_left[0] == 2)?'display-block':''?>">Мы точно скажем вам, где лучше жить.</div>
        </div>
        <div class="column2-proect column-proect column2-image1" id="top-image"><img src="views/images/icon/question_ring.svg" class="<?=($proect_left[0]+$proect_right[0] > 2)?'opacity07':''?> <?=($proect_left[0]+$proect_right[0] > 3)?'display-none':''?>"></div>
        <div class="column3-proect column-proect column-proect-light-red">
            <div class="column-proect-text <?=($proect_right[0] == 1)?'display-block':''?>">Здесь будут только рекомендации по жилью?</div>
            <div class="column-proect-text <?=($proect_right[0] == 2)?'display-block':''?>">Начинаем с жилья. Дальше будем добывать информацию по другим сервисам.</div> 
        </div>
    </div>

    <div class="row-proect" left="<?=$proect_left[1]?>" right="<?=$proect_right[1]?>">
        <div class="column1-proect column-proect">
            <div class="column-proect-text <?=($proect_left[1] == 1)?'display-block':''?> display-none" row ="5" pos = "1">Кто в проекте больше всех заботится о пользователях?</div> 
            <div class="column-proect-text <?=($proect_left[1] == 2)?'display-block':''?>" row ="2" pos = "1">У нас есть один ученный, где он?</div>
            <div class="column-proect-text <?=($proect_left[1] == 3)?'display-block':''?>" row ="2" pos = "3">Кто у нас главный по тарелочкам?</div>
            <div class="column-proect-text <?=($proect_left[1] == 4)?'display-block':''?>" row ="0" pos = "0"><i>"Чтобы видеть дальше других, нужно стоять на плечах гигантов"</i></div>
        </div>
        <div class="column2-proect column-proect column2-image2"><img src="views/images/icon/question_ring.svg" class="<?=($proect_right[1] > 0)?'opacity07':''?> <?=($proect_left[1]+$proect_right[1] == 7)?'display-none':''?>"></div>
        <div class="column3-proect column-proect">
            <div class="column-proect-text <?=($proect_right[1] == 1)?'display-block':''?>"><b>Игорь:</b> разработчик back-end.</div>
            <div class="column-proect-text <?=($proect_right[1] == 2)?'display-block':''?>"><b>Игорь:</b> администратор хостинга сайта.</div>
            <div class="column-proect-text <?=($proect_right[1] == 3 && $proect_left[1]+$proect_right[1] < 6)?'display-block':''?>"><b>Игорь:</b> лидер команды.</div>
            <div class="column-proect-text <?=($proect_left[1]+$proect_right[1] == 7)?'display-block':''?>"><b>Игорь:</b> разработчик back-end, администратор хостинга сайта, лидер команды.</div>
        </div>
    </div>

    <div class="row-proect" left="<?=$proect_left[2]?>" right="<?=$proect_right[2]?>">
        <div class="column1-proect column-proect">
            <div class="column-proect-text <?=($proect_left[2] == 1)?'display-block':''?>" row ="4" pos ="1">Кто по ночам пишет на нативном Java Script?</div> 
            <div class="column-proect-text <?=($proect_left[2] == 2)?'display-block':''?>" row ="4" pos = "2">Разве юрист и compliance может быть фронтовиком?</div>
            <div class="column-proect-text <?=($proect_left[2] == 3)?'display-block':''?>" row ="1" pos = "3">Кто в команде может не выполнить задачу спринта, но при этом выиграть войну?</div>
            <div class="column-proect-text <?=($proect_left[2] == 4)?'display-block':''?>" row ="0" pos = "0"><i>"Ничто так не способствует успешному внедрению новшеств, как отсутствие проверок."</i></div>
        </div>
        <div class="column2-proect column-proect column2-image3"><img src="views/images/icon/question_ring.svg" class="<?=($proect_right[2] > 0)?'opacity07':''?> <?=($proect_left[2]+$proect_right[2] == 7)?'display-none':''?>"></div>
        <div class="column3-proect column-proect">
            <div class="column-proect-text <?=($proect_right[2] == 1)?'display-block':''?>"><b>Сергей:</b> data scientist.</div>
            <div class="column-proect-text <?=($proect_right[2] == 2)?'display-block':''?>"><b>Сергей:</b> администратор конфигурации ПО.</div>
            <div class="column-proect-text <?=($proect_right[2] == 3 && $proect_left[2]+$proect_right[2] < 7)?'display-block':''?>"><b>Сергей:</b> технический директор.</div>
            <div class="column-proect-text <?=($proect_left[2]+$proect_right[2] == 7)?'display-block':''?>"><b>Сергей:</b> data scientist, администратор конфигурации ПО, технический директор.</div>
        </div>
    </div>

    <div class="row-proect" left="<?=$proect_left[3]?>" right="<?=$proect_right[3]?>">
        <div class="column1-proect column-proect">
            <div class="column-proect-text <?=($proect_left[3] == 1)?'display-block':''?>" row ="6" pos ="1">Этот человек не имеет права на ошибку, он наш последний рубеж?</div> 
            <div class="column-proect-text <?=($proect_left[3] == 2)?'display-block':''?>" row ="1" pos = "2">У нас есть сапер в команде - он может ошибится только один раз?</div>
            <div class="column-proect-text <?=($proect_left[3] == 3)?'display-block':''?>" row ="0" pos = "0"><i>"Лучший способ предсказать будущее - это создать его"</i></div>
        </div>
        <div class="column2-proect column-proect column2-image4"><img src="views/images/icon/question_ring.svg" class="<?=($proect_right[3] > 0)?'opacity07':''?> <?=($proect_left[3]+$proect_right[3] == 5)?'display-none':''?>"></div>
        <div class="column3-proect column-proect">
            <div class="column-proect-text <?=($proect_right[3] == 1)?'display-block':''?>"><b>Станислав:</b> SEO оптимизация и продвижение проекта.</div>
            <div class="column-proect-text <?=($proect_right[3] == 2 && $proect_left[3]+$proect_right[3] < 6)?'display-block':''?>"><b>Станислав:</b> директор по марктетингу.</div>
            <div class="column-proect-text <?=($proect_left[3]+$proect_right[3] == 5)?'display-block':''?>"><b>Станислав:</b> SEO оптимизация и продвижение проекта, директор по марктетингу.</div>
        </div>
    </div>

    <div class="row-proect" left="<?=$proect_left[4]?>" right="<?=$proect_right[4]?>">
        <div class="column1-proect column-proect">
            <div class="column-proect-text <?=($proect_left[4] == 1)?'display-block':''?>" row ="3" pos = "1">Он продвигает нас вперед и следит за пауками?</div> 
            <div class="column-proect-text <?=($proect_left[4] == 2)?'display-block':''?>" row ="6" pos = "2">У него нет незаменимых, но они решают все?</div>
            <div class="column-proect-text <?=($proect_left[4] == 3)?'display-block':''?>" row ="0" pos = "0"><i>"Мы никогда не узнаем то что ищем, пока не найдем это"</i></div>
        </div>
        <div class="column2-proect column-proect column2-image5"><img src="views/images/icon/question_ring.svg" class="<?=($proect_right[4] > 0)?'opacity07':''?> <?=($proect_left[4]+$proect_right[4] == 5)?'display-none':''?>"></div>
        <div class="column3-proect column-proect">
            <div class="column-proect-text <?=($proect_right[4] == 1)?'display-block':''?>"><b>Юрий:</b> разработчик front-end.</div>
            <div class="column-proect-text <?=($proect_right[4] == 2 && $proect_left[4]+$proect_right[4] < 5)?'display-block':''?>"><b>Юрий:</b> compliance, правовая защита, безопасноть.</div>
            <div class="column-proect-text <?=($proect_left[4]+$proect_right[4] == 5)?'display-block':''?>"><b>Юрий:</b> разработчик front-end, compliance, правовая защита, безопасноть.</div>
        </div>
    </div>

    <div class="row-proect" left="<?=$proect_left[5]?>" right="<?=$proect_right[5]?>">
        <div class="column1-proect column-proect">
            <div class="column-proect-text <?=($proect_left[5] == 1)?'display-block':''?>" row = "1" pos = "1">Кто среди нас больше всех любит объекты и кует победу в тылу?</div> 
            <div class="column-proect-text <?=($proect_left[5] == 2)?'display-block':''?>" row ="2" pos ="2">В его руках все богатство команды?</div>
            <div class="column-proect-text <?=($proect_left[5] == 3)?'display-block':''?>" row ="0" pos = "0"><i>"Успех - это умение двигаться от одной неудачи к другой, не теряя энтузиазма"</i></div>
        </div>
        <div class="column2-proect column-proect column2-image6"><img src="views/images/icon/question_ring.svg" class="<?=($proect_right[5] > 0)?'opacity07':''?> <?=($proect_left[5]+$proect_right[5] == 5)?'display-none':''?>"></div>
        <div class="column3-proect column-proect">
            <div class="column-proect-text <?=($proect_right[5] == 1)?'display-block':''?>"><b>Татьяна:</b> UI/UX дизайнер.</div>
            <div class="column-proect-text <?=($proect_right[5] == 2 && $proect_left[5]+$proect_right[5] < 5)?'display-block':''?>"><b>Татьяна:</b> администратор команды.</div>
            <div class="column-proect-text <?=($proect_left[5]+$proect_right[5] == 5)?'display-block':''?>"><b>Татьяна:</b> UI/UX дизайнер, администратор команды.</div>
        </div>
    </div>

    <div class="row-proect" left="<?=$proect_left[6]?>" right="<?=$proect_right[6]?>">
        <div class="column1-proect column-proect">
            <div class="column-proect-text <?=($proect_left[6] == 1)?'display-block':''?>" row ="5" pos = "2">Кто в нашей команде самый пунктуальный?</div> 
            <div class="column-proect-text <?=($proect_left[6] == 2)?'display-block':''?>" row ="3" pos = "2">Он знает, что нужно продавать не сверла, а отверстия - определенного диаметра?</div>
            <div class="column-proect-text <?=($proect_left[6] == 3)?'display-block':''?>" row ="0" pos = "0"><i>"Только те, кто предпринимают абсурдные попытки, смогут достичь невозможного"</i></div>
        </div>
        <div class="column2-proect column-proect column2-image7"><img src="views/images/icon/question_ring.svg" class="<?=($proect_right[6] > 0)?'opacity07':''?> <?=($proect_left[6]+$proect_right[6] == 5)?'display-none':''?>"></div>
        <div class="column3-proect column-proect">
            <div class="column-proect-text <?=($proect_right[6] == 1)?'display-block':''?>"><b>Владимир:</b> тестирование ПО.</div>
            <div class="column-proect-text <?=($proect_right[6] == 2 && $proect_left[6]+$proect_right[6] < 5)?'display-block':''?>"><b>Владимир:</b> HR директор.</div>
            <div class="column-proect-text <?=($proect_left[6]+$proect_right[6] == 5)?'display-block':''?>"><b>Владимир:</b> тестирование ПО, HR директор.</div>
        </div>
    </div>

<br>
</div>
<script src="views/js/proect.js"></script>
<?php
require_once 'views/templates/footer.php';