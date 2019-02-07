    <footer>
        <div class="footer-block">
            <div class="wrapper-menu">
                <div class = "footer-block-inside1">&copy; Права защищены</div>
                <div class = "footer-block-inside2">
                    <?php
                        switch ($page) {
                            case 'project':
                            echo ('<a href="index.php?page=privacy" class="proect">Политика конфиденциальности</a>');
                            break;                         
                            default:
                            echo ('<a href="index.php?page=project" class="proect">Информация о проекте</a>');
                            break; 
                        }
                    ?>
                </div>
            </div>
        </div>
    </footer>
    </body>
</html>