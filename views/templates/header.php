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
                        <a href="index.php" class="icon-menu"></a>
                        <?php
                            switch ($page) {
                                case 'project':
                                echo ('
                                <a href="index.php" class="menu-start">Думай</a>
                                <div class="menu-proect"><b>О проекте</b></div>
                                ');
                                break;
                                case 'privacy':
                                echo ('
                                <a href="index.php" class="menu-start">Думай</a>
                                <div class="menu-proect"><b>Политика конфиденциальности</b></div>
                                ');
                                break;
                                default:
                                echo ('
                                <div class="menu-start"><b>Думай</b></div>
                                <a href="index.php?page=project" class="menu-proect">О проекте</a>
                                ');
                                break;      
                            }
                        ?>
                    </div>
                    <div class="fox"></div> 
                    <div class="icon-user"></div>
                </div>
            </div>
            <div class="hiden-menu"></div>
            <div class="hiden-menu-user"></div>
             
    </header>