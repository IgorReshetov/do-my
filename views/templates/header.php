<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title><?php echo "$admin_page_title" ?></title>
    <script src="views/js/start.js"></script>   <!-- ДОБАВЛЯЕМ основной файл js -->
    <script src="views/js/functions.js"></script>  <!-- Подключаем функции js -->
    <link rel="stylesheet" href="views/css/style.css">
</head>
<body>
    <header>
            <div class="menu-block">
              <div class="wrapper-menu">
                    <div class="menu-block-first">
                        <a href="index.php" class="icon-menu"></a>
                        <?php
                            switch ($page) {
                                case 'project':
                                echo ('
                                <a href="index.php" class="menu-start">Думай</a>
                                ');
                                break;
                                case 'privacy':
                                echo ('
                                <a href="index.php" class="menu-start">Думай</a>
                                ');
                                break;
                                default:
                                echo ('
                                <div class="menu-start">Думай</div>
                                ');
                                break;      
                            }
                        ?>
                        
                    </div>
                    <div class="fox"></div> 
                    <div class="user-menu">
                        <div class="icon-user"></div>
                        <?php
                            switch ($page) {
                                case 'project':
                                echo ('
                                <div class="menu-proect"><b>О проекте</b></div>
                                ');
                                break;
                                case 'privacy':
                                echo ('
                                <div class="menu-proect"><b>Политика конфиденциальности</b></div>
                                ');
                                break;
                                default:
                                echo ('
                                <a href="index.php?page=project" class="menu-proect">О проекте</a>
                                ');
                                break;      
                            }
                        ?>
                        <div class="user-menu-reg">Зарегистрироваться</div>
                        <div class="user-menu-auth">Войти</div>
                    </div>
                </div>
            </div>
            <div class="hiden-menu"></div>
            <div class="hiden-menu-user"></div>
             
    </header>

    