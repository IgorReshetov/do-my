<?php 

require_once 'views/templates/header.php';
?>

    <div class="wrapper">
        <h1 class = "start-h1">Полезные квизы и викторины</h1> 
        <div class="start-block">
            <div class="start-h2-conteiner">
                <div class="start-h2-upor-l"></div>
                <div class="start-h2">
                    <a href="index.php?page=survey" class="start-h2-menu">Эта игра подскажет, где вам лучше жить</a>
                    <div class="start-qustions-flex-appendix-2"></div>
                </div>
                <div class="start-h2-upor-r"></div>
            </div>

            <div class="start-smallcoteiner">
                <div class="start-o-proecte">
                    <div class="start-qustions-flex-appendix-1"></div>
                    <a href="index.php?page=project" class= 'start-qustions-2'>Хотите узнать секрет, как работает наш сервис?</a>
                </div> 
            </div>
        </div>
       
        <div class="start-linia">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 400 700" preserveAspectRatio="none">
                <path width="100%"  height="500px" fill="none" stroke="#0000ff"  stroke-width="10" d="M20,300 Q100,700, 380,670" />
            </svg>
            <div class="start-planeta-img"></div>
            <div class = "house"></div>
        </div>
        <div class="start-linia-wite">
        </div>

        
    </div>
    
    <script src="views/js/start.js"></script>   <!-- ДОБАВЛЯЕМ основной файл js -->
    <script src="views/js/functions.js"></script>  <!-- Подключаем функции js -->

<?php

require_once 'views/templates/footer.php';

?>