<?php 
require_once 'views/templates/header.php';
?>

<div class="wrapper block-proect">
    <h1 class="proect-h1">Рекомендательный сервис выбора жилья</h1>
    <div class="row-proect" left="<?=$proect_left[0]?>" right="<?=$proect_right[0]?>">
        <div class="column1-proect column-proect">
            <div class="column-proect-text <?=($proect_left[0] == 1)?'display-block':''?>">Зачем нужен ваш проект?</div> 
            <div class="column-proect-text <?=($proect_left[0] == 2)?'display-block':''?>">Мы даем точные и достоверные рекомендации.</div>
        </div>
        <div class="column2-proect column-proect column2-proect1"><img src="views/images/icon/question_ring.svg" class="<?=($proect_left[0]+$proect_right[0] > 0)?'opacity07':''?> <?=($proect_left[0]+$proect_right[0] > 3)?'display-none':''?>"></div>
        <div class="column3-proect column-proect">
            <div class="column-proect-text <?=($proect_right[0] == 1)?'display-block':''?>">Здесь будут только рекомендации по жилью ?</div>
            <div class="column-proect-text <?=($proect_right[0] == 2)?'display-block':''?>">Начинаем с жилья. Дальше будет еще интересней.</div> 
        </div>
    </div>
    <div class="row-proect" question="<?=$proect_question[1]?>" answer="<?=$proect_answer[1]?>">
        <div class="column1-proect column-proect"></div>
        <div class="column2-proect column-proect column2-proect2"><img src="views/images/icon/question_ring.svg"></div>
        <div class="column3-proect column-proect"></div>
    </div>
    <div class="row-proect" question="<?=$proect_question[2]?>" answer="<?=$proect_answer[2]?>">
        <div class="column1-proect column-proect"></div>
        <div class="column2-proect column-proect"><img src="views/images/icon/question_ring.svg"></div>
        <div class="column3-proect column-proect"></div>
    </div>
    <div class="row-proect" question="<?=$proect_question[3]?>" answer="<?=$proect_answer[3]?>">
        <div class="column1-proect column-proect"></div>
        <div class="column2-proect column-proect"><img src="views/images/icon/question_ring.svg"></div>
        <div class="column3-proect column-proect"></div>
    </div>
    <div class="row-proect" question="<?=$proect_question[4]?>" answer="<?=$proect_answer[4]?>">
        <div class="column1-proect column-proect"></div>
        <div class="column2-proect column-proect"><img src="views/images/icon/question_ring.svg"></div>
        <div class="column3-proect column-proect"></div>
    </div>
    <div class="row-proect" question="<?=$proect_question[5]?>" answer="<?=$proect_answer[5]?>">
        <div class="column1-proect column-proect"></div>
        <div class="column2-proect column-proect"><img src="views/images/icon/question_ring.svg"></div>
        <div class="column3-proect column-proect"></div>
    </div>
    <div class="row-proect" question="<?=$proect_question[6]?>" answer="<?=$proect_answer[6]?>">
        <div class="column1-proect column-proect"></div>
        <div class="column2-proect column-proect"><img src="views/images/icon/question_ring.svg"></div>
        <div class="column3-proect column-proect"></div>
    </div>
  
</div>
<br>
<script src="views/js/proect.js"></script>
<?php
require_once 'views/templates/footer.php';