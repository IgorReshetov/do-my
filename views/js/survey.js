window.onload = init;
function init() {
    var numStartQst = 3; // Вводим счетчик вопросов
    var button = document.getElementById('button');
    button.onclick = json_Q_A;

    console.log(numStartQst);

}


// Создаем обработчик для отправки запроса JSON

function json_Q_A() {
    
    var url = "/controllers/handlers/get_question.php";
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onload = function() { 
        if (request.status == 200) { 
        update_Q_A(request.responseText);
        }
    };
    var number_Q = JSON.stringify(numStartQst++); //Передаем в строке следующий номер вопроса    ИЛИ(Выбираем ID элемента DOM, на который щелкнул user и парсим parseInt(str.match(/\d+/) ) // 
    request.send(number_Q);
    return numStartQst++;
}

function update_Q_A (responseText) {
    var div_Q = document.getElementById("Qst"); // Выбираем Блок для вставки след.вопроса для юзера
    var div_A = document.getElementById("Asw"); // Выбираем Блок для вставки ответа
    var obj= JSON.parse(responseText); // Должен придти массив с ответами []
    // var div = document.createElement("div");
    // div.setAttribute("class", "start-Answer");
    div_Q.innerHTML= obj[0].question; // Обращаемся к свойству question 0 элемента массива и заливаем в ДИВ с вопросом
    div_A.innerHTML= obj[1].answer; // Обращаемся к свойству answer 1 элемента массива и заливаем в ДИВ с ответом
}