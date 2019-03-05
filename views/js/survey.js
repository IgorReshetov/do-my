window.onload = init;

var numStartQst = 0; // Вводим глобальный счетчик вопросов

function init() {
    zapros_Cookies();   // Запрашиваем Куки с сервера

    var button = document.getElementById('button');
    button.onclick = startOpros;
    
    var next = document.getElementById('next');
    // var prev = document.getElementById('prev');

    var inputs = document.querySelectorAll("input");

    var forward = document.getElementById("forward");

    inputs.forEach(function (item) {
        item.onclick = next_ready;
    });
    
    next.onclick = json_Q_A;
    
    forward.onclick = update_afterClientFoward;

}

function zapros_Cookies(){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'index.php?page=get_answer', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) {
            return;
        }

    console.log(xhr.responseText);

    var Cookies = JSON.parse(xhr.responseText);
    console.log(Cookies);   
    // update_div_stepSurvey(Cookies);            // Вызвать функцию меняющую блок с кружками
    // }
    }
    return false;
}


function next_ready() {
    next.style.display = 'block';
    next.style.opacity = '1';
}

// Создаем обработчик для отправки запроса JSON <<XHR LEVEL 1>>
function json_Q_A() {
    var inputs = document.querySelectorAll("input");
    var numAnsw, numQst;
    
    for (var i=0; i<inputs.length; i++) {
        if (inputs[i].checked===true) { 
            numAnsw = parseInt(inputs[i].getAttribute('value'));
            numQst = parseInt(inputs[i].getAttribute('name').substring(1));
        };  
    };
    // console.log(numAnsw);
    // console.log(numQst);

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

    var otvet = JSON.parse(xhr.responseText);
    // console.log(otvet);   
    update_afterClientAnswer(otvet);
    }

    return false;
}

function json_Q_A_next() {
    numStartQst++;
    if (numStartQst<0) {return numStartQst=0;};
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
      
    update_Q_A(messages);
    }

    return false;
}

function startOpros() {
    // var numStartQst = 0;
    var tables = document.querySelectorAll("table");
    for (var i = 0; i < tables.length; i++) {
        tables[i].style.opacity = "1";
    };
    document.getElementById("button").style.display="none";
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
    var idShuffle = [], answerShuffle=[];
    answShuffle.forEach(function(item, i){
        idShuffle.push(item[0]);
        answerShuffle.push(item[1])
    });
    //    console.log(idShuffle);  
    //    console.log(answerShuffle);
   
    var inputs = document.querySelectorAll("input");
    for (var i=0; i<inputs.length; i++) {
        inputs[i].checked = false;
        inputs[i].setAttribute('name', 'Q' + messages.question.id_parent);
        inputs[i].setAttribute('value', idShuffle[i] ); //messages.answer.id_answer[i]
    };
    // console.log(inputs);

    var Q = document.getElementById("Q"); // Выбираем Блок для вставки след.вопроса для юзера
    var A0 = document.getElementById("A0"); // Выбираем Блок для вставки ответа
    var A1 = document.getElementById("A1");     
    var A2 = document.getElementById("A2");
    var A3 = document.getElementById("A3");
    var A4 = document.getElementById("A4");
    var arr = [A0,A1,A2,A3,A4]
    // console.log(arr);
    // var div = document.createElement("div");
    // div.setAttribute("class", "start-Answer");
    // var answer_all ='';
    Q.innerHTML= messages.question.question; // Обращаемся к свойству question 0 элемента массива и заливаем в ДИВ с вопросом
    for (var i=0; i<arr.length; i++) {
        arr[i].innerHTML = '';              // Обнуляем предыдущие ответы
    }
    
    answerShuffle.forEach(function(item,i) {         // messages.answer.answer
    return eval('A'+ i).innerHTML = item;   //.Object.keys(answShuffle[i])[0]);
    
    // answer_all += i + '<br>';
    });
    
    for (var i=0; i<arr.length; i++) {
       if (arr[i].innerHTML == '') {
            eval('A'+ i).parentElement.style.display = 'none';
       } else {eval('A'+ i).parentElement.style.display = 'table-row'};                                                        // Обнуляем предыдущие ответы
    }
    // console.log(document.cookie);
    // return eval ('A' + i) - запускаем код через строку
    // div_A.innerHTML = answer_all; // Обращаемся к свойству answer 1 элемента массива и заливаем в ДИВ с ответом
}

function update_afterClientAnswer(otvet) {
    var result = document.getElementById("result");
    var dark = document.getElementById("dark");
    var otvet_true = document.getElementById("true");
    var otvet_false = document.getElementById("false");
    var image_true = document.getElementById("image_true");
    var image_false = document.getElementById("image_false");
    var why = document.getElementById("why");

    result.style.display = "block";
    dark.style.display = "block";
    console.log(otvet.answer_is_true);
    if (otvet.answer_is_true == 1) {
        image_true.style.display = "block";
        otvet_true.style.display = "block";
        why.style.display = "block";
        why.innerHTML = otvet.answer_is_true_comment;
    }
    else {
        image_false.style.display = "block";
        otvet_false.style.display = "block";
    }

    
    init();

}

function update_afterClientFoward() {
    var result = document.getElementById("result");
    var dark = document.getElementById("dark");
    var otvet_true = document.getElementById("true");
    var otvet_false = document.getElementById("false");
    var image_true = document.getElementById("image_true");
    var image_false = document.getElementById("image_false");
    var why = document.getElementById("why");

    result.style.display = "none";
    dark.style.display = "none";
    otvet_true.style.display = "none";
    otvet_false.style.display = "none";
    image_true.style.display = "none";
    image_false.style.display = "none";
    why.style.display = "none";
    why.innerHTML = '';
    
    json_Q_A_next();

    init();

}

Array.prototype.shuffle = function() {
    for (var i = this.length - 1; i > 0; i--) {
        var num = Math.floor(Math.random() * (i + 1));
        var d = this[num];
        this[num] = this[i];
        this[i] = d;
    }
    return this;
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