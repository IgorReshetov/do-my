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
            <div class="hiden-menu"></div>
            <div class="hiden-menu-user">
                <div class="hiden-menu-user-getpromo">Получить промокод</div>
            </div>
             
    </header>

    