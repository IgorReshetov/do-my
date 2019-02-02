window.onload = init;
function init() {
    // обработчики нажатия на вопрос о проекте
    var left_qw = document.getElementById('first').children[1].getAttribute('left');
    var right_qw = document.getElementById('first').children[1].getAttribute('right');

    if (left_qw == 1){
        var button1 = document.getElementById('first').children[1].children[0].children[0];
        button1.onclick = func1;
        
        
        function func1() {
            this.classList.add('display-none');
            this.nextElementSibling.classList.add('display-block');
            document.getElementById('first').children[1].setAttribute('left', 2);
            init();
            return; 
        }
    }

    if (right_qw == 1){
        var button2 = document.getElementById('first').children[1].children[2].children[0];
        button2.onclick = func2;
        

        function func2() {
            this.classList.add('display-none');
            this.nextElementSibling.classList.add('display-block');
            document.getElementById('first').children[1].setAttribute('right', 2);
            init();
            return; 
        }
    }

    // проверяем отвечены ли вопросы о проекте

    if ((left_qw == 2 && right_qw != 2) || (right_qw == 2 && left_qw != 2 )){
        document.getElementById('first').children[1].children[1].children[0].classList.add('opacity07');
    }

    
    if (left_qw == 2 && right_qw == 2){
        document.getElementById('first').children[1].children[1].children[0].classList.add('display-none');
        if (document.getElementById('first').children[2].children[0].children[0].classList.contains('display-none') == true){
        document.getElementById('first').children[2].children[0].children[0].classList.remove('display-none');
        }
        opros();
        
    }
}

// Функция опроса
function opros() {
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
    
//обработчик нажатия на вопрос о команде
    
    if (point != undefined){
    var button3 = document.getElementById('first').children[point+1].children[0];
    button3.onclick = func3;
    
    function func3() {
        question(point);
        opros();
        return; 
    }
    }
}


// функция отработки нажатия на вопрос
function question(point) {
    var start_elem = document.getElementById('first');
    start_elem = start_elem.children[1+point];
    var check = Number.parseInt(start_elem.getAttribute('left'));
    if (check > 0) {
        var slogan = Number.parseInt(start_elem.children[0].children[check-1].getAttribute('row'));
        if (slogan == 0){return false}
    }
    if (check == 0) {return false};
    var row = Number.parseInt(start_elem.children[0].children[check-1].getAttribute('row'));
    var pos = Number.parseInt(start_elem.children[0].children[check-1].getAttribute('pos'));
    start_elem.children[0].children[check-1].classList.add('display-none');
    start_elem.setAttribute('left', 0);
    if (row == 0) {return false};
    var start_elem = document.getElementById('first');
    start_elem = start_elem.children[row+1];
    
    start_elem.previousElementSibling.scrollIntoView(true);
    
    if (pos > 1) {start_elem.children[2].children[pos-2].classList.add('display-none')};
    start_elem.children[2].children[pos-1].classList.add('display-block');
    if (row == 1) {pos=pos+1};
    start_elem.children[0].children[pos-1].classList.add('display-block');
    start_elem.setAttribute('left', pos);
    start_elem.children[1].children[0].classList.add('opacity07');
    if (row == 1 && pos == 4) {show()}
    return;
}

// функция финального показ
function show(){
    var start_elem = document.getElementById('first');
    window.setTimeout(function(){
    start_elem.children[2].children[2].children[2].classList.add('display-none');
    start_elem.children[2].children[1].children[0].classList.add('display-none');
    start_elem.children[2].children[2].children[3].classList.add('display-block');
    }, 2000);
    window.setTimeout(function(){
    start_elem.children[3].previousElementSibling.scrollIntoView(true);
    start_elem.children[3].children[0].children[3].classList.add('display-block');
    start_elem.children[3].children[1].children[0].classList.add('display-none');
    start_elem.children[3].children[2].children[2].classList.add('display-none');
    start_elem.children[3].children[2].children[3].classList.add('display-block');
    }, 4000);
    for (let index = 1; index < 5; index++) {
        window.setTimeout(function(){
        var row = index+3;
        start_elem.children[row].previousElementSibling.scrollIntoView(true);
        start_elem.children[row].children[0].children[2].classList.add('display-block');
        start_elem.children[row].children[1].children[0].classList.add('display-none');
        start_elem.children[row].children[2].children[1].classList.add('display-none');
        start_elem.children[row].children[2].children[2].classList.add('display-block');
        }, 4000+index*2000);
    }
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
    