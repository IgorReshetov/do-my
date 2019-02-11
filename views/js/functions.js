function onclick_flowQuestion(e){
    var obj = e.target;
    var objClass = obj.getAttribute("class");
    if (objClass == "start-h2") {
        document.getElementsByClassName("start-h2")[0].style.display = "none";
        document.getElementsByClassName("start-o-proecte")[0].style.display = "none";
        document.getElementsByClassName("start-ozenka")[0].style.display = "block";
        setTimeout(function () {document.querySelector(".start-qustions-1").style.display="block"},400);
    }
    console.log (objClass);
};

// Создаем обработчик для отправки запроса JSON

function json_Q_A() {
    var url = "/controllers/handlers/sample.php";
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onload = function() { 
        if (request.status == 200) { 
            update_Q_A(request.responseText);
        }
    };
    var number_Q = JSON.stringify(1)    // (Выбираем ID элемента DOM, на который щелкнул user и парсим parseInt(str.match(/\d+/) ) // 
    request.send(number_Q)
}

function update_Q_A (responseText) {
    var div_Q_A = document.getElementById("start-Q-A") // Выбираем Блок для вставки ответов для юзера
    var obj_Q_A = JSON.parse(responseText); // Должен придти массив с ответами []
    var div = document.createElement("div");
    div.setAttribute("class", "start-Answer");
    div.innerHTML= obj_Q_A[0];
    div_Q_A.appendChild(div);
}








 // if (e.target.tagName!=='a') e.target.style.display = 'none';
// var item = document.querySelector("#theItem");

// function swap () {
//     var firstDiv = document.querySelector("p.Ievel5")
// };


// function name(arg1, arg2) {
//     var result;
//     if () {

//     } else {

//     }
    
//     return result;
// }
