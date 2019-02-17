<?php 

require_once 'views/templates/header.php';
?>

<div class="wrapper">
    <div id="Qst"><?=$question->question?></div>
    <div id="Asw">1-3 месяца</div>
    <div id='button'>Следующий вопрос</div>
        
</div>

<!-- пример foreach php -->
<?php 
// foreach ($collections as $collection) {
// echo '<option value="'.$collection->id.'">'.$collection->title.'</option>';
// };
?>


<script src="views/js/survey.js"></script>
<?php

require_once 'views/templates/footer.php';