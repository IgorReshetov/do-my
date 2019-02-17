window.onload = init;
var numStartQst = 1; // Вводим глобальный счетчик вопросов
function init() {
    var button = document.getElementById('button');
    button.onclick = json_Q_A;
    // numStartQst++;
    // console.log((numStartQst));
}

// Создаем обработчик для отправки запроса JSON

function json_Q_A() {
    var data = {
        numStartQst:numStartQst,
    }

    var data = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'controllers/handlers/get_question.php', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(data);
  
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) {
            return;
        }
    
    
    var messages = JSON.parse(xhr.responseText);
      
    update_Q_A(messages);
    }
    numStartQst++;

    return false;
}

function update_Q_A (messages) {
    var div_Q = document.getElementById("Qst"); // Выбираем Блок для вставки след.вопроса для юзера
    var div_A = document.getElementById("Asw"); // Выбираем Блок для вставки ответа
    
    var div = document.createElement("div");
    div.setAttribute("class", "start-Answer");
    var answer_all ='';
    div_Q.innerHTML= messages.question.question; // Обращаемся к свойству question 0 элемента массива и заливаем в ДИВ с вопросом
    messages.answer.answer.forEach(function(answer) {
    answer_all = answer_all + answer + '<br>';
    });

    div_A.innerHTML = answer_all; // Обращаемся к свойству answer 1 элемента массива и заливаем в ДИВ с ответом
}
