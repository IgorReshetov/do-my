window.onload = init;
var flag = 0;

function degToRad(input) { return input * (Math.PI/180);}

function out(arg) { document.getElementById("debug").innerHTML = arg; }


var Carousel = function() {             // СБОРКА КОНСТРУКТОРА
    //Переманные и установки сферы
    var me = this;
    
    //Изменяемые переменные 

    var carouselW = 600;
    var carouselH = 400;
    var itemW = 100;
    var itemH = 200;
    var numbers_of_elems = 7;

    var stepItems=[0]
    for (var i=1; i<numbers_of_elems; i++) {
        var step = 2*Math.PI/numbers_of_elems;
        var lastStep = 2*Math.PI - step*(numbers_of_elems-i);
        stepItems.push(lastStep);
    }
    console.log(stepItems);
    //константы
    var carousel = document.getElementById("carousel");
    var itemContainer = carousel.getElementsByClassName('item-container');
    var btnNext = document.getElementsByClassName("btn-next")[0];
    var btnPrev = document.getElementsByClassName("btn-prev")[0];

    var items = [];
    var deg = 0;
    var last_deg = 0;
    var L_R;
    var rangeX = carouselW - itemW;
    var rangeY = carouselH - itemH;
    var arr_img = ['Dolphin', 'elephant', 'gorilla','Hippopotamus','lion', 'Turtle', 'Panda'];
    


    build();

    function build() {
        console.log("Carousel.build()");

        for (var i=0; i< numbers_of_elems; i++) {
            addItem();
            var numItem = document.createElement("p");
            console.log(items[i]);
            items[i].item.style.backgroundImage = "url('views/images/survey/" + arr_img[i] + ".png')"
            items[i].item.appendChild(numItem);
            numItem.innerHTML = i+1;
            numItem.style.textAlign = "center";

            var degItem = deg+stepItems[i];
            degItem += (Math.PI)/4;
            var cos = 0.5 + (Math.cos(degItem) * 0.5);
            var sin = 0.5 + (Math.sin(degItem) * 0.5);
            var itemObj = items[i];
            var posX = cos * rangeX;
            var posY = sin * rangeY;
            itemObj.item.style.left = posX + "px";
            itemObj.item.style.top = posY + "px";

            var zindex = 1 + Math.round(sin * 100);
            itemObj.item.style.zIndex = zindex;

            var scale = 0.5 + (cos * 0.5);
            scale += sin/4;
            out(scale);
            itemObj.item.style.transform = "scale(" + scale + ") skew(20deg, -20deg)";


            var opacity = (cos);
            opacity += 1.5*sin;
            itemObj.item.style.opacity = opacity;
        }

        //Обработчики событий
        btnNext.addEventListener('click', handler_mouse_next)
        btnPrev.addEventListener('click', handler_mouse_prev)

        //Начало анимации
        // animate();
    }

    //Функции нажатия на кнопки Следующий/предыдущий
    
    function handler_mouse_next() {
        console.log ("Нажал следующий");
        L_R = 1;
        animate();
    }

    function handler_mouse_prev() {
        console.log ("Нажал предыдущий");
        L_R = -1;
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
        deg -= L_R*0.02;
        out (deg);
        if (L_R == 1) {
            if (deg <= -2*Math.PI/numbers_of_elems + last_deg) {
                last_deg = deg;
                return
            }
        } else if (deg >= 2*Math.PI/numbers_of_elems + last_deg) {
            last_deg = deg;
            return
        }

        for (var i=0; i < items.length; i++) {
           
            var degItem = deg+stepItems[i];
            degItem += (Math.PI)/4;
            var cos = 0.5 + (Math.cos(degItem) * 0.5);
            var sin = 0.5 + (Math.sin(degItem) * 0.5);
            var itemObj = items[i];
            var posX = cos * rangeX;
            var posY = sin * rangeY;
            itemObj.item.style.left = posX + "px";
            itemObj.item.style.top = posY + "px";

            var zindex = 1 + Math.round(sin * 100);
            itemObj.item.style.zIndex = zindex;

            var scale = 0.5 + (cos * 0.5);
            scale += sin/4;
            // out(scale);
            itemObj.item.style.transform = "scale(" + scale + ") skew(20deg, -20deg)";


            var opacity = (cos);
            opacity += 1.5*sin;
            itemObj.item.style.opacity = opacity;

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
    