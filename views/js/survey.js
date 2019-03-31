window.onload = init;

var numStartQst = 0; // Вводим глобальный счетчик вопросов
var check_arr = [0];

// Создаем метод по заполнению правильных и неправильных ответов по уровням
Object.prototype.cookie_level = function() {
    check_arr = [cookies.active_question];
     var countQst_lev1 = parseInt(cookies.questions_count[0].questions_count);
     var countQst_lev2 = parseInt(cookies.questions_count[1].questions_count);
     var countQst_lev3 = parseInt(cookies.questions_count[2].questions_count);

     levelQst_1 = {hit:0, miss:0, next_lev:false, countQst: countQst_lev1,  check:false}; // Вводим глобальные уровни вопросов попал/промах
     levelQst_2 = {hit:0, miss:0, next_lev:false, countQst: countQst_lev2,  check:false};
     levelQst_3 = {hit:0, miss:0, next_lev:false, countQst: countQst_lev3,  check:false};

    
     switch (cookies.level_access) {
        case 1:
            for (var i=0; i<cookies.user_answer.length; i++) {
                if (cookies.user_answer[i].answer_is_true == "1") levelQst_1.hit += 1;
                else levelQst_1.miss += 1;
            };
        break;

        case 2:
        for (var i=0; i<cookies.user_answer.length; i++) {
            if (i < parseInt(cookies.questions_count[0].questions_count)) {
                if (cookies.user_answer[i].answer_is_true == "1") levelQst_1.hit += 1;
                else levelQst_1.miss += 1;
            } else { 
                if (cookies.user_answer[i].answer_is_true == "1") levelQst_2.hit += 1;
                else levelQst_2.miss += 1;}
        };
        break;

        case 3:
        for (var i=0; i<cookies.user_answer.length; i++) {
            if (i < parseInt(cookies.questions_count[0].questions_count)) {
                if (cookies.user_answer[i].answer_is_true == "1") levelQst_1.hit += 1;
                else levelQst_1.miss += 1;
            } else if (i >= parseInt(cookies.questions_count[0].questions_count) && 
            i < ((parseInt(cookies.questions_count[0].questions_count)) + 
            (parseInt(cookies.questions_count[1].questions_count)))) { 
                if (cookies.user_answer[i].answer_is_true == "1") levelQst_2.hit += 1;
                else levelQst_2.miss += 1;
            } else {
                if (cookies.user_answer[i].answer_is_true == "1") levelQst_3.hit += 1;
                else levelQst_3.miss += 1;
            }
        };
        break;
    }
}

// Создаем метод по проверке правильных ответов для перехода на след.уровень при 80% правильных ответов
// _________________ Первый вариант______________________________
// Object.prototype.next_level = function(){
//     if ((this.hit/(this.hit+this.miss))*100 >= 100) {this.next_lev = true;
//     return true;
//     } else return false;
// } 

Object.prototype.next_level = function(){                   // Для завершения уровня нужно набрать 100%
    if (this.hit == this.countQst) {this.next_lev = true;
    return true;
    } else return false;
} 

var levelQst_1 = {hit:0, miss:0, next_lev:false, countQst:0, check:false}; // Вводим глобальные уровни вопросов попал/промах и подсчет итогов
var levelQst_2 = {hit:0, miss:0, next_lev:false, countQst:0, check:false};
var levelQst_3 = {hit:0, miss:0, next_lev:false, countQst:0, check:false};
var resultQst = {hit: function() {return (levelQst_1.hit + levelQst_2.hit + levelQst_3.hit);}, miss: function() {return (levelQst_1.miss+levelQst_2.miss+levelQst_3.miss);}};

var countQst;     // Общее число вопросов
var cookies;      // Репозитарий для куков
var otvet;        // Создаем ответ при получении AJAX запроса

//_____________________________РЕПОЗИТАРИЙ ДЛЯ КАРТИНОК______________________________________________
var arr_win = ['Dolphin', 'elephant', 'gorilla'];
var arr_lose = ['Hippopotamus', 'lion', 'Turtle', 'Panda'];
var arr_lev_win = ['ice cream', 'owl'];
var arr_lev_lose = ['home', 'Butterfly'];
var game_win = 'Firefox-icon'; 

//_______________________________НАЧАЛО ДЕЙСТВИЯ КОДА_________________________________________________

function init() {
    
    zapros_Cookies();           // Делаем синхронный запрос
    
    Object.cookie_level();
    
    fill_circle();
    
    console.log(cookies);

    var status_Game = document.getElementsByClassName('slider-box-main');
    if (cookies.user_answer.length > 0 && document.querySelectorAll("table")[0].style.opacity == "1") 
    status_Game[0].style.display = "block";

    var button = document.getElementById('button');
    button.onclick = startOpros;
    
    var next = document.getElementById('next');
    // var prev = document.getElementById('prev');

    var inputs = document.querySelectorAll("input");

    var forward = document.getElementById("forward");

    var answer_tr = document.querySelectorAll(".left");

    answer_tr.forEach(function(item, i) {
        item.onclick = function() {
            switch (inputs[i].type) {
                case 'radio':
                    inputs[i].checked = true;
                    next_ready();
                break;
                case 'checkbox':
                    if (inputs[i].checked == true) inputs[i].checked = false;
                    else inputs[i].checked = true;
                    next_ready();
                break 
            }
        };
    });

    inputs.forEach(function (item) {
        item.onclick = next_ready;
    });
    
    next.onclick = json_Q_A;
    
    forward.onclick = update_afterClientFoward;

}

function zapros_Cookies(){      //  Синхронный запрос
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'index.php?page=get_answer', false);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();

    cookies = JSON.parse(xhr.responseText);
    numStartQst = 0;
    countQst = 0;
    for (var i =0; i<cookies.questions_count.length; i++) {
            countQst += parseInt(cookies.questions_count[i].questions_count);
    }


    // if (cookies.user_answer.length > 0) {
    //     // countQst = 0;
    numStartQst = cookies.active_question;

    // }  
    // } else {
        
    //     // countQst = 0;
    //     console.log(numStartQst);
    //     // for (var i =0; i<cookies.questions_count.length; i++) {
    //     //     countQst += parseInt(cookies.questions_count[i].questions_count);
    //     // }
    // }

    return cookies;
}

function fill_circle() {
    var level = document.querySelectorAll(".step-level");
    var circles = document.querySelectorAll(".step-survey");
    var numQstLevel_1 = parseInt(cookies.questions_count[0].questions_count);
    var numQstLevel_2 = parseInt(cookies.questions_count[1].questions_count);
    console.log(C('slider-level')[0]);
    console.log(level[0].style);
   

    for (var i=0; i<countQst; i++) {
        circles[i].style.background = 'white';
    }
    // level[0].innerHTML="rerrererer";
    if (numStartQst==0) {
        level[0].innerHTML="1/"+countQst;
    } else if (numStartQst == countQst) level[0].innerHTML = numStartQst + "/" +countQst;
    else level[0].innerHTML = numStartQst + 1 + '/' + countQst;
    
    // level[0].innerHTML = 10;}
    // else 

    for (var i=0; i<countQst; i++) {
        // circles[i].style. = 'grey';
        circles[i].style.display = 'inline';
        if (i<numQstLevel_1)
            circles[i].style.border = '1px solid yellow';
            else if (i>=numQstLevel_1 && i<numQstLevel_1 + numQstLevel_2)
            circles[i].style.border = '1px solid blue';
            else if (i>=numQstLevel_1 + numQstLevel_2)
            circles[i].style.border = '1px solid red';  
    }
    for (var i=0; i<cookies.user_answer.length; i++) {
        if (cookies.user_answer[i].answer_is_true == '1' && i<numQstLevel_1 )
            circles[i].style.background = 'yellow';
            else if (cookies.user_answer[i].answer_is_true == '1' && i>=numQstLevel_1 && i<numQstLevel_1 + numQstLevel_2)
            circles[i].style.background = 'blue';
            else if (cookies.user_answer[i].answer_is_true == '1' && i>=numQstLevel_1 + numQstLevel_2)
            circles[i].style.background = 'red';
        else circles[i].style.background = 'grey';
    }

}

// Появление кнопки ОТВЕТИТЬ
function next_ready() {
    var inputs = document.querySelectorAll("input");
    var check_ready = false;
    for (var i=0; i<inputs.length; i++) {
        if (inputs[i].checked == true) check_ready = true;
    }
    if (check_ready == true) {
    next.style.display = 'block';
    next.style.opacity = '1';
    } else {
    next.style.display = 'none';
    next.style.opacity = '0';
    }
}

// Создаем обработчик для отправки запроса JSON <<XHR LEVEL 1>> ПРИ НАЖАТИИ НА КНОПКУ ОТВЕТИТЬ
function json_Q_A() {
    next.style.display = 'none';
    var inputs = document.querySelectorAll("input");
    var numAnsw, numQst;
    if(inputs[0].type == 'checkbox') numAnsw = [];
    for (var i=0; i<inputs.length; i++) {
       if (inputs[i].checked===true) {
            switch (inputs[i].type) {
            case 'radio':
                numAnsw = parseInt(inputs[i].getAttribute('value'));
                numQst = parseInt(inputs[i].getAttribute('name').substring(1));
            break;
            case 'checkbox':
                numAnsw.push(parseInt(inputs[i].getAttribute('value')));
                numQst = parseInt(inputs[i].getAttribute('name').substring(1));
            break;
            };
        }
    };
    console.log(numAnsw);
    console.log(numQst);

    // numStartQst++;
    
    var data = {
        id_question: numQst,
        id_answer: numAnsw,
        sign_bot: 0              // ЕЩЕ НЕ ПОНЯЛ КАК ВЫТАСКИВАТЬ ПЕРЕМЕННУЮ sign_bot!!!!!!!!!!!!!!!!!!!!!!!!!
    };

    var data = JSON.stringify(data);
    // console.log(data);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'index.php?page=put_answer', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(data);
  
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) {
            return;
        }
        console.log(xhr.responseText); 
        otvet = JSON.parse(xhr.responseText);
        console.log(otvet);
    update_afterClientAnswer(otvet);
    }
    
    return false;
}

function json_Q_A_next() {
    
    // numStartQst++;
    if (numStartQst<0) {return numStartQst=0;};
    var data = {
        numStartQst:numStartQst
    };

    var data = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'index.php?page=get_question', false);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(data);
  
    // xhr.onreadystatechange = function() {
    //     if (xhr.readyState != 4) {
    //         return;
    //     }
    
    
    var messages = JSON.parse(xhr.responseText);
    
    // numStartQst++;
    update_Q_A(messages);
    // }

    return false;
}

function startOpros() {
    handle = setInterval(anime_level,100); // Анимация - плавное появление круга с номером вопроса
    handle_step = setInterval(anime_step_up,100,numStartQst);

    var status_Game = document.getElementsByClassName('board');
    status_Game[0].style.display = "flex";
    var opros = document.getElementsByClassName('opros');
    opros[0].style.display = "flex";
    var tables = document.querySelectorAll("table");
    for (var i = 0; i < tables.length; i++) {
        tables[i].style.opacity = "1";
    };
    document.getElementById("button").style.display="none";
    document.getElementsByClassName('title')[0].style.display="none";
    // numStartQst=Math.floor((Math.random()*5));                // Задаем случайное число для вопроса из arr [0,1,2,3,4]
    var data = {
        numStartQst:numStartQst,
    };

    var data = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'index.php?page=get_question', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(data);
  
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) {
            return;
        }
    
    var messages = JSON.parse(xhr.responseText);
    // console.log(messages);  
    update_Q_A(messages);
    }
    return false;
}

function update_Q_A (messages) {
    var answShuffle = [];
    
    messages.answer.id_answer.forEach(function(item,i) {
        var ans = [];
        ans.push(item);
        ans.push(messages.answer.answer[i]);
        // ans[item] = messages.answer.answer[i];
        answShuffle.push(ans);
    });

    answShuffle = answShuffle.shuffle();        //Перемешываем массив с элементами ответов
    var idShuffle = [], answerShuffle=[];       //Разбиваем на два массива*** делаем это, т.к. цикл не видит второго уровня и требуется еще один вложенный цикл
    answShuffle.forEach(function(item, i){
        idShuffle.push(item[0]);
        answerShuffle.push(item[1])
    });
    //    console.log(idShuffle);  
    //    console.log(answerShuffle);
   
    var inputs = document.querySelectorAll("input");
    for (var i=0; i<inputs.length; i++) {
        inputs[i].checked = false;
        if (messages.question.is_multi_answer == '1'){ 
        inputs[i].setAttribute('type', 'checkbox');
        inputs[i].nextElementSibling.classList.remove ('radio');  
        inputs[i].nextElementSibling.classList.add ('checkbox'); // Установка чекбоксов или радиокнопок;
        }else {inputs[i].setAttribute('type', 'radio');
        inputs[i].nextElementSibling.classList.add ('radio');  
        inputs[i].nextElementSibling.classList.remove ('checkbox');
        }
        inputs[i].setAttribute('name', 'Q' + messages.question.id_parent);
        inputs[i].setAttribute('value', idShuffle[i] ); //*** в цикле не получается указавать вложенные массивы 
        
    };
    // console.log(inputs);

    var Q = document.getElementById("Q"); // Выбираем Блок для вставки след.вопроса для юзера
    var A0 = document.getElementById("A0"); // Выбираем Блок для вставки ответа
    var A1 = document.getElementById("A1");     
    var A2 = document.getElementById("A2");
    var A3 = document.getElementById("A3");
    var A4 = document.getElementById("A4");
    var A5 = document.getElementById("A5");
    var A6 = document.getElementById("A6");
    var arr = [A0,A1,A2,A3,A4,A5,A6]

       // console.log(arr);
    // var div = document.createElement("div");
    // div.setAttribute("class", "start-Answer");
    // var answer_all ='';
    Q.innerHTML= messages.question.question; // Обращаемся к свойству question 0 элемента массива и заливаем в ДИВ с вопросом
    for (var i=0; i<arr.length; i++) {
        arr[i].innerHTML = '';              // Обнуляем предыдущие ответы
    }
    
    answerShuffle.forEach(function(item,i) {         
    return eval('A'+ i).innerHTML = item;   
    
    });
    
    for (var i=0; i<arr.length; i++) {
       if (arr[i].innerHTML == '') {
            eval('A'+ i).parentElement.style.display = 'none';
       } else {eval('A'+ i).parentElement.style.display = 'flex'};                                                        // Обнуляем предыдущие ответы
    }
    // console.log(document.cookie);
    // return eval ('A' + i) - запускаем код через строку
    // div_A.innerHTML = answer_all; // Обращаемся к свойству answer 1 элемента массива и заливаем в ДИВ с ответом
}

function update_afterClientAnswer(otvet) {
    // levelQst_1.check = false;
    // levelQst_2.check = false;
    // levelQst_3.check = false;
    var inputs = document.querySelectorAll("input");
    for (var i=0; i<inputs.length; i++) {
        inputs[i].checked = false;
    }
    var result = document.getElementById("result");
    var dark = document.getElementById("dark");
    var otvet_true = document.getElementById("true");
    var otvet_false = document.getElementById("false");
    var image = document.getElementById("image");
    var why = document.getElementById("why");
    var why_title = document.getElementById("why-title");
    
    var countQst_lev1 = parseInt(cookies.questions_count[0].questions_count);
    var countQst_lev2 = parseInt(cookies.questions_count[0].questions_count) + parseInt(cookies.questions_count[1].questions_count);
    var countQst_lev3 = parseInt(cookies.questions_count[0].questions_count) + parseInt(cookies.questions_count[1].questions_count) + parseInt(cookies.questions_count[2].questions_count);
    
    // console.log(check_arr);
    numStartQst = otvet.active_question;
    check_arr.push(otvet.active_question);
    // console.log(check_arr);
    // console.log(countQst_lev3);

    if ((check_arr[1] <= check_arr[0]) && (cookies.user_answer.length == (levelQst_1.countQst - 1))) {
        if (otvet.answer_is_true) levelQst_1.hit++; 
            else levelQst_1.miss++;
    } else if ((check_arr[1] <= check_arr[0]) && (cookies.user_answer.length == (countQst_lev2 - 1))) {
        if (otvet.answer_is_true) levelQst_2.hit++; 
            else levelQst_2.miss++;
    } else if ((check_arr[1] <= check_arr[0]) && (cookies.user_answer.length == (countQst_lev3 - 1))) {
        if (otvet.answer_is_true) levelQst_3.hit++; 
            else levelQst_3.miss++;
    }
    // console.log(levelQst_3.hit);   
    // console.log(levelQst_3.miss);   

    switch (numStartQst) {
        case countQst_lev1 :
            // if (otvet.answer_is_true) {
                levelQst_1.hit++; 
                levelQst_1.miss=0;
            // } else levelQst_1.miss++;
        break;
        case countQst_lev2 :
            // if (otvet.answer_is_true) levelQst_2.hit++; 
            levelQst_2.hit++; 
            levelQst_2.miss=0;
            // else levelQst_2.miss++;
        break;
        case countQst_lev3 :
            // if (otvet.answer_is_true) levelQst_3.hit++;
            levelQst_3.hit++; 
            levelQst_3.miss=0;
            // else levelQst_3.miss++;
            otvet_true.innerHTML = 'Вы знаете правильный ответ. Поздравляем!';
        break;
        default:
        
        break;
    }


    result.style.display = "flex";
    dark.style.display = "block";
    if (otvet.answer_is_true == 1) {
        image.classList = [];
        image.classList.add('result-tru-question');
        image.style.display = "block";
        otvet_true.innerHTML = "Вы знаете правильный ответ. Поздравляем!";
        otvet_true.style.display = "block";
        why_title.innerHTML = "Пояснение:";
        why_title.style.display = "block";
        why.innerHTML = otvet.answer_is_true_comment;
        why.style.display = "block";
    } else {
        image.classList = [];
        image.classList.add('result-false-question');
        image.style.display = "block";
        otvet_false.innerHTML =  'Вы ошиблись. Вопрос ждет вашего возвращения.';
        otvet_false.style.display = "block";
    }
   
   
    // if (numStartQst == parseInt(cookies.questions_count[0].questions_count)) {
    //     if (otvet.answer_is_true) levelQst_1.hit++;
    //     else levelQst_1.miss++;
    //     console.log(!(levelQst_1.next_level()));
    //     if (!(levelQst_1.next_level())) { 
    //         why.innerHTML = "<strong>Результаты первого уровня: попаданий " + levelQst_1.hit + "; промахов " + levelQst_1.miss + "</br>" +
    //         " Вы можете пройти опрос повторно</strong>";
    //         why.style.display = "block"; 
    //     } else {
    //         why.innerHTML = "<strong>Результаты первого уровня: попаданий " + levelQst_1.hit + "; промахов " + levelQst_1.miss + "</br>" +
    //         " Поздравляем вы переходите на следующий уровень</strong>";
    //         why.style.display = "block"; 
    //     }
    // }
}

function valid_level_1() {
    var result = document.getElementById("result");
    var dark = document.getElementById("dark");
    var otvet_true = document.getElementById("true");
    var otvet_false = document.getElementById("false");
    var image = document.getElementById("image");
    var why = document.getElementById("why");
    var why_title = document.getElementById("why-title");

    
    // if (numStartQst == parseInt(cookies.questions_count[0].questions_count)) {
        // if (otvet.answer_is_true) levelQst_1.hit++;
        // else levelQst_1.miss++;
        // console.log(!(levelQst_1.next_level()));
        levelQst_1.check = true;
        levelQst_1.next_level();
        if (!(levelQst_1.next_lev)) {
            why.style.display = "none"; 
            why_title.style.display = "none";
            otvet_true.style.display = 'none';
            image.classList = [];
            image.classList.add('result-loss-level');
            image.style.display = "block";
            otvet_false.innerHTML = "К сожелению вы не ответили на все вопросы уровня \"Easy\". Для прохождения уровня предлагаем вернуться к вопросам с ошибочными ответами";
            otvet_false.style.display = "block"; 
            why_title.innerHTML = "Результаты первого уровня";
            why.innerHTML = "Правильных ответов: "  + levelQst_1.hit + "</br>" + 
            "Неверных ответов: " + levelQst_1.miss;
            why.style.display = "block";
            why_title.style.display = "block";

            
        } else {

            why.style.display = "none";
            why_title.style.display = "none";
            image.classList = [];
            image.classList.add('result-pass-level1');
            image.style.display = "block";
            otvet_true.innerHTML = "Поздравляем! Вы прошли уровень \"Easy\".";
            otvet_true.style.display = "block";
        }
    // } 
    
    // else
    // return false;
}

function valid_level_2() {
    var result = document.getElementById("result");
    var dark = document.getElementById("dark");
    var otvet_true = document.getElementById("true");
    var otvet_false = document.getElementById("false");
    var image = document.getElementById("image");
    var why = document.getElementById("why");
    var why_title = document.getElementById("why-title");

    // if (numStartQst == parseInt(cookies.questions_count[0].questions_count)) {
        // if (otvet.answer_is_true) levelQst_1.hit++;
        // else levelQst_1.miss++;
        // console.log(!(levelQst_1.next_level()));
        levelQst_2.check = true;
        levelQst_2.next_level();
        if (!(levelQst_2.next_lev)) {
            why.style.display = "none"; 
            why_title.style.display = "none";
            otvet_true.style.display = "none"; 
            image.classList = [];
            image.classList.add('result-loss-level');
            image.style.display = "block";
            otvet_false.innerHTML = "К сожелению вы не ответили на все вопросы уровня \"Medium\". Для прохождения уровня предлагаем вернуться к вопросам с ошибочными ответами";
            otvet_false.style.display = "block"; 
            why_title.innerHTML = "Результаты второго уровня:";
            why.innerHTML = "Правильных ответов: "  + levelQst_1.hit + "</br>" + 
            "Неверных ответов: " + levelQst_1.miss;
            why.style.display = "block";
            why_title.style.display = "block";
            
        } else {
            why.style.display = "none";
            why_title.style.display = "none";
            image.classList = [];
            image.classList.add('result-pass-level2');
            image.style.display = "block";
            otvet_true.innerHTML = "Поздравляем! Вы прошли уровень \"Medium\"";
            otvet_true.style.display = "block";
        }
    // } 
    
    // else
    // return false;
}

function valid_level_3() {
    // var result = document.getElementById("result");
    // var dark = document.getElementById("dark");
    var otvet_true = document.getElementById("true");
    var otvet_false = document.getElementById("false");
    var image = document.getElementById("image");
    var why = document.getElementById("why");
    var why_title = document.getElementById("why-title");

    // if (numStartQst == parseInt(cookies.questions_count[0].questions_count)) {
        // if (otvet.answer_is_true) levelQst_1.hit++;
        // else levelQst_1.miss++;
        // console.log(!(levelQst_1.next_level()));
        levelQst_3.check = true;
        levelQst_3.next_level();
        // console.log(levelQst_3.check);
        // console.log(levelQst_3.next_lev);
        if (!(levelQst_3.next_lev)) {
            why.style.display = "none";
            why_title.style.display = "none"; 
            otvet_true.style.display = 'none';
            image.classList = [];
            image.classList.add('result-loss-level');
            image.style.display = "block";
            otvet_false.innerHTML = "К сожелению вы не ответили на все вопросы уровня \"Hard\". Для прохождения уровня предлагаем вернуться к вопросам с ошибочными ответами";
            otvet_false.style.display = "block"; 
            why_title.innerHTML = "Результаты третьего уровня";
            why.innerHTML = "Правильных ответов: "  + levelQst_1.hit + "</br>" + 
            "Неверных ответов: " + levelQst_1.miss;
            why.style.display = "block";
            why_title.style.display = "block";
            
            
        } else {
            why.style.display = "none";
            why_title.style.display = "none";
            image.classList = [];
            image.classList.add('result-pass-level3');
            image.style.display = "block";
            otvet_true.innerHTML = "Поздравляем! Вы прошли уровень \"Hard\".";
            otvet_true.style.display = "block";
        }
    // } 
    
    // else
    // return false;
}

function update_afterClientFoward() {
    var result = document.getElementById("result");
    var dark = document.getElementById("dark");
    var otvet_true = document.getElementById("true");
    var otvet_false = document.getElementById("false");
    var image = document.getElementById("image");
    var why = document.getElementById("why");
    var why_title = document.getElementById("why-title");
    
    var countQst_lev1 = parseInt(cookies.questions_count[0].questions_count);
    var countQst_lev2 = parseInt(cookies.questions_count[0].questions_count) + parseInt(cookies.questions_count[1].questions_count);
    var countQst_lev3 = parseInt(cookies.questions_count[0].questions_count) + parseInt(cookies.questions_count[1].questions_count) + parseInt(cookies.questions_count[2].questions_count);

    // console.log((((check_arr[1] <= check_arr[0]) && (cookies.user_answer.length == (countQst_lev3 - 1))) ||
    // ((check_arr[1] == check_arr[0]) && (levelQst_3.hit == (levelQst_3.countQst - 1)))));
    switch (numStartQst) {
        
        case countQst_lev1 :
            if (!levelQst_1.check) valid_level_1();
            else if (levelQst_1.check==true && levelQst_1.next_lev == true) {
                result.style.display = "none";
                dark.style.display = "none";
                otvet_true.style.display = "none";
                otvet_false.style.display = "none";
                image.style.display = "none";
                why.style.display = "none";
                why_title.style.display = "none";
                why.innerHTML = '';
                
                json_Q_A_next();

                init();
            } 
            // else if (levelQst_1.check==true && levelQst_1.next_lev == false) {
            //     numStartQst = cookies.active_question;
                
            //     // eraseCookie("PHPSESSID");

            //     result.style.display = "none";
            //     dark.style.display = "none";
            //     otvet_true.style.display = "none";
            //     otvet_false.style.display = "none";
            //     image_true.style.display = "none";
            //     image_false.style.display = "none";
            //     why.style.display = "none";
            //     why.innerHTML = '';

            //     json_Q_A_next();

            //     init();
            // }
        break;

        case countQst_lev2 :
        if (cookies.user_answer.length <= countQst_lev2) {
            if (!levelQst_2.check) valid_level_2();
            else if (levelQst_2.check==true && levelQst_2.next_lev == true) {
                result.style.display = "none";
                dark.style.display = "none";
                otvet_true.style.display = "none";
                otvet_false.style.display = "none";
                image.style.display = "none";
                why.style.display = "none";
                why_title.style.display = "none";
                why.innerHTML = '';

                json_Q_A_next();

                init();
            } 
        }  else if (((check_arr[1] <= check_arr[0]) && (cookies.user_answer.length == (countQst_lev3 - 1))) ||
        ((check_arr[1] == check_arr[0]) && (levelQst_3.hit == (levelQst_3.countQst - 1)))) {
            if (!levelQst_3.check) valid_level_3();
            else if (levelQst_3.check==true) { // && levelQst_3.next_lev == true
            result.style.display = "none";
            dark.style.display = "none";
            otvet_true.style.display = "none";
            otvet_false.style.display = "none";
            image.style.display = "none";
            why.style.display = "none";
            why_title.style.display = "none";
            why.innerHTML = '';
            
            json_Q_A_next();

            init();
            } 

        }
        // else if (levelQst_2.check==true && levelQst_2.next_lev == false) {
        //     // numStartQst = 0;

        //     // eraseCookie("PHPSESSID");

        //     result.style.display = "none";
        //     dark.style.display = "none";
        //     otvet_true.style.display = "none";
        //     otvet_false.style.display = "none";
        //     image_true.style.display = "none";
        //     image_false.style.display = "none";
        //     why.style.display = "none";
        //     why.innerHTML = '';
            
        //     json_Q_A_next();

        //     init();
        // }
        break;

        case countQst_lev3 :
        if (!levelQst_3.check) valid_level_3();
        else if (levelQst_3.check==true && levelQst_3.next_lev == true) {
            result.style.display = "none";
            dark.style.display = "none";
            otvet_true.style.display = "none";
            otvet_false.style.display = "none";
            image.style.display = "none";
            why.style.display = "none";
            why_title.style.display = "none";
            why.innerHTML = '';
            
            // json_Q_A_next();
            var circles = document.querySelectorAll(".step-survey");
            circles[countQst-1].style.background = 'red';

            init();
        } 
        // else if (levelQst_3.check==true && levelQst_3.next_lev == false) {
        //     // numStartQst = 0;
            

        //     // eraseCookie("PHPSESSID");

        //     result.style.display = "none";
        //     dark.style.display = "none";
        //     otvet_true.style.display = "none";
        //     otvet_false.style.display = "none";
        //     image_true.style.display = "none";
        //     image_false.style.display = "none";
        //     why.style.display = "none";
        //     why.innerHTML = '';
        //     /*
        //     // for (var i=0; i<countQst; i++) {
        //     //     circles[i].style.background = 'white';
        //     // }

        //     // json_Q_A_next(); */
        //     var circles = document.querySelectorAll(".step-survey");
        //     circles[countQst-1].style.background = 'grey';
            
        //     init();
        // }
        break;

        default :
          
            if (((check_arr[1] <= check_arr[0]) && (cookies.user_answer.length == (levelQst_1.countQst - 1))) ||
            ((check_arr[1] == check_arr[0]) && (levelQst_1.hit == (levelQst_1.countQst - 1)))) {
                // if ((cookies.user_answer.length == countQst_lev1) || (cookies.user_answer.length == (countQst_lev1 - 1))) {
                if (!levelQst_1.check) valid_level_1();
                else if (levelQst_1.check==true) { // && levelQst_1.next_lev == true
                    result.style.display = "none";
                    dark.style.display = "none";
                    otvet_true.style.display = "none";
                    otvet_false.style.display = "none";
                    image.style.display = "none";
                    why.style.display = "none";
                    why_title.style.display = "none";
                    why.innerHTML = '';
                    
                    json_Q_A_next();
        
                    init();
                } 
                // }
            } else if (((check_arr[1] <= check_arr[0]) && (cookies.user_answer.length == (countQst_lev2 - 1))) ||
            ((check_arr[1] == check_arr[0]) && (levelQst_2.hit == (levelQst_2.countQst - 1)))) {
                if (!levelQst_2.check) valid_level_2();
                else if (levelQst_2.check==true) { // && levelQst_2.next_lev == true
                    result.style.display = "none";
                    dark.style.display = "none";
                    otvet_true.style.display = "none";
                    otvet_false.style.display = "none";
                    image.style.display = "none";
                    why.style.display = "none";
                    why_title.style.display = "none";
                    why.innerHTML = '';
                
                json_Q_A_next();

                init();
                } 
            } else if (((check_arr[1] <= check_arr[0]) && (cookies.user_answer.length == (countQst_lev3 - 1))) ||
            ((check_arr[1] == check_arr[0]) && (levelQst_3.hit == (levelQst_3.countQst - 1)))) {
                if (!levelQst_3.check) valid_level_3();
                else if (levelQst_3.check==true) { // && levelQst_3.next_lev == true
                    result.style.display = "none";
                    dark.style.display = "none";
                    otvet_true.style.display = "none";
                    otvet_false.style.display = "none";
                    image.style.display = "none";
                    why.style.display = "none";
                    why_title.style.display = "none";
                    why.innerHTML = '';
                
                json_Q_A_next();

                init();
                } 

            } else {    
                result.style.display = "none";
                dark.style.display = "none";
                otvet_true.style.display = "none";
                otvet_false.style.display = "none";
                image.style.display = "none";
                why.style.display = "none";
                why_title.style.display = "none";
                why.innerHTML = '';

                json_Q_A_next();

                zapros_Cookies();           // Делаем синхронный запрос
    
                Object.cookie_level();
                var level = document.querySelectorAll(".step-level");
                if (numStartQst==0) {
                    level[0].innerHTML="1/"+countQst;
                } else if (numStartQst == countQst) level[0].innerHTML = numStartQst + "/" +countQst;
                else level[0].innerHTML = numStartQst + 1 + '/' + countQst;

                // init();
                console.log(otvet);

                if (otvet.answer_is_true == 1)  {handle_hit = setInterval(anime_step_fillHit,100, numStartQst);}
                else handle_miss = setInterval(anime_step_fillMiss, 100, numStartQst);

                setTimeout("handle_down = setInterval(anime_step_down, 100, numStartQst)", 1000);

                setTimeout("handle_move_left = setInterval(anime_move_left, 20, numStartQst)", 2000);
                
                setTimeout("handle_step = setInterval(anime_step_up, 100, numStartQst)", 3000);

            }
        break;
    }
   
    // console.log(levelQst_3.check)
}
// ______________________________________Функции анимации элементов ДОМ________________________________________
var num_opacity=0;          // Анимация Круга со счетом вопросов при старте
function anime_level() {
    num_opacity += 0.02;
    if (num_opacity >= 1) clearInterval(handle);
    S(C('slider-level')[0]).opacity = num_opacity;
    
}
var num_step =15, num_margin_right = 30;              // Анимация UP маленького круга степ-сурвей перед ответом
function anime_step_up(numStartQst) {
    num_step += 1;
    num_margin_right -= 1;
    if (num_step == 20) clearInterval(handle_step);
    S(C('step-survey')[numStartQst]).marginRight = num_margin_right + 'px';
    S(C('step-survey')[numStartQst]).width = num_step + 'px';
    S(C('step-survey')[numStartQst]).height = num_step + 'px';
  }

function anime_step_down(numStartQst) {         // Анимация DOWN круга степ-сурвей после ответа
    num_step -= 1;
    num_margin_right += 1;
    if (num_step == 15) clearInterval(handle_down);
    S(C('step-survey')[(numStartQst-1)]).marginRight = num_margin_right + 'px';
    S(C('step-survey')[(numStartQst-1)]).width = num_step + 'px';
    S(C('step-survey')[(numStartQst-1)]).height = num_step + 'px';
}

var step_alpha = 0;                               // закрашивание при промахе
function anime_step_fillMiss(numStartQst) {
    step_alpha += 0.1;
    if (step_alpha == 1) clearInterval(handle_miss);
    S(C('step-survey')[numStartQst-1]).backgroundColor = "rgba(128,128,128," + step_alpha + ")"
}

function anime_step_fillHit(numStartQst) {          // закрашивание при попадании
    step_alpha += 0.1;
    if (step_alpha == 1) clearInterval(handle_hit);
    S(C('step-survey')[numStartQst-1]).backgroundColor = "rgba(255,255,0," + step_alpha + ")"
}

var margin_left = 5;                                // смещение слайдера после ответа (первый круг)
function anime_move_left(numStartQst) {
    margin_left -= 5;
    if (margin_left == -45 || margin_left == (-45*numStartQst)) clearInterval(handle_move_left);
    S(C('slider-survey')[0]).marginLeft = margin_left + 'px';
}

function anime_move_rigth(numStartQst) {         // смещение слайдера после ответа (второй круг)
    margin_left += 5;
    if ((numStartQst==0 && margin_left == 5) || (numStartQst==1 && margin_left == -45) || (numStartQst==2 && margin_left == -90) ) clearInterval(handle_move_right);
    S(C('slider-survey')[0]).marginLeft = margin_left + 'px';
}

//_______________________________________Функции для работы со стилями элементов DOM_________________
function O(obj) {       
    if (typeof obj == 'object') return obj;                 // выбираем елемент по ссылке или по ID = ''
    else return document.getElementById(obj)
}

function S(obj) {
    return O(obj).style                                     // выбираем стиль элемента
}

function C(name) {
    var elements = document.getElementsByTagName('*');   // выбираем по классу коллекцию элементов и делаем массив
    var objects = [];
    for (var i=0; i<elements.length; i++) {
        if (elements[i].className == name)
        objects.push(elements[i]) 
    }
    return objects
}

// _______________________________________Функция перетасовки_________________________________________
Array.prototype.shuffle = function() {
    for (var i = this.length - 1; i > 0; i--) {
        var num = Math.floor(Math.random() * (i + 1));
        var d = this[num];
        this[num] = this[i];
        this[i] = d;
    }
    return this;
}

//__________________________________ ФУНКЦИИ ДЛЯ РАБОТЫ С COOKIES____________________________________________
function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}









// window.onload = init;
// var numStartQst = 3; // Вводим глобальный счетчик вопросов
// function init() {
//     var numStartQst = 3; // Вводим счетчик вопросов
//     var button = document.getElementById('button');
//     button.onclick = json_Q_A;

//     console.log(numStartQst);

//     // numStartQst++;
//     // console.log((numStartQst));
// }


// // Создаем обработчик для отправки запроса JSON

// function json_Q_A() {
    
//     var url = "/controllers/handlers/get_question.php";
      
//     var url = "/do-my/controllers/handlers/get_question.json"; // Дабавил файл get_question.json для теста XHR
//     var request = new XMLHttpRequest();
//     request.open("POST", url);
//     request.open("GET", url);
//     request.onload = function() { 
//         if (request.status == 200) { 
//         update_Q_A(request.responseText);
//         }
//         }; console.log(request.responseText);
//     };
//     var number_Q = JSON.stringify(numStartQst++); //Передаем в строке следующий номер вопроса    ИЛИ(Выбираем ID элемента DOM, на который щелкнул user и парсим parseInt(str.match(/\d+/) ) // 
//     numStartQst++; 
//     var number_Q = JSON.stringify(numStartQst); //Передаем в строке следующий номер вопроса    ИЛИ(Выбираем ID элемента DOM, на который щелкнул user и парсим parseInt(str.match(/\d+/) ) // 
//     console.log(number_Q);
//     request.send(number_Q);
//     return numStartQst++;
//     return numStartQst;
   
// }

// function update_Q_A (responseText) {
//     var div_Q = document.getElementById("Qst"); // Выбираем Блок для вставки след.вопроса для юзера
//     var div_A = document.getElementById("Asw"); // Выбираем Блок для вставки ответа
//     var obj= JSON.parse(responseText); // Должен придти массив с ответами []
//     console.log(obj);
//     // var div = document.createElement("div");
//     // div.setAttribute("class", "start-Answer");
//     div_Q.innerHTML= obj[0].question; // Обращаемся к свойству question 0 элемента массива и заливаем в ДИВ с вопросом