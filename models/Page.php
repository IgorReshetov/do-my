<?php

class Page 
{
    public $Page;
 
    public function __construct($page)      
    {   
        if (DEV_MODE == true) { // ПЕРЕКЛЮЧАТЕЛЬ РЕЖИМА РАЗРАБОЧИКА
            $admin_page_title = 'Думай-тест';   
        } else {
            $admin_page_title = 'Думай';
        }

        $page = addslashes($page);
        if ($_SESSION['bot'] == 1 && DEV_MODE != true) {$page = "check_bot";}
        if ($_SESSION['bot'] == 2 && DEV_MODE != true) {$page = "die_bot";}

        switch ($page) {
            case "project":
            require_once 'controllers/proect.php';
            break;
            case "privacy":
            require_once 'views/privacy.php';
            break;
            case "get_question":
            require_once 'controllers/handlers/get_question.php';
            break;
            case "get_answer":
            require_once 'controllers/handlers/get_answer.php';
            break;
            case "put_answer":
            require_once 'controllers/handlers/put_answer.php';
            break;
            case "check_bot":
            require_once 'controllers/check_bot.php';
            break;
            case "die_bot":
            require_once 'controllers/die_bot.php';
            break;
            case "error":
            require_once 'views/error.php';
            break;
            default:
            // require_once 'models/User.php';
            require_once 'controllers/survey.php';
            break;
            }
    }
}