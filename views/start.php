<?php 

require_once 'views/templates/header.php';
?>

    <div class="wrapper">
        <h1 class = "start-h1">Сервис рекомендаций в выборе жилья</h1> 
        <div class="start-linia-2">
            <div class="start-h2-conteiner">
                <h2 class ="start-h2">Вот какую оценку заслуживает ваш выбор квартиры
                    <div class="start-h2-ozenka">7.8</div>
                </h2>
                <h2 class="start-ozenka">Эта игра покажет, где вам лучше жить, а где нет</h2>
            </div>

            <div class="start-o-proecte">
                <div class="start-qustions-flex-appendix-1"></div>
                <a href="index.php?page=project" class= 'start-qustions-2'>Хотите узнать секрет как работает наш сервис?</a>
            </div> 

            <div class="start-qustions-1">
                <div class="start-qustions-flex-appendix-1"></div>
                Спорим, вы не до конца знаете, что для вас важно при выборе квартиры?    
            </div>
        </div>
       
        <div class="start-linia">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 400 700" preserveAspectRatio="none">
                <path width="100%"  height="500px" fill="none" stroke="#FF3535"  stroke-width="5" d="M20,300 Q100,700, 380,670" />
            </svg>
            <div class="start-planeta-img"></div>
            <img class = "house" src="views/images/icon/house.svg" alt="multistory building">
        </div>
        
    </div>
    
    <script src="views/js/start.js"></script>   <!-- ДОБАВЛЯЕМ основной файл js -->
    <script src="views/js/functions.js"></script>  <!-- Подключаем функции js -->

<?php

require_once 'views/templates/footer.php';

?>