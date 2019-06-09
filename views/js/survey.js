window.onload = init;

var numStartQst = 0; // Вводим глобальный счетчик вопросов
var check_arr = [0];
var prevQst = 0;
var flag = 0;
var rang_Qst_Stat = true; // Переменная свойство статистического вопроса (динамически обновляется)
var form_Qst;   // Признак анкетного вопроса

// Создаем метод по заполнению правильных и неправильных ответов по уровням
function cookie_level() {
    prevQst = cookies.active_question;
    check_arr = [cookies.active_question];
    var countQst_lev1 = parseInt(cookies.questions_count[0].questions_count);
    var countQst_lev2 = parseInt(cookies.questions_count[1].questions_count);
    var countQst_lev3 = parseInt(cookies.questions_count[2].questions_count);

    levelQst_1 = {hit:0, miss:0, next_lev:false, countQst: countQst_lev1,  check:false,
        next_level: function(){                   
            if (this.hit == this.countQst) {this.next_lev = true;
            return true;
        } else return false;} 
    }; 
    levelQst_2 = {hit:0, miss:0, next_lev:false, countQst: countQst_lev2,  check:false,
        next_level: function(){                   
            if (this.hit == this.countQst) {this.next_lev = true;
            return true;
        } else return false;} 
    };
    levelQst_3 = {hit:0, miss:0, next_lev:false, countQst: countQst_lev3,  check:false,
        next_level: function(){                   
            if (this.hit == this.countQst) {this.next_lev = true;
            return true;
        } else return false;} 
    };

    
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
    // preloader();

}

// Создаем метод по проверке правильных ответов для перехода на след.уровень при 80% правильных ответов
// _________________ Первый вариант______________________________
// Object.prototype.next_level = function(){
//     if ((this.hit/(this.hit+this.miss))*100 >= 100) {this.next_lev = true;
//     return true;
//     } else return false;
// } 


var levelQst_1 = {hit:0, miss:0, next_lev:false, countQst:0, check:false,
        next_level: function(){                   
            if (this.hit == this.countQst) {this.next_lev = true;
            return true;
        } else return false;}  
}; // Вводим глобальные уровни вопросов попал/промах и подсчет итогов
var levelQst_2 = {hit:0, miss:0, next_lev:false, countQst:0, check:false,
    next_level: function(){                   
        if (this.hit == this.countQst) {this.next_lev = true;
        return true;
    } else return false;} 
};
var levelQst_3 = {hit:0, miss:0, next_lev:false, countQst:0, check:false,
    next_level: function(){                   
        if (this.hit == this.countQst) {this.next_lev = true;
        return true;
    } else return false;} 
};
var resultQst = {hit: function() {return (levelQst_1.hit + levelQst_2.hit + levelQst_3.hit);}, miss: function() {return (levelQst_1.miss+levelQst_2.miss+levelQst_3.miss);}};

// levelQst_1.next_level = function(){                   // Для завершения уровня нужно набрать 100%
//     if (this.hit == this.countQst) {this.next_lev = true;
//     return true;
//     } else return false;
// } 

levelQst_2.next_level = function(){                   // Для завершения уровня нужно набрать 100%
    if (this.hit == this.countQst) {this.next_lev = true;
    return true;
    } else return false;
} 

levelQst_3.next_level = function(){                   // Для завершения уровня нужно набрать 100%
    if (this.hit == this.countQst) {this.next_lev = true;
    return true;
    } else return false;
} 



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

var mobile = 0;

function init() {
    preloader();
    menu();

   
    history.pushState({param: 'Value'}, '', 'index.php?page=survey');// автозамена URL при сбросе через GET параметр

    // history.pushState(null,null, 'newpage');    // добавляет новый URL в историю
    // history.replaceState(null,null, 'newpage');


    // fox.speak_survey();

    fox.speake_start();
    fox.enter_leave_mouse();
    fox.wakeUp_mouse();
    fox.no_active_user();
    fox.fast_answer();
    
    
    var page_size = getPageSize();
        if (page_size.page.width <= 570) {
            mobile = 1;
        } else { 
            mobile = 0;
        }
    resize_step(); 
    
    document.body.onresize = check_size;       

    zapros_Cookies_start();           // Делаем синхронный запрос при старте страницы
    
    // cookie_level();
    
    // fill_circle();
    
    // if (cookies.level_access == 2) {
    //     O('next').classList.add ('next-level2');
    //     C('forward')[0].classList.add ('forward-level2');
    // } else if (cookies.level_access == 3) {
    //      O('next').classList.add ('next-level3');
    //      C('forward')[0].classList.add('forward-level3');
    // } 
    // console.log(cookies);
    // console.log(prevQst);
    // console.log(numStartQst);

    // var status_Game = document.getElementsByClassName('slider-box-main');
    // if (cookies.user_answer.length > 0 && document.querySelectorAll("table")[0].style.opacity == "1") 
    // status_Game[0].style.display = "block";


    var button1 = document.getElementById('land-block5-button');
    if (button1 != null){
        button1.onclick = startOpros;
        perebor_Qst();

        setTimeout(function(){
            var el = O('land-block5-button');
            console.log(el.getBoundingClientRect().top);
            handl_scroll_el = setInterval(scroll_to_element,15,el);
            
            setTimeout(function(){C('land-block-text land-block5-button')[0].classList.add('land-block5-button-scroll')},2500);

        }, 5000);

    };
    
    var button2 = document.getElementById('button');
    if (button2 != null){button2.onclick = startOpros;}

            
    var next = document.getElementById('next');
    // var prev = document.getElementById('prev');

    var inputs = document.querySelectorAll(".right input");

    var forward = document.getElementById("forward");
    var saveGame = document.getElementById("saveGame");
    var answer_tr = document.querySelectorAll(".left");

    // Первая замена цикла foreach
    for (var i = 0; i < answer_tr.length; i++) {
        answer_tr[i].onclick =  function(e) {
            var elem = e.target.nextElementSibling.children[0].children[0];
            switch (elem.type) {
                case 'radio':
                    elem.checked = true;
                    next_ready();
                break;
                case 'checkbox':
                    if (elem.checked == true) elem.checked = false;
                    else elem.checked = true;
                    next_ready();
                break 
            }
        }
    }
    
    // answer_tr.forEach(function(item, i) {
    //     item.onclick = function() {
    //         switch (inputs[i].type) {
    //             case 'radio':
    //                 inputs[i].checked = true;
    //                 next_ready();
    //             break;
    //             case 'checkbox':
    //                 if (inputs[i].checked == true) inputs[i].checked = false;
    //                 else inputs[i].checked = true;
    //                 next_ready();
    //             break 
    //         }
    //     };
    // });


    // Второй цикл foreach исправлен
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].onclick = next_ready;
    }
    
    //     inputs.forEach(function (item) {
    //     item.onclick = 
    // });
    
    next.onclick = json_Q_A;
    
    forward.onclick = update_afterClientFoward;
    saveGame.onclick = function() {window.location.href='index.php?page=survey&back=1'};
                                                        // Делаем активными стрекли влево-вправо для просмотра слайдера
    if (mobile==0) {
        C('slider-box-survey-after')[0].onmousedown = function () {
            if (flag_slaider == 1) return false;
            handle_msr = setInterval(move_slider_right, 20);
            }
        C('slider-box-survey-after')[0].onmouseup = function () {
            if (flag_slaider == 1) return false;
            clearInterval(handle_msr);
        handle_down = setInterval(anime_step_down,10,prevQst, numStartQst);
        }
        C('slider-box-survey-before')[0].onmousedown = function () {
            if (flag_slaider == 1) return false;
            handle_msl = setInterval(move_slider_left, 20);}
        C('slider-box-survey-before')[0].onmouseup = function () {
            if (flag_slaider == 1) return false;
            clearInterval(handle_msl);
            handle_down = setInterval(anime_step_down,10,prevQst, numStartQst);
            // handle_move_left_right = setInterval(anime_move_left_right,20,prevQst, numStartQst);
        }

    // } else {
    //     C('slider-box-survey-after')[0].addEventListener("touchstart", function (e) {
    //         if (flag_slaider == 1) return false;
    //         handle_msr = setInterval(move_slider_right, 20);
    //         e.preventDefault();
    //         }, false);
    //     C('slider-box-survey-after')[0].addEventListener("touchend", function (e) {
    //         if (flag_slaider == 1) return false;
    //         clearInterval(handle_msr);
    //         handle_down = setInterval(anime_step_down,10,prevQst, numStartQst);
    //         e.preventDefault();
    //     }, false);   
    //     C('slider-box-survey-before')[0].addEventListener("touchstart", function (e) {
    //         if (flag_slaider == 1) return false;
    //         handle_msl = setInterval(move_slider_left, 20);
    //         e.preventDefault();
    //     }, false);
    //     C('slider-box-survey-before')[0].addEventListener("touchend", function (e) {
    //         if (flag_slaider == 1) return false;
    //         clearInterval(handle_msl);
    //         handle_down = setInterval(anime_step_down,10,prevQst, numStartQst);
    //         e.preventDefault();
    //         // handle_move_left_right = setInterval(anime_move_left_right,20,prevQst, numStartQst);
    //     }, false);
    }
 
    // __________Реакция слайдера на движения пальца влево-вправо_____________

    var slider_moove = document.getElementsByClassName('slider-survey'),
    slider_left, 
    start_X, 
    dist = 0, 
    touch_OBJ = null 
  
    slider_moove[0].addEventListener('touchstart', function(e){
        touch_OBJ = e.changedTouches[0]; 
        (slider_left)? slider_left = parseInt(slider_moove[0].style.marginLeft) : slider_left = parseInt(getComputedStyle(slider_moove[0]).marginLeft);
        start_X = parseInt(touch_OBJ.clientX);
        e.preventDefault(); 
    }, false);
  
    slider_moove[0].addEventListener('touchmove', function(e){
        touch_OBJ = e.changedTouches[0]
        console.log(slider_left); 
        var dist = parseInt(touch_OBJ.clientX) - start_X 
        slider_moove[0].style.marginLeft = ( (slider_left + dist > 50)? 50 : (slider_left + dist < -750)? -750 : slider_left + dist ) + 'px'
        e.preventDefault()
    }, false);
  
    

    //обраюотчики окна подарка

    var privacy_label = document.getElementById("privacy");
    privacy_label.onclick = check_privacy;

    var gift_get = document.getElementById("gift-get");
    gift_get.onclick = show_get;
    gift_get.oninput = show_get;

    var gift_button_get = document.getElementById("gift-button-get");
    gift_button_get.onclick = send_mail;
}


// функция отправки мэйла пользователю
function send_mail() {
    preloader_start();
    var mail = document.getElementById('mail');
    var mail_data = mail.value;
    // сбор пожеданий отключен
    // var place = document.getElementById('gift-block2-desire1-place');
    // var room = document.getElementById('gift-block2-desire2-room');
    var place_data = 0;
    var room_data = 0;
       
    var data = {
        mail:mail_data,
        place:place_data,
        room:room_data
    };

    var data = JSON.stringify(data);

    var xhr = new XMLHttpRequest();

    // preloader_AJAX(xhr);
   

    xhr.open('POST', 'index.php?page=put_mail', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(data);
  
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) {
            return;
        }
        
        // console.log (xhr.responseText);
        var messages = JSON.parse(xhr.responseText);

        // console.log (messages);  
        if (messages.result == true) {document.location.href = "index.php?page=thanks&mail=1"}
        else {document.location.href = "index.php?page=thanks&mail=0"}
        preloader();
    }
}

// функция проверки правильности ввода мэйла
function show_get () {
    
    var check_privacy = document.getElementById("privacy-check");
    var mail_input = document.getElementById("mail");
    var button_get = document.getElementById("gift-button-get");
    var mail = mail_input.value;
    var result = mail.length;
    var result1 = mail.indexOf("@");
    var result2 = mail.indexOf(".");
    // console.log (result2);
    // проверка правильности мэйла
    if (check_privacy.checked == true && result > 8 && result-result1 > 4 && result-result2 >2 && result1 > 2 && result2 > 0) {
        
        button_get.style.display = 'block';
    }
    else {button_get.style.display = 'none';}
}

function check_privacy() {
    var check_text = document.getElementById("check-text");
    var check_privacy = document.getElementById("privacy-check");
    if (check_privacy.checked) {
        check_text.innerHTML = "Ознакомлен(а) с политикой конфиденциальности";
    }
    else {check_text.innerHTML = "Подтвердите oзнакомление с политикой конфиденциальности";}
}

function check_size() {
    var page_size = getPageSize();
    if (mobile == 0 && page_size.page.width <= 570) {
        mobile = 1;
        window.location.reload();
        return false
    } else if (mobile == 1 && page_size.page.width > 570) {
        window.location.reload();
        mobile = 0;
        return false
    }
}

function zapros_Cookies_start(){      //  Синхронный запрос
    preloader_start();
    
    var xhr = new XMLHttpRequest();

    
    xhr.open('POST', 'index.php?page=get_answer', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) {
            return;
        }
        cookies = JSON.parse(xhr.responseText);
        numStartQst = 0;
        countQst = 0;
        for (var i =0; i<cookies.questions_count.length; i++) {
                countQst += parseInt(cookies.questions_count[i].questions_count);
        }

        numStartQst = cookies.active_question;
        console.log(cookies);
        cookie_level();
    
        fill_circle();

        
        
        if (cookies.level_access == 2) {
            O('next').classList.add ('next-level2');
            O('forward').classList.add ('forward-level2');
            O('saveGame').classList.add ('forward-level2');
        } else if (cookies.level_access == 3) {
            O('next').classList.add ('next-level3');
            O('forward').classList.add('forward-level3');
            O('saveGame').classList.add('forward-level3');
        } 
        // console.log(cookies);
        // console.log(prevQst);
        // console.log(numStartQst);

        var status_Game = document.getElementsByClassName('slider-box-main');
        if (cookies.user_answer.length > 0 && document.querySelectorAll("table")[0].style.opacity == "1") 
        status_Game[0].style.display = "block";


        preloader();
        
        return cookies;
    }
}

function zapros_Cookies(){      //  AСинхронный запрос
    preloader_start();
    
    var xhr = new XMLHttpRequest();

    
    xhr.open('POST', 'index.php?page=get_answer', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) {
            return;
        }

        cookies = JSON.parse(xhr.responseText);
        numStartQst = 0;
        countQst = 0;
        for (var i =0; i<cookies.questions_count.length; i++) {
                countQst += parseInt(cookies.questions_count[i].questions_count);
        }

        numStartQst = cookies.active_question;

        cookie_level();

        preloader();
        
        return cookies;
    }
}

function fill_circle() {
    var level = document.querySelectorAll(".step-level");
    var level2 = document.querySelectorAll(".step-level2");
    var level3 = document.querySelectorAll(".step-level3");
    var circles = document.querySelectorAll(".step-survey");
    var numQstLevel_1 = parseInt(cookies.questions_count[0].questions_count);
    var numQstLevel_2 = parseInt(cookies.questions_count[1].questions_count);
    // console.log(C('slider-level')[0]);
    // console.log(level[0].style);
    
    level2[0].innerHTML = levelQst_2.countQst;
    level3[0].innerHTML = levelQst_3.countQst;

    for (var i=0; i<countQst; i++) {
        circles[i].style.background = 'white';
    }
    
    if (numStartQst >= 0 && numStartQst<levelQst_1.countQst) {
        level[0].innerHTML = numStartQst + 1 + "/" + levelQst_1.countQst;
        level[0].style.borderColor = "yellow";
        
    } else if (numStartQst>= levelQst_1.countQst && numStartQst < (levelQst_1.countQst + levelQst_2.countQst)) {
    // console.log(levelQst_1.countQst)
    // console.log(numStartQst)
        level[0].innerHTML = (numStartQst*1 + 1)- levelQst_1.countQst + "/" + levelQst_2.countQst;
        level[0].style.borderColor = "blue";
        level[0].classList.add('step-level-js-M');
        S(C('result1')[0]).display = 'flex';
        S(C('step-level2')[0]).display = 'none';
    } else if (numStartQst>= (levelQst_1.countQst + levelQst_2.countQst) && numStartQst < countQst) {
        level[0].innerHTML = (numStartQst + 1) - (levelQst_1.countQst + levelQst_2.countQst) + "/" + levelQst_3.countQst;
        level[0].style.borderColor = "red";
        level[0].classList.add('step-level-js-H');
        S(C('result1')[0]).display = 'flex';
        S(C('result2')[0]).display = 'flex';
        S(C('step-level2')[0]).display = 'none';
        S(C('step-level3')[0]).display = 'none';
        S(C('present')[0]).display = 'flex';
    } else if (numStartQst==countQst) {
        level[0].innerHTML = "Done";
        level[0].style.backgroundColor = "red";
        level[0].style.color = "yellow";
        level[0].classList.add('step-level-finish');
        S(C('result1')[0]).display = 'none';
        S(C('result2')[0]).display = 'none';
        S(C('step-level2')[0]).display = 'none';
        S(C('step-level3')[0]).display = 'none';
        S(C('present')[0]).display = 'flex';
    }
      
    
    // if (numStartQst==0) {
    //     level[0].innerHTML="1/"+levelQst_1.countQst;
    // } else if (numStartQst == countQst) level[0].innerHTML = numStartQst + "/" + levelQst_3.countQst;
    // else level[0].innerHTML = numStartQst + 1 + '/' + countQst;
    
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
    var inputs = document.querySelectorAll(".right input");
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
    
    // _______________Блок для обработчик Лиса fox.toFast___________________
       
        var timeAnsw = new Date().getTime();
         fox.time_answer = timeAnsw; 
        //  console.log(fox.time_answer); 
    // _________________________________________________________________________
    next.style.display = 'none';
    var inputs = document.querySelectorAll(".right input");
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
    // console.log(numAnsw);
    // console.log(numQst);

    // numStartQst++;
    
    var data = {
        id_question: numQst,
        id_answer: numAnsw,
        amount: 0,               //Здесь нужно цеплять переменную из полоски прокрутки для вопроса диапазано  
        word: "",                //Здесь нужна переменная с вопроса с ответом подбора слова
        sign_bot: 0              // ЕЩЕ НЕ ПОНЯЛ КАК ВЫТАСКИВАТЬ ПЕРЕМЕННУЮ sign_bot!!!!!!!!!!!!!!!!!!!!!!!!!
    };

    var data = JSON.stringify(data);
    // console.log(data);

    preloader_start();

    var xhr = new XMLHttpRequest();

    // preloader_AJAX(xhr);

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
        preloader();
        window.scrollTo(0, 0);
    }
    
    return false;
}

function json_Q_A_next() {
    // numStartQst++;
    if (numStartQst<0) {return numStartQst=0;};

    var data = {
        numStartQst:numStartQst
    };
    // console.log(data);
    // console.log (cookies.user_answer[cookies.active_question-1].id_question);
    var data = JSON.stringify(data);

    preloader_start();

    var xhr = new XMLHttpRequest();


    xhr.open('POST', 'index.php?page=get_question', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(data);
  
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) {
            return;
        }
    
        var messages = JSON.parse(xhr.responseText);
        console.log(messages);
        rang_Qst_Stat = messages.question.is_stat;  // меняем форму вопроса стат (true)/точный(false)
        form_Qst = messages.question.is_form;   // меняем признак вопроса (анкетный-1 / обычный-null)
        console.log(form_Qst); 
        // numStartQst++;
        update_Q_A(messages);
        preloader();
        window.scrollTo(0, 0);
    }
    
    return false;
}

function startOpros() {
        

    if (Math.random()<0.33) fox.speak_about_Qst();  
    if (countQst==numStartQst) {
        document.getElementById("button").style.display="none";
        var gift = document.getElementsByClassName('gift');
        gift[0].style.display = "flex";
        var title = document.getElementsByClassName('title');
        title[0].style.display = "none";
        fox.speak_game_end();
        // stat();
        // var status_Game = document.getElementsByClassName('board');
        // status_Game[0].style.display = "flex";
        return;
    }
    
    // handle = setInterval(anime_level,100); // Анимация - плавное появление круга с номером вопроса
    if (prevQst==numStartQst && cookies.user_answer.length > 0) {
        handle_move_left_start = setInterval(anime_move_left_start,4, numStartQst);
        setTimeout("handle_step = setInterval(anime_step_up,100,numStartQst)",1000);
     } 
    else handle_step = setInterval(anime_step_up,50,numStartQst);

    var status_Game = document.getElementsByClassName('board');
    status_Game[0].style.display = "flex";
    var opros = document.getElementsByClassName('opros');
    opros[0].style.display = "flex";
    var next = document.getElementsByClassName('prev_next');
    next[0].style.display = "flex";
    var tables = document.querySelectorAll("table");
    for (var i = 0; i < tables.length; i++) {
        tables[i].style.opacity = "1";
    };

    var land = document.getElementById('land');
    if (land != null){land.style.display="none";}

    var button2 = document.getElementById('button');
    if (button2 != null){button2.style.display="none";}

    // document.getElementsByClassName("title-gift-block")[0].style.display="none";
    document.getElementsByClassName('title')[0].style.display="none";
    // numStartQst=Math.floor((Math.random()*5));                // Задаем случайное число для вопроса из arr [0,1,2,3,4]
    
     
    var data = {
        numStartQst:numStartQst
    };

    var data = JSON.stringify(data);

    preloader_start();

    var xhr = new XMLHttpRequest();


    xhr.open('POST', 'index.php?page=get_question', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(data);
  
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) {
            return;
        }
    
    // console.log(xhr.responseText);
    var messages = JSON.parse(xhr.responseText);
    console.log(messages);
    rang_Qst_Stat = messages.question.is_stat;  // меняем форму вопроса стат (true)/точный(false)
    form_Qst = messages.question.is_form;   // меняем признак вопроса (анкетный-1 / обычный-null)
    console.log(form_Qst); 
    update_Q_A(messages);
    preloader();
    }
    return false;
}

function update_Q_A (messages) {
    var answShuffle = [];
    
    // 3 ЦИКЛ foreach переделан
    for (var i = 0; i < messages.answer.id_answer.length; i++) {
        var ans = [];
        ans.push(messages.answer.id_answer[i]);
        ans.push(messages.answer.answer[i]);
        answShuffle.push(ans);
    };

    // messages.answer.id_answer.forEach(function(item,i) {
    //     var ans = [];
    //     ans.push(item);
    //     ans.push(messages.answer.answer[i]);
    //     // ans[item] = messages.answer.answer[i];
    //     answShuffle.push(ans);
    // });

    answShuffle = answShuffle.shuffle();        //Перемешываем массив с элементами ответов
    var idShuffle = [], answerShuffle=[];       //Разбиваем на два массива*** делаем это, т.к. цикл не видит второго уровня и требуется еще один вложенный цикл
   
    // 4 Правка цикла for
    for (var i = 0; i < answShuffle.length; i++) {
        idShuffle.push(answShuffle[i][0]);
        answerShuffle.push(answShuffle[i][1]);
    }
   
    // answShuffle.forEach(function(item, i){
    //     idShuffle.push(item[0]);
    //     answerShuffle.push(item[1])
    // });
    //    console.log(idShuffle);  
    //    console.log(answerShuffle);
   
    var inputs = document.querySelectorAll(".right input");
    for (var i=0; i<inputs.length; i++) {
        inputs[i].checked = false;
        if (messages.question.is_multi_answer == '1'){ 
            fox.speak_multi();
            inputs[i].setAttribute('type', 'checkbox');
            inputs[i].nextElementSibling.classList.remove ('radio');  
            inputs[i].nextElementSibling.classList.add ('checkbox'); // Установка чекбоксов или радиокнопок;
            if (cookies.level_access == 1) inputs[i].nextElementSibling.classList.add ('level1');
            else if (cookies.level_access == 2) inputs[i].nextElementSibling.classList.add ('level2');
            else if (cookies.level_access == 3) inputs[i].nextElementSibling.classList.add ('level3');
        } else {inputs[i].setAttribute('type', 'radio');
            inputs[i].nextElementSibling.classList.add ('radio');  
            inputs[i].nextElementSibling.classList.remove ('checkbox');
            if (cookies.level_access == 1) inputs[i].nextElementSibling.classList.add ('level1');
            else if (cookies.level_access == 2) inputs[i].nextElementSibling.classList.add ('level2');
            else if (cookies.level_access == 3) inputs[i].nextElementSibling.classList.add ('level3');
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

       Q.innerHTML= messages.question.question; // Обращаемся к свойству question 0 элемента массива и заливаем в ДИВ с вопросом
    for (var i=0; i<arr.length; i++) {
        arr[i].innerHTML = '';              // Обнуляем предыдущие ответы
    }
    
    // 5 Правка Цикла foreach
    for (var i = 0; i < answerShuffle.length; i++) {
        eval('A'+ i).innerHTML = answerShuffle[i];
    }

    // answerShuffle.forEach(function(item,i) {         
    // return eval('A'+ i).innerHTML = item;   
    // });
    
    for (var i=0; i<arr.length; i++) {
       if (arr[i].innerHTML == '') {
            eval('A'+ i).parentElement.style.display = 'none';
       } else {eval('A'+ i).parentElement.style.display = 'flex'};                                                        // Обнуляем предыдущие ответы
    }

    var result = document.getElementById("result");
    var dark = document.getElementById("dark");
    var otvet_true = document.getElementById("true");
    var otvet_false = document.getElementById("false");
    var image = document.getElementById("image");
    var why = document.getElementById("why");
    var why_title = document.getElementById("why-title");
    var saveGame = document.getElementById("saveGame");

    result.style.display = "none";
    dark.style.display = "none";
    otvet_true.style.display = "none";
    otvet_false.style.display = "none";
    image.style.display = "none";
    why.style.display = "none";
    why_title.style.display = "none";
    why.innerHTML = '';
    saveGame.style.display = "none";

    if (cookies.level_access == 2) {
        O('next').classList.add ('next-level2');
        O('forward').classList.add('forward-level2');
        O('saveGame').classList.add ('forward-level2');
    } else if (cookies.level_access == 3) {
        O('next').classList.add ('next-level3');
        O('forward').classList.add('forward-level3');
        O('saveGame').classList.add ('forward-level3');
    } 
  
}

function update_afterClientAnswer(otvet) {
    
 
    var inputs = document.querySelectorAll(".right input");
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
    
 
    numStartQst = otvet.active_question;
    check_arr.push(otvet.active_question);


    if ((check_arr[1] <= check_arr[0]) && (cookies.user_answer.length == (countQst_lev1 - 1))) {
        if (otvet.answer_is_true == 1) {++levelQst_1.hit; levelQst_1.miss--;}
            // else ++levelQst_1.miss;
    } else if ((check_arr[1] <= check_arr[0]) && (cookies.user_answer.length == (countQst_lev2 - 1))) {
        if (otvet.answer_is_true == 1) {levelQst_2.hit++; levelQst_1.miss--;}
            // else levelQst_2.miss++;
    } else if ((check_arr[1] <= check_arr[0]) && (cookies.user_answer.length == (countQst_lev3 - 1))) {
        if (otvet.answer_is_true == 1) {levelQst_3.hit++; levelQst_1.miss--;}
            // else levelQst_3.miss++;
    }
 

    switch (numStartQst) {
        case countQst_lev1 :
            levelQst_1.hit++; 
            levelQst_1.miss=0;
         break;
        case countQst_lev2 :
            levelQst_2.hit++; 
            levelQst_2.miss=0;
        break;
        case countQst_lev3 :
            levelQst_3.hit++; 
            levelQst_3.miss=0;
            otvet_true.innerHTML = 'Вы знаете правильный ответ. Поздравляем!';
        break;
        default:
        
        break;
    }

    // result.style.display = "flex";
    // dark.style.display = "block";
    if (form_Qst == 1) {
        image.className = 'result-tru-question';  // Правка класс листа для IE
        image.style.display = "block";
        otvet_true.innerHTML = "Спасибо за ответ. Так же как и вы ответили 100 человек" 
        otvet_true.style.display = "block";
        if (otvet.answer_is_true_comment == '') {why_title.innerHTML = "У этого ответа нет пояснения";}
        else {why_title.innerHTML = "Пояснение:";}
        why_title.style.display = "block";
        why.innerHTML = otvet.answer_is_true_comment;
        why.style.display = "block";
        result.style.display = "flex";
        dark.style.display = "block";
        return false
    } 

    if (otvet.answer_is_true == 1) {
        image.className = 'result-tru-question';  // Правка класс листа для IE
        // image.classList = [];
        // image.classList.add('result-tru-question');
        image.style.display = "block";
        // otvet_true.innerHTML = "Вы знаете правильный ответ. Поздравляем!";
        (rang_Qst_Stat)? otvet_true.innerHTML = "Вы знаете лучший ответ. Поздравляем!" 
        : otvet_true.innerHTML = "Вы знаете точный ответ. Поздравляем!";
        otvet_true.style.display = "block";
        if (otvet.answer_is_true_comment == '') {why_title.innerHTML = "У этого ответа нет пояснения";}
        else {why_title.innerHTML = "Пояснение:";}
        why_title.style.display = "block";
        why.innerHTML = otvet.answer_is_true_comment;
        why.style.display = "block";
    } else {
        image.className = 'result-false-question'; // Правка класс листа для IE
        // image.classList = [];
        // image.classList.add('result-false-question');
        image.style.display = "block";
        why_title.style.display = "none";
        why.style.display = "none";
        // otvet_false.innerHTML =  'Вы ошиблись. Вопрос ждет вашего возвращения.';
        (rang_Qst_Stat)? otvet_false.innerHTML = "Есть вариант лучше. Вопрос ждет вашего возвращения." 
        : otvet_false.innerHTML = "Это неточный ответ. Вопрос ждет вашего возвращения.";
        otvet_false.style.display = "block";
    } 

    result.style.display = "flex";
    dark.style.display = "block"; 
}

function valid_level_1() {
    var result = document.getElementById("result");
    var dark = document.getElementById("dark");
    var otvet_true = document.getElementById("true");
    var otvet_false = document.getElementById("false");
    var image = document.getElementById("image");
    var why = document.getElementById("why");
    var why_title = document.getElementById("why-title");
    var saveGame = document.getElementById("saveGame");

    
    // if (numStartQst == parseInt(cookies.questions_count[0].questions_count)) {
        // if (otvet.answer_is_true) levelQst_1.hit++;
        // else levelQst_1.miss++;
        // console.log(!(levelQst_1.next_level()));
        var otvet_miss = levelQst_1.countQst - otvet.count_true;
        levelQst_1.check = true;
        levelQst_1.next_level();
        if (otvet_miss == 1) { var text = "вопрос";
        var text1 = "этому вопросу"}
        else {
            if (otvet_miss == 2 || otvet_miss == 3 || otvet_miss == 4){
                var text = "вопроса";
                var text1 = "этим вопросам"
            } else {var text = "вопросoв";
            var text1 = "этим вопросам"}
        }
        if (!(levelQst_1.next_lev)) {
            why.style.display = "none"; 
            why_title.style.display = "none";
            otvet_true.style.display = 'none';
            image.className = 'result-loss-level';// Правка класс листа для IE
            // image.classList = [];
            // image.classList.add('result-loss-level');
            image.style.display = "block";
            otvet_false.innerHTML = "Вы не ответили на <strong>"+ otvet_miss + "</strong> " + text +  " уровня \"Easy\".";
            otvet_false.style.display = "block"; 
            why.innerHTML = "Для перехода на следующий уровень вернитесь к " + text1;
            why.style.display = "block";
            saveGame.style.display = "block";
        } else {

            why.style.display = "none";
            why_title.style.display = "none";
            image.className = 'result-pass-level1'; // Правка класс листа для IE                   
            // image.classList = [];
            // image.classList.add('result-pass-level1');
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
    var saveGame = document.getElementById("saveGame");

    var otvet_miss = levelQst_2.countQst - otvet.count_true;
    // if (numStartQst == parseInt(cookies.questions_count[0].questions_count)) {
        // if (otvet.answer_is_true) levelQst_1.hit++;
        // else levelQst_1.miss++;
        // console.log(!(levelQst_1.next_level()));
        if (otvet_miss == 1) { var text = "вопрос";
        var text1 = "этому вопросу"}
        else {
            if (otvet_miss == 2 || otvet_miss == 3 || otvet_miss == 4){
                var text = "вопроса";
                var text1 = "этим вопросам"
            } else {var text = "вопросoв";
            var text1 = "этим вопросам"}
        }
        levelQst_2.check = true;
        levelQst_2.next_level();
        if (!(levelQst_2.next_lev)) {
            why.style.display = "none"; 
            why_title.style.display = "none";
            otvet_true.style.display = "none"; 
            image.className = 'result-loss-level'; // Правка класс листа для IE   
            // image.classList = [];
            // image.classList.add('result-loss-level');
            image.style.display = "block";
            otvet_false.innerHTML = "Вы не ответили на <strong>"+ otvet_miss + "</strong> " + text +  " уровня \"Medium\".";
            otvet_false.style.display = "block"; 
            why.innerHTML = "Для перехода на следующий уровень вернитесь к " + text1;
            why.style.display = "block";
            saveGame.style.display = "block";
        } else {
            why.style.display = "none";
            why_title.style.display = "none";
            image.className = 'result-pass-level2'; // Правка класс листа для IE   
            // image.classList = [];
            // image.classList.add('result-pass-level2');
            image.style.display = "block";
            otvet_true.innerHTML = "Поздравляем! Вы прошли уровень \"Medium\".";
            otvet_true.style.display = "block";
        }
    // } 
    
    // else
    // return false;
}

function valid_level_3() {
    var otvet_true = document.getElementById("true");
    var otvet_false = document.getElementById("false");
    var image = document.getElementById("image");
    var why = document.getElementById("why");
    var why_title = document.getElementById("why-title");
    var saveGame = document.getElementById("saveGame");

    var otvet_miss = levelQst_3.countQst - otvet.count_true;
    // if (numStartQst == parseInt(cookies.questions_count[0].questions_count)) {
        // if (otvet.answer_is_true) levelQst_1.hit++;
        // else levelQst_1.miss++;
        // console.log(!(levelQst_1.next_level()));
        if (otvet_miss == 1) { var text = "вопрос";
        var text1 = "этому вопросу"}
        else {
            if (otvet_miss == 2 || otvet_miss == 3 || otvet_miss == 4){
                var text = "вопроса";
                var text1 = "этим вопросам"
            } else {var text = "вопросoв";
            var text1 = "этим вопросам"}
        }
        levelQst_3.check = true;
        levelQst_3.next_level();
        // console.log(levelQst_3.check);
        // console.log(levelQst_3.next_lev);
        if (!(levelQst_3.next_lev)) {
            why.style.display = "none";
            why_title.style.display = "none"; 
            otvet_true.style.display = 'none';
            image.className = 'result-loss-level'; // Правка класс листа для IE   
            // image.classList = [];
            // image.classList.add('result-loss-level');
            image.style.display = "block";
            otvet_false.innerHTML = "Вы не ответили на <strong>"+ otvet_miss + "</strong> " + text + " уровня \"Hard\".";
            otvet_false.style.display = "block"; 
            why.innerHTML = "Для перехода на следующий уровень вернитесь к " + text1;
            why.style.display = "block";
            saveGame.style.display = "block";
        } else {
            document.getElementsByClassName('title')[0].style.display="none";
            document.getElementsByClassName('board')[0].style.display="none";
            document.getElementsByClassName('opros')[0].style.display="none";
            why.style.display = "none";
            why_title.style.display = "none";
            image.className = 'result-pass-level3'; // Правка класс листа для IE   
            // image.classList = [];
            // image.classList.add('result-pass-level3');
            image.style.display = "block";
            otvet_true.innerHTML = "Поздравляем! Вы прошли уровень \"Hard\".";
            otvet_true.style.display = "block";
            
        }
}

function update_afterClientFoward() {
  
    var countQst_lev1 = parseInt(cookies.questions_count[0].questions_count);
    var countQst_lev2 = parseInt(cookies.questions_count[0].questions_count) + parseInt(cookies.questions_count[1].questions_count);
    var countQst_lev3 = parseInt(cookies.questions_count[0].questions_count) + parseInt(cookies.questions_count[1].questions_count) + parseInt(cookies.questions_count[2].questions_count);

    // console.log((((check_arr[1] <= check_arr[0]) && (cookies.user_answer.length == (countQst_lev3 - 1))) ||
    // ((check_arr[1] == check_arr[0]) && (levelQst_3.hit == (levelQst_3.countQst - 1)))));
   
    switch (numStartQst) {
        
        case countQst_lev1 :
                if (otvet.finish == 1) {
                    if (!levelQst_1.check) valid_level_1();
                    else if (levelQst_1.check==true && levelQst_1.next_lev == true) {
                        zapros_Cookies(); 
    
                        json_Q_A_next();

                        if (anime_off) {anime_off = false;
                            if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor != "rgb(128,128,128)") { handle_hit = setInterval(anime_step_fillHit,20, prevQst, numStartQst);
                                ints.push(handle_hit);
                                S(C('result1')[0]).display = 'flex';
                                S(C('step-level2')[0]).display = 'none';
                            }
                            else if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor == "rgb(128,128,128)" ) {
                                handle_hit_2 = setInterval(anime_step_fillHit_2, 20, prevQst, numStartQst);
                                ints.push(handle_hit_2);
                                S(C('result1')[0]).display = 'flex';
                                S(C('step-level2')[0]).display = 'none';
                            }
                            else if (otvet.answer_is_true == '0' || otvet.answer_is_true == null) { handle_miss = setInterval(anime_step_fillMiss, 20, prevQst, numStartQst);
                                ints.push(handle_miss);}
                        } else {
                            for (var i=0; i<ints.length; i++)
                            clearInterval( ints[i] );
                            ints = [];
                            fill_circle();
                            handle_move_left_start = setInterval(anime_move_left_start,10, numStartQst);
                            setTimeout("handle_step = setInterval(anime_step_up,20,numStartQst)",1000);
                            anime_off = true;
                        }
                        C('step-level')[0].classList.add('step-level-js-M');
                        // zapros_Cookies();           // Делаем синхронный запрос
                        // Object.cookie_level();
                    }
                } else if (otvet.finish == 2) /*if (((check_arr[1] <= check_arr[0]) && (cookies.user_answer.length == (countQst_lev3 - 1))) ||
                ((check_arr[1] == check_arr[0]) && (levelQst_3.hit == (levelQst_3.countQst - 1))))*/ {
                    if (!levelQst_2.check) valid_level_2();
                    else if (levelQst_2.check==true && levelQst_2.next_lev == true) {
                        zapros_Cookies(); 
    
                        json_Q_A_next();

                    if (anime_off) {anime_off=false;
                        if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor != "rgb(128,128,128)") { handle_hit_3 = setInterval(anime_step_fillHit_3,20, prevQst, numStartQst);
                            ints.push(handle_hit_3);
                            S(C('result2')[0]).display = 'flex';
                            S(C('step-level3')[0]).display = 'none';
                            S(C('step-level2')[0]).display = 'none';
                            S(C('present')[0]).display = 'flex';
                        }
                        else if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor == "rgb(128,128,128)" ) {
                            handle_hit_4 = setInterval(anime_step_fillHit_4, 20, prevQst, numStartQst);
                            ints.push(handle_hit_4);
                            S(C('result2')[0]).display = 'flex';
                            S(C('step-level3')[0]).display = 'none';
                            S(C('step-level2')[0]).display = 'none';
                            S(C('present')[0]).display = 'flex';
                        }
                        else if (otvet.answer_is_true == '0' || otvet.answer_is_true == null) { handle_miss = setInterval(anime_step_fillMiss, 20, prevQst, numStartQst);
                            ints.push(handle_miss);}
                    } else {
                        for (var i=0; i<ints.length; i++)
                        clearInterval( ints[i] );
                        ints = [];
                        fill_circle();
                        handle_move_left_start = setInterval(anime_move_left_start,10, numStartQst);
                        setTimeout("handle_step = setInterval(anime_step_up,20,numStartQst)",1000);
                        anime_off = true;
                     }
                     C('step-level step-level-js-M')[0].classList.add('step-level-js-H');
                        // zapros_Cookies();           // Делаем синхронный запрос
                        // Object.cookie_level();
                    }
        
                } else if (otvet.finish == 0) {

                    zapros_Cookies(); 
    
                    json_Q_A_next();
                                        // Если пользователь быстро нажал на ответить и продолжить анимация стартует сначала
                    if (anime_off) {
                        if (otvet.active_question < countQst_lev1){ anime_off = false;
                            // console.log(otvet.answer_is_true);
                            if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor != "rgb(128,128,128)") { handle_hit = setInterval(anime_step_fillHit,20, prevQst, numStartQst);
                                ints.push(handle_hit);}
                            else if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor == "rgb(128,128,128)" ) {
                                handle_hit_2 = setInterval(anime_step_fillHit_2, 20, prevQst, numStartQst);
                                ints.push(handle_hit_2);}
                            else if (otvet.answer_is_true == '0' || otvet.answer_is_true == null) {handle_miss = setInterval(anime_step_fillMiss, 20, prevQst, numStartQst);
                                ints.push(handle_miss);}
                        } else if (otvet.active_question >= countQst_lev1 && otvet.active_question < countQst_lev2) { anime_off = false;
                            if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor != "rgb(128,128,128)") { handle_hit_3 = setInterval(anime_step_fillHit_3,20, prevQst, numStartQst);
                                ints.push(handle_hit_3);}
                            else if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor == "rgb(128,128,128)" ) {
                                handle_hit_4 = setInterval(anime_step_fillHit_4, 20, prevQst, numStartQst);
                                ints.push(handle_hit_4);}
                            else if (otvet.answer_is_true == '0' || otvet.answer_is_true == null) {handle_miss = setInterval(anime_step_fillMiss, 20, prevQst, numStartQst);
                                ints.push(handle_miss);}
                        } else if (otvet.active_question >= countQst_lev2 && otvet.active_question < countQst_lev3){ anime_off = false;
                            if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor != "rgb(128,128,128)") { handle_hit_5 = setInterval(anime_step_fillHit_5,20, prevQst, numStartQst);
                                ints.push(handle_hit_5);}
                            else if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor == "rgb(128,128,128)" ) {
                                handle_hit_6 = setInterval(anime_step_fillHit_6, 20, prevQst, numStartQst);
                                ints.push(handle_hit_6);}
                            else if (otvet.answer_is_true == '0' || otvet.answer_is_true == null) { handle_miss = setInterval(anime_step_fillMiss, 20, prevQst, numStartQst);
                                ints.push(handle_miss);}
                        }
                    } else { 
                        for (var i=0; i<ints.length; i++)
                            clearInterval( ints[i] );
                        ints = [];
                        margin_left = 5;
                        fill_circle();
                        if (otvet.answer_is_true == '1') S(C('step-survey')[prevQst]).backgroundColor = 'yellow';
                        handle_move_left_start = setInterval(anime_move_left_start,10, numStartQst);
                        setTimeout("handle_step = setInterval(anime_step_up,20,numStartQst)",1000);
                        anime_off = true;
                    }
                    // zapros_Cookies();           // Делаем синхронный запрос
                    // Object.cookie_level();
                }
        break;

        case countQst_lev2 :
            if (otvet.finish==2) {
            if (!levelQst_2.check) valid_level_2();
            else if (levelQst_2.check==true && levelQst_2.next_lev == true) {
                zapros_Cookies(); 
    
                json_Q_A_next();

            if (anime_off) {anime_off=false;
                if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor != "rgb(128,128,128)") { handle_hit_3 = setInterval(anime_step_fillHit_3,20, prevQst, numStartQst);
                    ints.push(handle_hit_3);
                    S(C('result2')[0]).display = 'flex';
                    S(C('step-level3')[0]).display = 'none';
                    S(C('step-level2')[0]).display = 'none';
                    S(C('present')[0]).display = 'flex';
                }
                else if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor == "rgb(128,128,128)" ) {
                    handle_hit_4 = setInterval(anime_step_fillHit_4, 20, prevQst, numStartQst);
                    ints.push(handle_hit_4);
                    S(C('result2')[0]).display = 'flex';
                    S(C('step-level3')[0]).display = 'none';
                    S(C('step-level2')[0]).display = 'none';
                    S(C('present')[0]).display = 'flex';
                }
                else if (otvet.answer_is_true == '0' || otvet.answer_is_true == null) { handle_miss = setInterval(anime_step_fillMiss, 20, prevQst, numStartQst);
                    ints.push(handle_miss);}
            } else {
                for (var i=0; i<ints.length; i++)
                clearInterval( ints[i] );
                ints = [];
                fill_circle();
                handle_move_left_start = setInterval(anime_move_left_start,10, numStartQst);
                setTimeout("handle_step = setInterval(anime_step_up,20,numStartQst)",1000);
                anime_off = true;
             }

             C('step-level step-level-js-M')[0].classList.add('step-level-js-H');
                // zapros_Cookies();           // Делаем синхронный запрос

                // Object.cookie_level();
            }
         
            }  else if (otvet.finish == 3) /*if (((check_arr[1] <= check_arr[0]) && (cookies.user_answer.length == (countQst_lev3 - 1))) ||
        ((check_arr[1] == check_arr[0]) && (levelQst_3.hit == (levelQst_3.countQst - 1))))*/ {
            if (!levelQst_3.check) valid_level_3();
            else if (levelQst_3.check==true) { // && levelQst_3.next_lev == true
                zapros_Cookies(); 
    
                json_Q_A_next();

            if (anime_off) { anime_off=false;
            if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor != "rgb(128,128,128)") { handle_hit_5 = setInterval(anime_step_fillHit_5,20, prevQst, numStartQst);
                ints.push(handle_hit_5);}
                else if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor == "rgb(128,128,128)" ) {
                    handle_hit_6 = setInterval(anime_step_fillHit_6, 20, prevQst, numStartQst);
                    ints.push(handle_hit_6);}
                else if (otvet.answer_is_true == '0' || otvet.answer_is_true == null) { handle_miss = setInterval(anime_step_fillMiss, 20, prevQst, numStartQst);
                    ints.push(handle_miss);}
            } else {
                for (var i=0; i<ints.length; i++)
                clearInterval( ints[i] );
                ints = [];
                fill_circle();
                handle_move_left_start = setInterval(anime_move_left_start,10, numStartQst);
                setTimeout("handle_step = setInterval(anime_step_up,20,numStartQst)",1000);
                anime_off = true;
             }
      
            // zapros_Cookies();           // Делаем синхронный запрос

            // Object.cookie_level();
          
            } 

        } else if (otvet.finish == 0) { 
            zapros_Cookies(); 
    
            json_Q_A_next();

                                // Если пользователь быстро нажал на ответить и продолжить анимация стартует сначала
            if (anime_off) {
                if (otvet.active_question < countQst_lev1){ anime_off = false;
                    // console.log(otvet.answer_is_true);
                    if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor != "rgb(128,128,128)") { handle_hit = setInterval(anime_step_fillHit,20, prevQst, numStartQst);
                        ints.push(handle_hit);}
                    else if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor == "rgb(128,128,128)" ) {
                        handle_hit_2 = setInterval(anime_step_fillHit_2, 20, prevQst, numStartQst);
                        ints.push(handle_hit_2);}
                    else if (otvet.answer_is_true == '0' || otvet.answer_is_true == null) {handle_miss = setInterval(anime_step_fillMiss, 20, prevQst, numStartQst);
                        ints.push(handle_miss);}
                } else if (otvet.active_question >= countQst_lev1 && otvet.active_question < countQst_lev2) { anime_off = false;
                    if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor != "rgb(128,128,128)") { handle_hit_3 = setInterval(anime_step_fillHit_3,20, prevQst, numStartQst);
                        ints.push(handle_hit_3);}
                    else if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor == "rgb(128,128,128)" ) {
                        handle_hit_4 = setInterval(anime_step_fillHit_4, 20, prevQst, numStartQst);
                        ints.push(handle_hit_4);}
                    else if (otvet.answer_is_true == '0' || otvet.answer_is_true == null) {handle_miss = setInterval(anime_step_fillMiss, 20, prevQst, numStartQst);
                        ints.push(handle_miss);}
                } else if (otvet.active_question >= countQst_lev2 && otvet.active_question < countQst_lev3){ anime_off = false;
                    if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor != "rgb(128,128,128)") { handle_hit_5 = setInterval(anime_step_fillHit_5,20, prevQst, numStartQst);
                        ints.push(handle_hit_5);}
                    else if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor == "rgb(128,128,128)" ) {
                        handle_hit_6 = setInterval(anime_step_fillHit_6, 20, prevQst, numStartQst);
                        ints.push(handle_hit_6);}
                    else if (otvet.answer_is_true == '0' || otvet.answer_is_true == null) { handle_miss = setInterval(anime_step_fillMiss, 20, prevQst, numStartQst);
                        ints.push(handle_miss);}
                }
            } else { 
                for (var i=0; i<ints.length; i++)
                    clearInterval( ints[i] );
                ints = [];
                margin_left = 5;
                fill_circle();
                if (otvet.answer_is_true == '1') S(C('step-survey')[prevQst]).backgroundColor = 'yellow';
                handle_move_left_start = setInterval(anime_move_left_start,10, numStartQst);
                setTimeout("handle_step = setInterval(anime_step_up,20,numStartQst)",1000);
                anime_off = true;
            }

            // zapros_Cookies();           // Делаем синхронный запрос

            // Object.cookie_level();
          
        }
    
        break;

        case countQst_lev3 :
        if (!levelQst_3.check) valid_level_3();
        else if (levelQst_3.check==true && levelQst_3.next_lev == true) {
            document.getElementsByClassName('title')[0].style.display="none";
            document.getElementsByClassName('board')[0].style.display="none";
            document.getElementsByClassName('opros')[0].style.display="none";

            zapros_Cookies(); 
    
            json_Q_A_next();

            window.location.href = 'index.php?page=survey&back=1';

            // result.style.display = "none";
            // dark.style.display = "none";
            // otvet_true.style.display = "none";
            // otvet_false.style.display = "none";
            // image.style.display = "none";
            // why.style.display = "none";
            // why_title.style.display = "none";
            // why.innerHTML = '';
            
            // document.getElementsByClassName('title')[0].style.display="none";

            // if (anime_off) { anime_off=false;
            //     if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor != "rgb(128,128,128)") { handle_hit_5 = setInterval(anime_step_fillHit_5,20, prevQst, 0);
            //         ints.push(handle_hit_5);}
            //     else if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor == "rgb(128,128,128)" ) {
            //             handle_hit_6 = setInterval(anime_step_fillHit_6, 20, prevQst, 0);
            //             ints.push(handle_hit_6);}
            //     else if (otvet.answer_is_true == '0' || otvet.answer_is_true == null) { handle_miss = setInterval(anime_step_fillMiss, 20, prevQst, 0);
            //             ints.push(handle_miss);}
            // } else {
            //         for (var i=0; i<ints.length; i++)
            //         clearInterval( ints[i] );
            //         ints = [];
            //         fill_circle();
            //         handle_move_left_start = setInterval(anime_move_left_start,10, 0);
            //         anime_off = true;
            // }


            // zapros_Cookies();           // Делаем синхронный запрос
    
            // Object.cookie_level();
         
        } 

        break;

        default :
          
            if ((check_arr[1] <= check_arr[0]) && (otvet.finish == 1)) {
            // (cookies.user_answer.length == (levelQst_1.countQst - 1))) ||
            // ((check_arr[1] == check_arr[0]) && (levelQst_1.hit == (levelQst_1.countQst - 1)))) {
                // if ((cookies.user_answer.length == countQst_lev1) || (cookies.user_answer.length == (countQst_lev1 - 1))) {
                if (!levelQst_1.check) valid_level_1();
                else if (levelQst_1.check==true) { // && levelQst_1.next_lev == true
                    zapros_Cookies(); 
    
                    json_Q_A_next();

                        // handle_move_left_right = setInterval(anime_move_left_right, 50, prevQst, numStartQst);
                    if (anime_off) { anime_off=false;
                        if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor != "rgb(128,128,128)") { handle_hit = setInterval(anime_step_fillHit,20, prevQst, numStartQst);
                            ints.push(handle_hit);}
                        else if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor == "rgb(128,128,128)" ) {
                            handle_hit_2 = setInterval(anime_step_fillHit_2, 20, prevQst, numStartQst);
                            ints.push(handle_hit_2);}
                        else if (otvet.answer_is_true == '0' || otvet.answer_is_true == null) { handle_miss = setInterval(anime_step_fillMiss, 20, prevQst, numStartQst);
                            ints.push(handle_miss);}
                    } else {
                        for (var i=0; i<ints.length; i++)
                            clearInterval( ints[i] );
                        ints = [];
                        fill_circle();
                        handle_move_left_start = setInterval(anime_move_left_start,10, numStartQst);
                        setTimeout("handle_step = setInterval(anime_step_up,20,numStartQst)",1000);
                        anime_off = true;
                    }
                        // zapros_Cookies();           // Делаем синхронный запрос
    
                        // Object.cookie_level();
                } 
                // }
            } else if ((check_arr[1] <= check_arr[0]) && (otvet.finish == 2)) {
            // (((check_arr[1] <= check_arr[0]) && (cookies.user_answer.length == (countQst_lev2 - 1))) ||
            // ((check_arr[1] == check_arr[0]) && (levelQst_2.hit == (levelQst_2.countQst - 1)))) {
                if (!levelQst_2.check) valid_level_2();
                else if (levelQst_2.check==true) { // && levelQst_2.next_lev == true
                    zapros_Cookies(); 
    
                    json_Q_A_next();

                if (anime_off) { anime_off = false;
                if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor != "rgb(128,128,128)") { handle_hit_3 = setInterval(anime_step_fillHit_3,20, prevQst, numStartQst);
                    ints.push(handle_hit_3);}
                else if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor == "rgb(128,128,128)" ) {
                    handle_hit_4 = setInterval(anime_step_fillHit_4, 20, prevQst, numStartQst);
                    ints.push(handle_hit_4);}
                else if (otvet.answer_is_true == '0' || otvet.answer_is_true == null) { handle_miss = setInterval(anime_step_fillMiss, 20, prevQst, numStartQst);
                    ints.push(handle_miss);}
                } else {
                    for (var i=0; i<ints.length; i++)
                    clearInterval( ints[i] );
                    ints = [];
                    
                    fill_circle();
                    handle_move_left_start = setInterval(anime_move_left_start,10, numStartQst);
                    setTimeout("handle_step = setInterval(anime_step_up,20,numStartQst)",1000);
                    anime_off = true;
                }
                

                // zapros_Cookies();           // Делаем синхронный запрос

                // Object.cookie_level();
            
                } 
            } else if ((check_arr[1] <= check_arr[0]) && (otvet.finish == 3)) {
            // (((check_arr[1] <= check_arr[0]) && (cookies.user_answer.length == (countQst_lev3 - 1))) ||
            // ((check_arr[1] == check_arr[0]) && (levelQst_3.hit == (levelQst_3.countQst - 1)))) {
                if (!levelQst_3.check) valid_level_3();
                else if (levelQst_3.check==true) { // && levelQst_3.next_lev == true
                    
                    zapros_Cookies(); 
    
                    json_Q_A_next();

                if (anime_off) { anime_off=false;
                if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor != "rgb(128,128,128)") { handle_hit_5 = setInterval(anime_step_fillHit_5,20, prevQst, numStartQst);
                    ints.push(handle_hit_5);}
                else if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor == "rgb(128,128,128)" ) {
                    handle_hit_6 = setInterval(anime_step_fillHit_6, 20, prevQst, numStartQst);
                    ints.push(handle_hit_6);}
                else if (otvet.answer_is_true == '0' || otvet.answer_is_true == null) { handle_miss = setInterval(anime_step_fillMiss,20, prevQst, numStartQst);
                    ints.push(handle_miss);}
                } else { 
                    for (var i=0; i<ints.length; i++)
                    clearInterval( ints[i] );
                    ints = [];
                    
                    fill_circle();
                    handle_move_left_start = setInterval(anime_move_left_start,10, numStartQst);
                    setTimeout("handle_step = setInterval(anime_step_up,20,numStartQst)",1000);
                    anime_off = true;
                }
    
                // zapros_Cookies();           // Делаем синхронный запрос

                // Object.cookie_level();
    
                } 

            } else if (otvet.finish == 0) {
                zapros_Cookies(); 
    
                json_Q_A_next();

                                    // Если пользователь быстро нажал на ответить и продолжить анимация стартует сначала
                if (anime_off) {
                    if (otvet.active_question < countQst_lev1){ anime_off = false;
                        // console.log(otvet.answer_is_true);
                        if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor != "rgb(128,128,128)") { handle_hit = setInterval(anime_step_fillHit,20, prevQst, numStartQst);
                            ints.push(handle_hit);}
                        else if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor == "rgb(128,128,128)" ) {
                            handle_hit_2 = setInterval(anime_step_fillHit_2, 20, prevQst, numStartQst);
                            ints.push(handle_hit_2);}
                        else if (otvet.answer_is_true == '0' || otvet.answer_is_true == null) {handle_miss = setInterval(anime_step_fillMiss, 20, prevQst, numStartQst);
                            ints.push(handle_miss);}
                    } else if (otvet.active_question >= countQst_lev1 && otvet.active_question < countQst_lev2) { anime_off = false;
                        if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor != "rgb(128,128,128)") { handle_hit_3 = setInterval(anime_step_fillHit_3,20, prevQst, numStartQst);
                            ints.push(handle_hit_3);}
                        else if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor == "rgb(128,128,128)" ) {
                            handle_hit_4 = setInterval(anime_step_fillHit_4, 20, prevQst, numStartQst);
                            ints.push(handle_hit_4);}
                        else if (otvet.answer_is_true == '0' || otvet.answer_is_true == null) {handle_miss = setInterval(anime_step_fillMiss, 20, prevQst, numStartQst);
                            ints.push(handle_miss);}
                    } else if (otvet.active_question >= countQst_lev2 && otvet.active_question < countQst_lev3){ anime_off = false;
                        if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor != "rgb(128,128,128)") { handle_hit_5 = setInterval(anime_step_fillHit_5,20, prevQst, numStartQst);
                            ints.push(handle_hit_5);}
                        else if (otvet.answer_is_true == 1 && S(C('step-survey')[prevQst]).backgroundColor == "rgb(128,128,128)" ) {
                            handle_hit_6 = setInterval(anime_step_fillHit_6, 20, prevQst, numStartQst);
                            ints.push(handle_hit_6);}
                        else if (otvet.answer_is_true == '0' || otvet.answer_is_true == null) { handle_miss = setInterval(anime_step_fillMiss, 20, prevQst, numStartQst);
                            ints.push(handle_miss);}
                    }
                } else { 
                    for (var i=0; i<ints.length; i++)
                        clearInterval( ints[i] );
                    ints = [];
                    margin_left = 5;
                    fill_circle();
                    if (otvet.answer_is_true == '1') S(C('step-survey')[prevQst]).backgroundColor = 'yellow';
                    handle_move_left_start = setInterval(anime_move_left_start,10, numStartQst);
                    setTimeout("handle_step = setInterval(anime_step_up,20,numStartQst)",1000);
                    anime_off = true;
                }

                // zapros_Cookies();           // Делаем синхронный запрос
    
                // Object.cookie_level();
              
            }
        break;
    }

    var level = document.querySelectorAll(".step-level");
    // var circles = document.querySelectorAll(".step-survey");
    if (numStartQst >= 0 && numStartQst<levelQst_1.countQst) {
        level[0].innerHTML = numStartQst + 1 + "/" + levelQst_1.countQst;
        level[0].style.borderColor = "yellow";
        // if(fox.time_answer_toFast == true) fox.speak_hurry();

        // if (Math.random()<0.33) fox.speak_about_Qst();
    } else if (numStartQst>= levelQst_1.countQst && numStartQst < (levelQst_1.countQst + levelQst_2.countQst)) {
        level[0].innerHTML = (numStartQst*1 + 1) - levelQst_1.countQst + "/" + levelQst_2.countQst;
        level[0].style.borderColor = "blue";
    } else if (numStartQst>= (levelQst_1.countQst + levelQst_2.countQst) && numStartQst < countQst) {
        level[0].innerHTML = (numStartQst + 1) - (levelQst_1.countQst + levelQst_2.countQst) + "/" + levelQst_3.countQst;
        level[0].style.borderColor = "red";
    } else if (numStartQst==countQst) { 
        // document.getElementsByClassName('title')[0].style.display="none";
        // level[0].innerHTML = "Done";
        // level[0].style.backgroundColor = "red";
        // level[0].style.color = "yellow";
        // level[0].classList.add('step-level-finish');
        // var opros = document.getElementsByClassName('opros');
        // opros[0].style.display = "none";
        // var prev = document.getElementsByClassName('prev_next');
        // prev[0].style.display = "none";
        // var present = document.getElementsByClassName('present');
        // present[0].style.display = "none";
        // var gift = document.getElementsByClassName('gift');
        // gift[0].style.display = "flex";

        
        // stat();
        // window.location.href = 'index.php?page=survey'
        // fox.speak_game_end();
    }

    var inputs = document.querySelectorAll(".right input");
    for (var i=0; i<inputs.length; i++) {
            if (cookies.level_access == 1) inputs[i].nextElementSibling.classList.add ('level1');
            else if (cookies.level_access == 2) inputs[i].nextElementSibling.classList.add ('level2');
            else if (cookies.level_access == 3) inputs[i].nextElementSibling.classList.add ('level3');
        }
    
    if (cookies.level_access == 2) {
        O('next').classList.add ('next-level2');
    } else if (cookies.level_access == 3) {
        O('next').classList.add ('next-level3');
    }          

    if(fox.time_answer_toFast == true) fox.speak_hurry();

    if (numStartQst!==countQst && Math.random()<0.33) fox.speak_about_Qst();  
}


// ______________________________________АНИМАЦИЯ элементов ДОМ________________________________________

var anime_off = true; var ints = [];  // глобальная переменная для корректной работы анимации включаем в начале цикла анимации
                        //  и выключаем по завершению работы

var num_opacity=0;          // Анимация Круга со счетом вопросов при старте
function anime_level() {
    num_opacity += 0.02;
    if (num_opacity >= 1) clearInterval(handle);
    S(C('slider-level')[0]).opacity = num_opacity;
    
}
var num_step =15, num_margin_right = 30, 
control_size_up = 20, control_size_down = 15; // Анимация UP маленького круга степ-сурвей перед ответом

function anime_step_up(numStartQst) {                            // x - текущий вопрос
    num_step += 1;
    num_margin_right -= 1;
    if (num_step == control_size_up) {
        clearInterval(handle_step);
        anime_off = true;
        ints=[];
        flag_slaider=0;
    }
    S(C('step-survey')[numStartQst]).marginRight = num_margin_right + 'px';
    S(C('step-survey')[numStartQst]).width = num_step + 'px';
    S(C('step-survey')[numStartQst]).height = num_step + 'px';

  }

var flag_slaider =0; // флаг для отслеживания дваижения движения слайдера на нажатую кнопку

function anime_step_down(prevQst, numStartQst) {         // Анимация DOWN круга степ-сурвей после ответа
    flag_slaider =1;
    num_step -= 1;                     // y - предыдущий вопрос
    num_margin_right += 1;
    if (num_step == control_size_down) {
        clearInterval(handle_down);
        handle_move_left_right = setInterval(anime_move_left_right,1, prevQst, numStartQst);
        ints.push(handle_move_left_right);
    }
    S(C('step-survey')[prevQst]).marginRight = num_margin_right + 'px';
    S(C('step-survey')[prevQst]).width = num_step + 'px';
    S(C('step-survey')[prevQst]).height = num_step + 'px';
    
}

var step_alpha = 0;                               // закрашивание при промахе СЕРЫМ ФОНОМ
function anime_step_fillMiss(prevQst, numStartQst) {
    step_alpha += 0.05;
    if (step_alpha >= 1) {
        clearInterval(handle_miss);
        handle_down = setInterval(anime_step_down,50, prevQst, numStartQst);
        ints.push(handle_down);
    }
    S(C('step-survey')[prevQst]).backgroundColor = "rgba(128,128,128," + step_alpha + ")"
}

function anime_step_fillHit(prevQst, numStartQst) {          // закрашивание при попадании Желтым цветом
    step_alpha += 0.05;
    if (step_alpha >= 1) {
        clearInterval(handle_hit);
        handle_down = setInterval(anime_step_down,50, prevQst, numStartQst);
        ints.push(handle_down);
    }
    S(C('step-survey')[prevQst]).backgroundColor = "rgba(255,255,0," + step_alpha + ")"
}
var r = 0, g = 0, b = 0;
function anime_step_fillHit_2(prevQst, numStartQst) {          // закрашивание при смене промаха на попадание (СЕРЫЙ - ЖЕЛТЫЙ)
    r +=5; g += 5; b -= 5; 
    if (r >=255) {
        clearInterval(handle_hit_2);
        S(C('step-survey')[prevQst]).backgroundColor = "rgb(255,255,0)";
        handle_down = setInterval(anime_step_down,50, prevQst, numStartQst);
        ints.push(handle_down);
        }
    S(C('step-survey')[prevQst]).backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
}

function anime_step_fillHit_3(prevQst, numStartQst) {          // закрашивание при попадании СИНИМ цветом
    step_alpha += 0.05;
    if (step_alpha >= 1) {
        clearInterval(handle_hit_3);
        handle_down = setInterval(anime_step_down,50, prevQst, numStartQst);
        ints.push(handle_down);
    }
    S(C('step-survey')[prevQst]).backgroundColor = "rgba(0,0,255," + step_alpha + ")"
}

function anime_step_fillHit_4(prevQst, numStartQst) {          // закрашивание при смене промаха на попадание (СЕРЫЙ - СИНИЙ)
    r -=5; g -= 5; b += 5; 
    if (r >=255) {
        clearInterval(handle_hit_4);
        S(C('step-survey')[prevQst]).backgroundColor = "rgb(0,0,255)";
        handle_down = setInterval(anime_step_down,50, prevQst, numStartQst);
        ints.push(handle_down);
        }
    S(C('step-survey')[prevQst]).backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
}

function anime_step_fillHit_5(prevQst, numStartQst) {          // закрашивание при попадании КРАСНЫМ цветом
    step_alpha += 0.05;
    if (step_alpha >= 1) {
        clearInterval(handle_hit_5);
        handle_down = setInterval(anime_step_down,50, prevQst, numStartQst);
        ints.push(handle_down);
    }
    S(C('step-survey')[prevQst]).backgroundColor = "rgba(255,0,0," + step_alpha + ")"
}

function anime_step_fillHit_6(prevQst, numStartQst) {          // закрашивание при смене промаха на попадание (СЕРЫЙ - КРАСНЫЙ)
    r +=5; g -= 5; b -= 5; 
    if (r >=255) {
        clearInterval(handle_hit_6);
        S(C('step-survey')[prevQst]).backgroundColor = "rgb(255,0,0)";
        handle_down = setInterval(anime_step_down,50, prevQst, numStartQst);
        ints.push(handle_down);
        }
    S(C('step-survey')[prevQst]).backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
}


// ___________________________________________________________________________________________
var margin_left = 0; var last_margin = 5; var size_step = 29; var start_margin_left = 5; var size_step_start = 29;
var const_margin = 5;   
var status_screen = 1;
var size_circle = 12; // размер шарика
function resize_step() { 
    // изменение переменных в зависимости от размера экрана
    if (mobile == 0) {
        size_step = size_step_start = 47;
        num_step = 15; num_margin_right = 30;
        control_size_up = 20; control_size_down = 15; 
        start_margin_left = 5; last_margin = 5; const_margin = 5; status_screen=1; size_circle = 12;
    } else {size_step = size_step_start = 29;
        num_step = 10; num_margin_right = 17;
        control_size_up = 13; control_size_down = 10; 
        start_margin_left = 2; last_margin = 2; const_margin = 2; status_screen=0; size_circle = 17;
    }
}


function anime_move_left_start(y) {                             // смещение слайдера после ответа (первый круг)
    margin_left -= 2;
    // if ((cookies.user_answer.length ==3 && numStartQst == 2) && margin_left == (-45*numStartQst)) clearInterval(handle_move_left);
    if (margin_left <= const_margin + y*(-size_step_start)){   
    clearInterval(handle_move_left_start);
    margin_left = const_margin + y*(-size_step_start);
    last_margin = margin_left // margin_left = last_margin = start_margin_left;
    }
    // if (margin_left == -45 || margin_left == (-45*numStartQst)) clearInterval(handle_move_left);
    S(C('slider-survey')[0]).marginLeft = margin_left + 'px';
}

var move_left=false, move_right=false;  // используем флаг в для перенаправления цикла

function anime_move_left_right(y,x) {           // y - предыдущий вопрос, x - следующий вопрос
    if (x>y) {
        if (last_margin > margin_left && move_right==false) {
            margin_left += 1;
            if (margin_left == last_margin + (y*size_step - x*size_step)) {
                clearInterval(handle_move_left_right);
                last_margin = margin_left;      //last_margin = start_margin_left = margin_left; - было до правки
                handle_step = setInterval(anime_step_up,50, x);
                ints.push(handle_step);
            }    
            S(C('slider-survey')[0]).marginLeft = margin_left + 'px';}
        else {
            move_right=true;
            margin_left -=1;
            if (margin_left == last_margin + (y*size_step - x*size_step)) {
                clearInterval(handle_move_left_right);
                last_margin = margin_left;      //last_margin = start_margin_left = margin_left; - было до правки
                handle_step = setInterval(anime_step_up,50, x);
                ints.push(handle_step);
                move_right=false;
            }    
            S(C('slider-survey')[0]).marginLeft = margin_left + 'px';
        }
    } else if (x<y) {
        if (last_margin < margin_left && move_left==false) {
            margin_left -= 1;
            if (margin_left == last_margin + (y*size_step - x*size_step)) {
                clearInterval(handle_move_left_right);
                last_margin = margin_left; // last_margin = start_margin_left = margin_left; было до правки
                handle_step = setInterval(anime_step_up,50, x);
                ints.push(handle_step);
            }
            S(C('slider-survey')[0]).marginLeft = margin_left + 'px';}
        else  {
            move_left=true;     // ставиим флаг
            margin_left += 1;
            if (margin_left == last_margin + (y*size_step - x*size_step)) {
                clearInterval(handle_move_left_right);
                last_margin = margin_left; // last_margin = start_margin_left = margin_left; было до правки
                handle_step = setInterval(anime_step_up,50, x);
                ints.push(handle_step);
                move_left=false;    // убираем флаг
            }
            S(C('slider-survey')[0]).marginLeft = margin_left + 'px';
        }
    } else if (x==y) { 
        if (last_margin < margin_left) {
            margin_left -= 1;
            if (margin_left == last_margin + (y*size_step - x*size_step)) {
                clearInterval(handle_move_left_right);
                last_margin = margin_left;      //last_margin = start_margin_left = margin_left; - было до правки
                handle_step = setInterval(anime_step_up,50, x);
                ints.push(handle_step);
            }    
            S(C('slider-survey')[0]).marginLeft = margin_left + 'px';
        } else if (last_margin > margin_left) {
            margin_left += 1;
            if (margin_left == last_margin + (y*size_step - x*size_step)) {
                clearInterval(handle_move_left_right);
                last_margin = margin_left;      //last_margin = start_margin_left = margin_left; - было до правки
                handle_step = setInterval(anime_step_up,50, x);
                ints.push(handle_step);
            }    
            S(C('slider-survey')[0]).marginLeft = margin_left + 'px';
          } else {clearInterval(handle_move_left_right);
            last_margin = margin_left; // last_margin = start_margin_left = margin_left; было до правки
            handle_step = setInterval(anime_step_up,50, x);
            ints.push(handle_step);}
    }
}

function move_slider_right() {
    // if (margin_left >= start_margin_left) {
    //     clearInterval(handle_msr);
    //     return false;}
    margin_left += 5;
    S(C('slider-survey')[0]).marginLeft = margin_left + 'px';
}
function move_slider_left() {
    // if (margin_left <= (C('slider-box-survey')[0]).offsetWidth -(start_margin_left + size_circle + (countQst-1)*size_step))  {
    //     clearInterval(handle_msl);
    //     return false;}
    margin_left -= 5;
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


function  getPageSize(){
    var xScroll, yScroll;

    if (window.innerHeight && window.scrollMaxY) {
        xScroll = document.body.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
    } else if (document.documentElement && document.documentElement.scrollHeight > document.documentElement.offsetHeight){ // Explorer 6 strict mode
        xScroll = document.documentElement.scrollWidth;
        yScroll = document.documentElement.scrollHeight;
    } else { // Explorer Mac...would also work in Mozilla and Safari
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }

    var windowWidth, windowHeight;
    if (self.innerHeight) { // all except Explorer
        windowWidth = self.innerWidth;
        windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }

    // for small pages with total height less then height of the viewport
    if(yScroll < windowHeight){
        pageHeight = windowHeight;
    } else {
        pageHeight = yScroll;
    }

    // for small pages with total width less then width of the viewport
    if(xScroll < windowWidth){
        pageWidth = windowWidth;
    } else {
        pageWidth = xScroll;
    }

    return {'page':{'width':pageWidth,'height':pageHeight},'window':{'width':windowWidth,'height':windowHeight}}
}

function perebor_Qst() {
    setTimeout(function(){
        S(C('land-block-answer land-block2-answer2')[0]).display = "none";
        S(C('land-block-answer land-block2-answer3')[0]).display = "block";
    }, 1500);
    setTimeout(function(){
        S(C('land-block-answer land-block2-answer3')[0]).display = "none";
        S(C('land-block-answer land-block2-answer4')[0]).display = "block";
    }, 3000);
}

