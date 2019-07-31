window.onload = init;
var flag = 0;

function degToRad(input) { return input * (Math.PI/180);}

function out(arg) { document.getElementById("debug").innerHTML = arg; }


var Carousel = function() {             // СБОРКА КОНСТРУКТОРА
    //Переманные и установки сферы
    var me = this;

    //Изменяемые переменные 

    var carouselW = 600;
    var carouselH = 300;
    var itemW = 100;
    var itemH = 200;
    var noOfItemsToAdd = 5;
    var stepItems=[0]
    for (var i=1; i<noOfItemsToAdd; i++) {
        var step = 360/noOfItemsToAdd;
        var lastStep = 360 - step*(noOfItemsToAdd-i);
        stepItems.push(lastStep);
    }
    console.log(stepItems);
    //константы
    var carousel = document.getElementById("carousel");
    var itemContainer = carousel.getElementsByClassName('item-container');
    var items = [];
    var deg = 0;
    var rangeX = carouselW - itemW;
    var rangeY = carouselH - itemH;
    var arr_img = ['Dolphin', 'elephant', 'gorilla','Hippopotamus','lion', 'Turtle', 'Panda'];
    


    build();

    function build() {
        console.log("Carousel.build()");

        for (var i=0; i< noOfItemsToAdd; i++) {
            addItem();
        }

        //Начало анимации
        animate();
    }

    // Создаем методы конструктора

    function addItem() {    // Добавление нового элемента
        console.log("Carousel.addItem()");

        var item = document.createElement("div");
        item.classList.add("item"); 
        carousel.appendChild(item);

        var itemObj = {
            item:item
        }

        items.push(itemObj);
    }

    function animate() {       // Анимация движения карусели
        deg += 0.01;
        
        

        for (var i=0; i < items.length; i++) {
           
           var degItem = deg + stepItems[i]/3;
            
            var cos = 0.5 + (Math.cos(degItem) * 0.5);
            var sin = 0.5 + (Math.sin(degItem) * 0.5);
            out(cos);
            var itemObj = items[i];
            var posX = cos * rangeX;
            var posY = sin * rangeY;
            itemObj.item.style.left = posX + "px";
            itemObj.item.style.top = posY + "px";

            degItem=deg+360/3*i;
        }

        requestAnimationFrame(animate);
    }




    //Дополнительные функции
    function degToRad(input) {return input * (Math.PI/180);  }



}




function init() {
    var myCarousel = new Carousel();























    menu();

fox.speake_start();

fox.enter_leave_mouse();

fox.wakeUp_mouse();



// var timeLoadPage = new Date();

preloader();
};




















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
    // $().is()




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
    