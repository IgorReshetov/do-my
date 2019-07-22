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
<a href="<?=$file_paht?>" id = "pfd-load" class="pfd-load" book = "<?=$book?>">ОСТАВИТЬ ЗАЯВКУ В ЖК "ЛЮБОВЬ И ГОЛУБИ"</a>
</div>
<iframe class= "proba" src="https://lyubov-i-golubi.ru/"></iframe>
<iframe class = "pdf-block"src="https://docs.google.com/viewer?url=<?=$file_paht?>&embedded=true" 
frameborder="0">Просмотр pdf файла не возможен - ваш браузер не поддерживает фреймы</iframe>

</body>

<!-- Yandex.Metrika counter -->


<!-- <script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(53795302, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
</script>

<noscript><div><img src="https://mc.yandex.ru/watch/53795302" style="position:absolute; left:-9999px;" alt="" /></div></noscript> -->



<!-- /Yandex.Metrika counter --> 

<script src="views/js/storage.js?ver=<?=VER?>"></script>



</html>