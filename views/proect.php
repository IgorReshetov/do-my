<?php 
require_once 'views/templates/header.php';
?>
<link rel="stylesheet" href="views/css/imagefoto.css">
<div id ='id-preloader' class="start-preloader">
<div class="loader"></div>
</div>

<div class="wrapper block-proect" id="first">
    <h1 class="proect-h1">Для чего и кто делает проект?</h1>
    <div class="row-proect" left="<?=$proect_left[0]?>" right="<?=$proect_right[0]?>" id="top">
        <div class="column1-proect column-proect column-proect-light-red">
            <div class="column-proect-text <?=($proect_left[0] == 1)?'display-block':''?>">Зачем нужен сервис?</div> 
            <div class="column-proect-text <?=($proect_left[0] == 2)?'display-block':''?>">Наши тесты дадут вам скидки, призы, знания и яркие впечатления!</div>
        </div>
        <div class="column2-proect column-proect column2-image1" id="top-image"><img src="views/images/icon/question_ring.svg" class="<?=($proect_left[0]+$proect_right[0] > 2)?'opacity07':''?> <?=($proect_left[0]+$proect_right[0] > 3)?'display-none':''?>"></div>
        <div class="column3-proect column-proect column-proect-light-red">
            <div class="column-proect-text <?=($proect_right[0] == 1)?'display-block':''?>">Здесь будут только тесты по жилью?</div>
            <div class="column-proect-text <?=($proect_right[0] == 2)?'display-block':''?>">Начинаем с жилья. Дальше будут тесты обо всем на свете.</div> 
        </div>
    </div>

    <div class="row-proect" left="<?=$proect_left[1]?>" right="<?=$proect_right[1]?>">
        <div class="column1-proect column-proect">
            <div class="column-proect-text <?=($proect_left[1] == 1)?'display-block':''?> display-none" row ="4" pos = "1">Кто в проекте больше всех заботится о пользователях?</div> 
            <div class="column-proect-text <?=($proect_left[1] == 2)?'display-block':''?>" row ="3" pos = "1">Кто по ночам кодит на нативном Java Script?</div>
            <div class="column-proect-text <?=($proect_left[1] == 4)?'display-block':''?>" row ="0" pos = "0"><i>"Чтобы видеть дальше других, нужно стоять на плечах гигантов."</i></div>
        </div>
        <div class="column2-proect column-proect column2-image2"><img src="views/images/icon/question_ring.svg" class="<?=($proect_right[1] > 0)?'opacity07':''?> <?=($proect_left[1]+$proect_right[1] == 7)?'display-none':''?>"></div>
        <div class="column3-proect column-proect">
            <div class="column-proect-text <?=($proect_right[1] == 1)?'display-block':''?>"><b>Игорь:</b> разработчик back-end, администратор хостинга.</div>
            <div class="column-proect-text <?=($proect_right[1] == 2)?'display-block':''?>"><b>Игорь:</b> лидер команды.</div>
            <div class="column-proect-text <?=($proect_left[1]+$proect_right[1] == 7)?'display-block':''?>"><b>Игорь:</b> разработчик back-end, администратор хостинга, лидер команды.</div>
        </div>
    </div>

    <div class="row-proect" left="<?=$proect_left[2]?>" right="<?=$proect_right[3]?>">
        <div class="column1-proect column-proect">
            <div class="column-proect-text <?=($proect_left[2] == 1)?'display-block':''?>" row ="4" pos ="2">Кто в нашей команде самый пунктуальный?</div> 
            <div class="column-proect-text <?=($proect_left[2] == 2)?'display-block':''?>" row ="1" pos = "2">Кто может не взять крепость, но при этом выиграть войну?</div>
            <div class="column-proect-text <?=($proect_left[2] == 3)?'display-block':''?>" row ="0" pos = "0"><i>"Лучший способ предсказать будущее - это создать его."</i></div>
        </div>
        <div class="column2-proect column-proect column2-image4"><img src="views/images/icon/question_ring.svg" class="<?=($proect_right[3] > 0)?'opacity07':''?> <?=($proect_left[3]+$proect_right[3] == 5)?'display-none':''?>"></div>
        <div class="column3-proect column-proect">
            <div class="column-proect-text <?=($proect_right[2] == 1)?'display-block':''?>"><b>Станислав:</b> SEO оптимизация и продвижение проекта.</div>
            <div class="column-proect-text <?=($proect_right[2] == 2 && $proect_left[3]+$proect_right[3] < 6)?'display-block':''?>"><b>Станислав:</b> директор по марктетингу.</div>
            <div class="column-proect-text <?=($proect_left[2]+$proect_right[3] == 5)?'display-block':''?>"><b>Станислав:</b> SEO оптимизация и продвижение проекта, директор по марктетингу.</div>
        </div>
    </div>

    <div class="row-proect" left="<?=$proect_left[3]?>" right="<?=$proect_right[4]?>">
        <div class="column1-proect column-proect">
            <div class="column-proect-text <?=($proect_left[3] == 1)?'display-block':''?>" row ="2" pos = "1">Он продвигает нас вперед и следит за пауками?</div> 
            <div class="column-proect-text <?=($proect_left[3] == 2)?'display-block':''?>" row ="2" pos = "2">Он знает, что нужно продавать не сверла, а отверстия - определенного диаметра?</div>
            <div class="column-proect-text <?=($proect_left[3] == 3)?'display-block':''?>" row ="0" pos = "0"><i>"Мы никогда не узнаем то что ищем, пока не найдем это."</i></div>
        </div>
        <div class="column2-proect column-proect column2-image5"><img src="views/images/icon/question_ring.svg" class="<?=($proect_right[4] > 0)?'opacity07':''?> <?=($proect_left[4]+$proect_right[4] == 5)?'display-none':''?>"></div>
        <div class="column3-proect column-proect">
            <div class="column-proect-text <?=($proect_right[3] == 1)?'display-block':''?>"><b>Юрий:</b> разработчик front-end.</div>
            <div class="column-proect-text <?=($proect_right[3] == 2 && $proect_left[4]+$proect_right[4] < 5)?'display-block':''?>"><b>Юрий:</b> compliance, правовая защита, безопасноть.</div>
            <div class="column-proect-text <?=($proect_left[3]+$proect_right[4] == 5)?'display-block':''?>"><b>Юрий:</b> разработчик front-end, compliance, правовая защита, безопасноть.</div>
        </div>
    </div>

    <div class="row-proect" left="<?=$proect_left[4]?>" right="<?=$proect_right[5]?>" id= "proect-end">
        <div class="column1-proect column-proect">
            <div class="column-proect-text <?=($proect_left[4] == 1)?'display-block':''?>" row = "1" pos = "1">Кто среди нас больше всех любит объекты и кует победу в тылу?</div> 
            <div class="column-proect-text <?=($proect_left[4] == 2)?'display-block':''?>" row ="3" pos ="2">Разве юрист и compliance может быть фронтовиком?</div>
            <div class="column-proect-text <?=($proect_left[4] == 3)?'display-block':''?>" row ="0" pos = "0"><i>"Успех - это умение двигаться от одной неудачи к другой, не теряя энтузиазма."</i></div>
        </div>
        <div class="column2-proect column-proect column2-image6"><img src="views/images/icon/question_ring.svg" class="<?=($proect_right[5] > 0)?'opacity07':''?> <?=($proect_left[5]+$proect_right[5] == 5)?'display-none':''?>"></div>
        <div class="column3-proect column-proect">
            <div class="column-proect-text <?=($proect_right[4] == 1)?'display-block':''?>"><b>Татьяна:</b> UI/UX дизайнер.</div>
            <div class="column-proect-text <?=($proect_right[4] == 2 && $proect_left[5]+$proect_right[5] < 5)?'display-block':''?>"><b>Татьяна:</b> администратор команды.</div>
            <div class="column-proect-text <?=($proect_left[4]+$proect_right[5] == 5)?'display-block':''?>"><b>Татьяна:</b> UI/UX дизайнер, администратор команды.</div>
        </div>
    </div>
    
</div>


<script src="views/js/jquery-3.3.1.js"></script>
<script src="views/js/preloader.js?ver=<?=VER?>"></script> 
<script src="views/js/proect.js?ver=<?=VER?>"></script>

<?php
require_once 'views/templates/footer.php';