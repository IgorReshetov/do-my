<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title><?php echo "$file_name" ?></title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="views/css/storage.css">
    
</head>
<body>
<div class="bloc-pdf-load">
<a href="<?=$file_paht?>" id = "pfd-load" class="pfd-load" book = "<?=$book?>">СКАЧАТЬ</a>
</div>
<iframe class = "pdf-block"src="https://docs.google.com/viewer?url=<?=$file_paht?>&embedded=true" 
frameborder="0">Просмотр pdf файла не возможен - ваш браузер не поддерживает фреймы</iframe>

</body>
<script src="views/js/storage.js"></script>  
</html>