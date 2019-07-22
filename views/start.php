<?php 

require_once 'views/templates/header.php';
?>
    <div id ='id-preloader' class="start-preloader">
    <div class="loader"></div>
    </div>

    <div class="wrapper">
        <h1 class = "start-h1" id= "fox-start" user = "<?=$user?>">Полезные тесты и квизы</h1>
        
        <div class="start-block">
            <div class="start-h2-conteiner">
                <div class="start-h2-upor-l"></div>
                <div class="start-h2">
                    <a href="index.php?page=survey&back=1" class="start-h2-menu">Этот тест подскажет, где вам лучше жить</a>
                    <a href="index.php?page=survey&back=1" class="start-qustions-flex-appendix-2"></a>
                </div>
                <div class="start-h2-upor-r"></div>
            </div>

            <div class="start-smallcoteiner">
                <div class="start-o-proecte">
                    <a href="index.php?page=project" class="start-qustions-flex-appendix-1"></a>
                    <a href="index.php?page=project" class= 'start-qustions-2'>Хотите узнать секрет, как работает наш сервис?</a>
                </div> 
            </div>
        </div>
       
        <div class="start-linia">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 400 700" preserveAspectRatio="none" class="start-svg">
                <path width="100%"  height="500px" fill="none" stroke="#0000ff"  stroke-width="10" d="M20,300 Q100,700, 380,670" />
            </svg>
            <div class="start-planeta-img"></div>
            <div class = "house"></div>
        </div>
        
        
    </div>
    
    
    <script src="views/js/preloader.js?ver=<?=VER?>"></script>   <!-- Подключаем загрузчик спиннер -->
    <script src="views/js/start.js?ver=<?=VER?>"></script>   <!-- ДОБАВЛЯЕМ основной файл js -->
    
<?php

require_once 'views/templates/footer.php';

?>