window.onload = init;
var numStartQst = 1; // Вводим глобальный счетчик вопросов
function init() {
    var button = document.getElementById('button');
    button.onclick = json_Q_A;
    // numStartQst++;
    // console.log((numStartQst));
}

// Создаем обработчик для отправки запроса JSON <<XHR LEVEL 1>>
function json_Q_A() {
    numStartQst++;
var data = JSON.stringify(numStartQst);
console.log(data);
var xhr = new XMLHttpRequest();
xhr.open('POST', '/do-my/controllers/handlers/get_question.php', true);
xhr.setRequestHeader("Content-type", "application/json");
xhr.send(data);

// AJAX ПОЛУЧЕНИЕ

// var xhr = new XMLHttpRequest();
// xhr.open('GET', '/do-my/controllers/handlers/get_question.php?id_question=' + numStartQst, true);
// xhr.send();

xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) {
        return;
    }
var messages = JSON.parse(xhr.responseText);
console.log(messages);
}
}





// Создаем обработчик для отправки запроса JSON <<XHR LEVEL 2>> 

// function json_Q_A() {
//     numStartQst++;  
//     var url = "/do-my/controllers/handlers/get_question.php"; // Дабавил файл get_question.json для теста XHR
//     var request = new XMLHttpRequest();
//     request.open("GET", url);
//     request.setRequestHeader("Content-type", "application/json");
//     request.onload = function() { 
//         if (request.status == 200) { 
//         update_Q_A(request.responseText);
//         }; 
//         console.log(request.responseText);
//     };
     
//     var number_Q = JSON.stringify(numStartQst); //Передаем в строке следующий номер вопроса    ИЛИ(Выбираем ID элемента DOM, на который щелкнул user и парсим parseInt(str.match(/\d+/) ) // 
//     console.log(number_Q);
//     request.send(number_Q);
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
//     div_A.innerHTML= obj[1].answer; // Обращаемся к свойству answer 1 элемента массива и заливаем в ДИВ с ответом
// }