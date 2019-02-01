window.onload = init;
function init() {
    // определяем на каком вопросе о команде остановился пользователь
    var start_elem = document.getElementById('first');
    start_elem = start_elem.children[2];
    for(var i = 1; i < 7; i++) {
        var check = Number.parseInt(start_elem.getAttribute('left'));
        if (check > 0) {
            var slogan = Number.parseInt(start_elem.children[0].children[check-1].getAttribute('row'));
            if (slogan != 0){var point = i}
        }
        start_elem = start_elem.nextElementSibling;
    }
    
    //обработчик нажатия на вопрос
    var button = document.getElementById('first').children[point+1].children[0];
    
    button.addEventListener('click', func);
    
    function func() {
        question(point);
        button.removeEventListener('click', func);
        init(); 
    };
     
}

// функция отработки нажатия на вопрос
function question(point) {
    var start_elem = document.getElementById('first');
    start_elem = start_elem.children[1+point];
    var check = Number.parseInt(start_elem.getAttribute('left'));
    var row = Number.parseInt(start_elem.children[0].children[check-1].getAttribute('row'));
    var pos = Number.parseInt(start_elem.children[0].children[check-1].getAttribute('pos'));
    if (point == 1 && row != 5) {check=check+1};
    console.log (check);
    start_elem.children[0].children[check-1].classList.add('display-none');
    start_elem.setAttribute('left', 0);
    if (row == 0) {return false};
    var start_elem = document.getElementById('first');
    start_elem = start_elem.children[row+1];
    if (pos > 1) {start_elem.children[2].children[pos-2].classList.add('display-none')};
    start_elem.children[2].children[pos-1].classList.add('display-block');
    start_elem.setAttribute('left', pos);
    if (row == 1) {pos=pos+1};
    start_elem.children[0].children[pos-1].classList.add('display-block');
    start_elem.setAttribute('left', pos);
    return;
}






















// AJAX ОТПРАВКА

// var data = JSON.stringify(data);

// var xhr = new XMLHttpRequest();
// xhr.open('POST', 'send_message.php', true);
// xhr.setRequestHeader("Content-type", "application/json");
// xhr.send(data);

// AJAX ПОЛУЧЕНИЕ

// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'get_messages.php?message_id='+message_id, true);
// xhr.send();

// xhr.onreadystatechange = function() {
//     if (xhr.readyState != 4) {
//         return;
//     }

// var messages = JSON.parse(xhr.responseText);
// }




// ЛОГИКА
    // if () {
    
    // } else {
    
    // }
    // for(var i = 0; i < 3; i++) {}
  




//  ДАННЫЕ
    // _.forEach(function(val, index) {

    // });

        // .pop()
        // .puch(el)
        // .shift()
        // .unshift(el)
        // .splice(index, count)
    

    //console.log();


    
    // Нативный
    // (function() {

    // }
    // var ____ = document.getElementById('____');
     // ______.getAttribute('href');
    // ______.setAttribute('href', 'привет');
    // ______.style.color = 'red';
    // div.innerHTML = '___';
    // div.textContent = '___';
    