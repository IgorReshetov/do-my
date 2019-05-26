<?php 

require_once 'views/templates/header.php';
?>
<div id ='id-preloader' class="preloader">
    <div class="loader"></div>
</div>

<div class="wrapper">
    
    <?php
    if($mail == 1){
        echo (
        '<div class="thanks-image"></div>
        <div class= "thanks-thanks"><div>Спасибо, что пользуетесь нашим cервисом!</div></div>
        <div class= "thanks-fift"><div>Подарок направлен на ваш email.</div></div>
        <div class="thanks-block">
        <a href="index.php?page=start&back=1" class="thanks-button">НА ГЛАВНУЮ</a>
        </div>'
        );
    } else {
        echo (
        '<div class="thanks-image-problem"></div>
        <div class= "thanks-problem">При отправке подарка позникла ошибка. Просим вернуться на страницу подарка для уточнения email.</div>
        <div class="thanks-block">
        <a href="index.php?page=survey" class="thanks-button-problem">ВЕРНУТЬСЯ</a>
        </div>'
        );
    }
     
    ?>
</div>

<script src="views/js/preloader.js?ver=<?=VER?>"></script>
<script src="views/js/thanks.js?ver=<?=VER?>"></script>

<?php

require_once 'views/templates/footer.php';
