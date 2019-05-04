<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
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
                        <div class="fox-words"></div>
                    </div>
                    <div class="user-menu">
                        <div class="icon-user"></div>
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
                <div class="hiden-menu-user-promo-header">Для получения промокодов по пройденным квизам введите ваш email:</div>
                
                <input class="hiden-menu-user-promo-mail" id = "menu-mail" name = "menu-mail" type="text" placeholder= "Введите email">
                
                <div class="hiden-menu-user-promo-block">
                    <div class="hiden-menu-user-promo-block-text"></div>
                    <div class="hiden-menu-user-promo-get" id = "promo-button-get">ПОЛУЧИТЬ</div>
                </div>
                <div class="hiden-menu-user-promo-ask"></div>
            </div>
             
    </header>
    <script src="views/js/fox.js"></script>
    <script src="views/js/menu.js"></script>  
    