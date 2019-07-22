window.onload = init;
var flag = 0;

function init() {
    preloader();
    fox.no_active_user();
    fox.enter_leave_mouse();
    fox.wakeUp_mouse();

    menu();

    // обработчики нажатия на вопрос о проекте
    var left_qw = document.getElementById('first').children[1].getAttribute('left');
    var right_qw = document.getElementById('first').children[1].getAttribute('right');

    if (left_qw == 1){
    var button1 = document.getElementById('first').children[1].children[0];
    button1.onclick = func1;

    function func1() {
        var left_qw = document.getElementById('first').children[1].getAttribute('left');
        if (left_qw == 1){
        this.children[0].classList.add('display-none');
        this.classList.remove('column-proect-light-red');
        this.children[0].nextElementSibling.classList.add('display-block');
        blue(button1);
        document.getElementById('first').children[1].setAttribute('left', 2);
        
        init();
        }
        return; 
    }
    }

    
    if (right_qw == 1){
    var button2 = document.getElementById('first').children[1].children[2];
    button2.onclick = func2;

    function func2() {
        var right_qw = document.getElementById('first').children[1].getAttribute('right');
        if (right_qw == 1){
        this.children[0].classList.add('display-none');
        this.classList.remove('column-proect-light-red');
        this.children[0].nextElementSibling.classList.add('display-block');
        blue(button2);
        document.getElementById('first').children[1].setAttribute('right', 2);
        
        init();
        }
        return; 
    }
    }

    // проверяем отвечены ли вопросы о проекте и запускаем опрос

    if ((left_qw == 2 && right_qw != 2) || (right_qw == 2 && left_qw != 2 )){
        document.getElementById('first').children[1].children[1].children[0].classList.add('opacity07');
    }

    
    if (left_qw == 2 && right_qw == 2){
        window.setTimeout(function(){
        document.getElementById('first').children[1].children[1].children[0].classList.add('display-none');
        if (document.getElementById('first').children[2].children[0].children[0].classList.contains('display-none') == true){
        document.getElementById('first').children[2].children[0].children[0].classList.remove('display-none');
        
        var coord_target = offset(document.getElementById('first').children[2]);
        $("body,html,document").animate({scrollTop: coord_target},700);

        document.getElementById('first').children[2].children[0].classList.add('column-proect-light-red');
        document.getElementById('first').children[2].children[1].children[0].classList.add('opacity07');
        }
        }, 3500);
        opros();
    }
}


// Функция опроса
function opros() {
    // определяем на каком вопросе о команде остановился пользователь
    var start_elem = document.getElementById('first');
    start_elem = start_elem.children[2];
    for(var i = 1; i < 5; i++) {
        var check = parseInt(start_elem.getAttribute('left'));
        if (check > 0) {
            var slogan = parseInt(start_elem.children[0].children[check-1].getAttribute('row'));
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
    var check = parseInt(start_elem.getAttribute('left'));
    if (check > 0) {
        var slogan = parseInt(start_elem.children[0].children[check-1].getAttribute('row'));
        if (slogan == 0){return false}
    }
    if (check == 0) {return false};
    var row = parseInt(start_elem.children[0].children[check-1].getAttribute('row'));
    var pos = parseInt(start_elem.children[0].children[check-1].getAttribute('pos'));
    start_elem.children[0].children[check-1].classList.add('display-none');
    start_elem.children[0].classList.remove('column-proect-light-red');
    start_elem.setAttribute('left', 0);
    if (row == 0) {return false};
    var start_elem = document.getElementById('first');
    start_elem = start_elem.children[row+1];
        
    var coord_target = offset(start_elem);
    $("body,html,document").animate({scrollTop: coord_target},1000);
    
    if (pos > 1) {start_elem.children[2].children[pos-2].classList.add('display-none')};
    start_elem.children[2].children[pos-1].classList.add('display-block');
    if (row == 1) {pos=pos+1};
    if (row == 1 && pos == 3) {
        show();
        window.setTimeout(function(){
                
        $("body,html,document").animate({scrollTop: 0},2000);

        }, 8000);
        window.setTimeout(function(){
        document.getElementById('first').children[1].children[1].classList.remove('column2-image1');
        document.getElementById('first').children[1].children[1].classList.add('column2-image1-aim');
        document.getElementById('first').children[0].innerHTML = 'Полезные тесты и квизы';
        }, 10000);
        return false;}
    blue(start_elem.children[2]);
    window.setTimeout(function(){
    start_elem.children[0].children[pos-1].classList.add('display-block');
    start_elem.children[0].classList.add('column-proect-light-red');
    }, 2000);
    start_elem.setAttribute('left', pos);
    start_elem.children[1].children[0].classList.add('opacity07');
    return;
}

// функция финального показa
function show(){
    var start_elem = document.getElementById('first');
    start_elem.children[2].children[0].children[2].classList.add('display-block');
    yellow (start_elem.children[2].children[0]);
    start_elem.children[2].children[2].children[1].classList.add('display-none');
    start_elem.children[2].children[1].children[0].classList.add('display-none');
    start_elem.children[2].children[2].children[2].classList.add('display-block');
    yellow (start_elem.children[2].children[2]);

    window.setTimeout(function(){

    var coord_target = offset(start_elem.children[3]);
    $("body,html,document").animate({scrollTop: coord_target},1000);

    start_elem.children[3].children[0].children[2].classList.add('display-block');
    yellow(start_elem.children[3].children[0]);
    start_elem.children[3].children[1].children[0].classList.add('display-none');
    start_elem.children[3].children[2].children[1].classList.add('display-none');
    start_elem.children[3].children[2].children[2].classList.add('display-block');
    yellow(start_elem.children[3].children[2]);
    }, 2000);

    window.setTimeout(function(){

    var coord_target = offset(start_elem.children[4]);
    $("body,html,document").animate({scrollTop: coord_target},1000);

    start_elem.children[4].children[0].children[2].classList.add('display-block');
    yellow(start_elem.children[4].children[0]);
    start_elem.children[4].children[1].children[0].classList.add('display-none');
    start_elem.children[4].children[2].children[1].classList.add('display-none');
    start_elem.children[4].children[2].children[2].classList.add('display-block');
    yellow(start_elem.children[4].children[2]);
    }, 4000);

    window.setTimeout(function(){

    var coord_target = offset(start_elem.children[5]);;
    $("body,html,document").animate({scrollTop: coord_target},1000);

    start_elem.children[5].children[0].children[2].classList.add('display-block');
    yellow(start_elem.children[5].children[0]);
    start_elem.children[5].children[1].children[0].classList.add('display-none');
    start_elem.children[5].children[2].children[1].classList.add('display-none');
    start_elem.children[5].children[2].children[2].classList.add('display-block');
    yellow(start_elem.children[5].children[2]);
    }, 6000);
   
    return;
}

function blue(element){
    element.classList.add('column-proect-light-blue');
    window.setTimeout(function(){
        element.classList.remove('column-proect-light-blue');
    }, 2000);
    return;
}  

function yellow(element){
    element.classList.add('column-proect-light-yellow');
    window.setTimeout(function(){
        element.classList.remove('column-proect-light-yellow');
    }, 2000);
    return;
}  

function offset(el) {
    var rect = el.getBoundingClientRect().top + el.clientHeight/2 + document.documentElement.clientHeight/2;
    // console.log(rect);
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var top = rect + scrollTop - document.documentElement.clientHeight;
    
    return top;
}

