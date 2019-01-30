window.onload = init;
function init() {
    // определяем на каком вопросе о команде остановился пользователь
    var start_elem = document.getElementById('first');
    start_elem = start_elem.children[2];
    for(var i = 1; i < 7; i++) {
        var check = start_elem.getAttribute('left');
        if (check > 0) {
            var slogan = start_elem.children[0].children[check-1].getAttribute('row');
            if (slogan != 0){var point = i}
        }
        start_elem = start_elem.nextElementSibling;
    }
    console.log(point);

}

// фугкция отработки нажатия на вопрос
function question(point) {
    var start_elem = document.getElementById('first');
    
    
    
    return result;
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
    