<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="Полезные тесты и квизы">
    <title><?php echo "$admin_page_title" ?></title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="views/css/style.css?ver=<?=VER?>">
    
</head>
<body>
    <header>
            <div class="menu-block">
              <div class="wrapper-menu">
                    <div class="menu-block-first">
                        
                        <?php
                            switch ($page) {
                                case 'start':
                                echo ('
                                <div class="icon-menu"></div>
                                <div class="menu-start">
                                <div class="menu-start-block1">Думай</div>
                                </div>
                                ');
                                break;

                                default:
                                echo ('
                                <a href="index.php?page=start&back=1" class="icon-menu"></a>
                                <a href="index.php?page=start&back=1" class="menu-start">
                                <div class="menu-start-block1">Думай</div>
                                </a>
                                ');
                                break;      
                            }
                        ?>
                        
                    </div>
                    <div class="centr-fox"> 
                        <div id = "fox" class="fox-sleep"></div>
                        <div class="fox-words-down">
                            <p class="fox-words-text"></p>
                        </div>
                    </div>
                    
                    <div class="user-menu">
                        <div class="icon-user-menu">
                            <div class="menu-btn-box" id ="menu-btn-box-main">
                                <div class="menu-btn-box" id ="menu-btn"></div>
                                <div class="menu-btn-box" id = "menu-btn-top"></div>
                                <div class="menu-btn-box" id= "menu-btn-bot"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hiden-menu" id = "menu1"> </div>
            
            <div class="menu-wraper" id = "menu-wraper">
            <div class="hiden-menu-user">
               <?php
                if ($page != "start"){
                    echo ('<a href="index.php?page=start&back=1" class="hiden-menu-user-getpromo">На главную страницу</a>');
                }
                ?>
                <div class="hiden-menu-user-getpromo" id = "getpromo">Получить промокод по пройденным тестам</div>
                <div class="hiden-menu-user-getpromo" id = "inwork">Проверить промокод</div>

                <?php
                if ($_SESSION['active_question'] > 0 && $page != "survey"){
                    echo ('<a href="index.php?page=survey&back=1" class="hiden-menu-user-getpromo">Продолжить тест</a>');
                }

                if ($_SESSION['active_question'] > 0){
                    echo ('<a href="index.php?page=survey&reset=1&back=1" class="hiden-menu-user-getpromo">Сбросить ходы и вернуться к началу теста</a>');
                }

                if ($page != "project") {
                    echo ('<a href="index.php?page=project" class="hiden-menu-user-getpromo">Информация о проекте</a>');
                }

                if ($page != "privacy") {
                    echo ('<a href="index.php?page=privacy" class="hiden-menu-user-getpromo">Политика конфиденциальности и информационная политика</a>');
                }

                ?>

                          
            </div>  
            </div>
            <div class="menu-wraper-promo" id = "menu-wraper-promo">
            <div class="hiden-menu-user-promo" id = "menu12">
                <div class="hiden-menu-user-promo-block" id ="hiden-menu-user-promo-header">Для получения промокодов по пройденным тестам введите ваш email:</div>
                
                <div class="hiden-menu-input-wraper">
                <input class="hiden-menu-user-promo-block" onfocus="fox.speak_multi();" id = "menu-mail" name = "menu-mail" type="text" placeholder= "Введите email">
                </div>

                <div class="hiden-menu-user-promo-bl">
                    <div class="hiden-menu-user-promo-block"></div>
                    <div class="hiden-menu-user-promo-block" id = "promo-button-get">ПОЛУЧИТЬ</div>
                </div>
            </div>
            </div>
             
    </header>
    <!-- // Загрузка картинок в кэш браузера -->
    <div class="repo-images">
                <img src="views/images/icon/false_question.svg" alt="">
                <img src="views/images/icon/fox_sleep.svg" alt="">
                <img src="views/images/icon/fox_sniff.svg" alt="">
                <img src="views/images/icon/fox_speak.svg" alt="">
                <img src="views/images/icon/fox_speak2.svg" alt="">
                <img src="views/images/icon/fox_speak3.svg" alt="">
                <img src="views/images/icon/fox_wakeUp.svg" alt="">
                <img src="views/images/icon/fox_wakeUp2.svg" alt="">
                <img src="views/images/icon/loss_level.svg" alt="">
                <img src="views/images/icon/pass_level_1.svg" alt="">
                <img src="views/images/icon/pass_level_2.svg" alt="">
                <img src="views/images/icon/pass_level_3.svg" alt="">
                <img src="views/images/icon/present.svg" alt="">
                <img src="views/images/icon/present_red.svg" alt="">
                <img src="views/images/icon/thanks.svg" alt="">
                <img src="views/images/icon/true_question.svg" alt="">
                <img src="views/images/icon/true.svg" alt="">
                <img src="views/images/icon/victory_level.svg" alt="">
                <img src="views/images/icon/victory.svg" alt="">
                <img src="views/images/icon/logo.svg" alt="">
                <img src="views/images/icon/house.svg" alt="">
                <img src="views/images/icon/aim.svg" alt="">
                      
    </div>
    <!-- <script src="views/js/classlist_IE.js"></script>  -->
    <script src="views/js/fox.js?ver=<?=VER?>"></script>
    <script src="views/js/menu.js?ver=<?=VER?>"></script>


<!-- Yandex.Metrika counter -->


<!-- <script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(53795302, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/53795302" style="position:absolute; left:-9999px;" alt="" /></div></noscript> -->


<!-- /Yandex.Metrika counter -->  
    