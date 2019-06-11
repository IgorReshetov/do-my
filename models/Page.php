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
        
        // проверка на бота
        // if ($_SESSION['bot'] == 1 && DEV_MODE != true) {$page = "check_bot";}
        // if ($_SESSION['bot'] == 2 && DEV_MODE != true) {$page = "die_bot";}

        if ($_SESSION['active_question'] > 0 && $page == 'first'){
            $page = 'survey';
        }

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
            case "put_mail":
            require_once 'controllers/handlers/put_mail.php';
            break;
            case "put_mail_short":
            require_once 'controllers/handlers/put_mail_short.php';
            break;
            case "get_stat":
            require_once 'controllers/handlers/get_stat.php';
            break;
            case "put_book":
            require_once 'controllers/handlers/put_book.php';
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
            case "survey":
            require_once 'controllers/survey.php';
            break;
            case "thanks":
            require_once 'controllers/thanks.php';
            break;
            case "start":
            require_once 'controllers/start.php';
            break;
            case "storage":
            require_once 'controllers/storage.php';
            break;
            default:
            // require_once 'models/Answer.php';
            require_once 'controllers/survey.php';
            break;
            }
    }
}