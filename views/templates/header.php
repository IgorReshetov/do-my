<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title><?php echo "$admin_page_title" ?></title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="views/css/style.css">
    
</head>
<body>
    <header>
            <div class="menu-block">
              <div class="wrapper-menu">
                    <div class="menu-block-first">
                        <a href="index.php?back=1" class="icon-menu"></a>
                        <?php
                            switch ($page) {
                                case 'project':
                                echo ('
                                <a href="index.php?back=1" class="menu-start">
                                <div class="menu-start-block1">Думай</div>
                                </a>
                                ');
                                break;
                                case 'privacy':
                                echo ('
                                <a href="index.php?back=1" class="menu-start">
                                <div class="menu-start-block1">Думай</div>
                                </a>
                                ');
                                break;
                                default:
                                echo ('
                                <div class="menu-start">
                                <div class="menu-start-block1">Думай</div>
                                </div>
                                ');
                                break;      
                            }
                        ?>
                        
                    </div>
                    <div class="centr-fox"> 
                        <div id = "fox" class="fox-sleep"></div>
                        <div class="fox-words-down"></div>
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
            <div class="hiden-menu-user">
                <div class="hiden-menu-user-getpromo" id = "getpromo">Получить промокод по пройденным квизам</div>
                <div class="hiden-menu-user-getpromo" id = "inwork">Проверить промокод</div>

                <?php
                if ($_SESSION['active_question'] > 0){
                    echo ('<a href="index.php?page=survey&reset=1" class="hiden-menu-user-getpromo">Вернуться к началу квиза</a>');
                }

                if ($page != "project") {
                    echo ('<a href="index.php?page=project" class="hiden-menu-user-getpromo">Информация о проекте</a>');
                }

                if ($page != "privacy") {
                    echo ('<a href="index.php?page=privacy" class="hiden-menu-user-getpromo">Политика конфиденциальности</a>');
                }

                ?>

                          

            </div>
            <div class="hiden-menu-user-promo" id = "menu12">
                <div class="hiden-menu-user-promo-block" id ="hiden-menu-user-promo-header">Для получения промокодов по пройденным квизам введите ваш email:</div>
                
                <input class="hiden-menu-user-promo-block" id = "menu-mail" name = "menu-mail" type="text" placeholder= "Введите email">
                
                <div class="hiden-menu-user-promo-bl">
                    <div class="hiden-menu-user-promo-block"></div>
                    <div class="hiden-menu-user-promo-block" id = "promo-button-get">ПОЛУЧИТЬ</div>
                </div>
            </div>
             
    </header>
    <!-- <script src="views/js/classlist_IE.js"></script>  -->
    <script src="views/js/fox.js"></script>
    <script src="views/js/menu.js"></script>
<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(53543287, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/53543287" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->  
    