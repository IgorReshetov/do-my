    <footer>
        <div class="footer-block">
            <div class="wrapper-footer">
                <div class = "footer-block-inside1">
                <a href="http://sber-up.ru" class = "footer-block-inside1-a">Участник акселератора Sber#Up </a>
                </div>    
                <div class = "footer-block-inside2">
                    <?php
                        switch ($page) {
                            case 'privacy':
                            echo ('<a href="index.php?page=project" class="proect">Информация о проекте</a>');
                            break;                         
                            default:
                            echo ('<a href="index.php?page=privacy" class="proect">Политика конфиденциальности</a>');
                            break; 
                        }
                    ?>
                </div>
            </div>
        </div>
        
    </footer>
    </body>
    
</html>