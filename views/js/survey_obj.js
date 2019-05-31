// Объект индивидуального тест/опроса

var survey = {

// ___________________________Свойства___________________________ 

    numStartQst: 0,                  // Номер текущего вопроса
    countQst: 0,                     // Общее количество вопросов
    cookies: {},                     // свойства пользователя 
    prevQst: 0,                      // Номер предыдущего вопроса
    check_arr: [0],                  // Массив проверки для вывода результата уровня
    check_level: false,
    otvet: {},                       // Объект с ответом при получении ответа на вопрос
    rang_Qst_Stat: "",               // Свойство вопроса (статистический или нет)
    
// _________________________Методы_____________________________

    put_handler: function() {          // расстановка обработчиков на DOM

        document.body.onresize = this.mobile_change.check_size;

        O('button').onclick = function () {

            if (Math.random()<0.33) fox.speak_about_Qst();  

            if (survey.countQst == survey.numStartQst) {
                O("button").style.display="none";
                C('gift')[0].style.display = "flex";
                C('title')[0].style.display = "none";
                fox.speak_game_end();
                return;
            }

            if (survey.prevQst == survey.numStartQst && survey.cookies.user_answer.length > 0) {
                handle_move_left_start = setInterval(survey.anime_slider.anime_move_left_start,4, survey.numStartQst);
                // setTimeout("handle_step = setInterval(anime_step_up,100,numStartQst)",1000);
             } 
            else handle_step = setInterval(survey.anime_slider.anime_step_up,50,numStartQst);
         
            C('board')[0].style.display = "flex";
            C('opros')[0].style.display = "flex";
            C('prev_next')[0].style.display = "flex";
           
            for (var i = 0; i < tables.length; i++) {
                C('table')[i].style.opacity = "1";
            };

            O("button").style.display="none";
            C('title')[0].style.display="none";

            var data = {
                numStartQst:survey.numStartQst
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
            
                var messages = JSON.parse(xhr.responseText);
                console.log(messages);
                survey.rang_Qst_Stat = messages.question.is_stat;  // меняем форму вопроса стат (true)/точный(false)
                console.log(rang_Qst_Stat); 
                survey.update_Q_A(messages);
                preloader();
            }
            return false;
        };
        
        var answer_tr = document.querySelectorAll(".left");

        next_ready = function() {
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

        var inputs = document.querySelectorAll(".right input");

        for (var i = 0; i < inputs.length; i++) {
            inputs[i].onclick = next_ready;
        }

        var next = document.getElementById('next');

        next.onclick = function() {
                        
                // _______________Блок для обработчик Лиса fox.toFast___________________
                
                    var timeAnsw = new Date().getTime();
                    fox.time_answer = timeAnsw; 
                //  console.log(fox.time_answer); 
            // _________________________________________________________________________
            next.style.display = 'none';
            // var inputs = document.querySelectorAll(".right input");
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
                      
            var data = {
                id_question: numQst,
                id_answer: numAnsw,
                sign_bot: 0              // ЕЩЕ НЕ ПОНЯЛ КАК ВЫТАСКИВАТЬ ПЕРЕМЕННУЮ sign_bot!!!!!!!!!!!!!!!!!!!!!!!!!
            };

            data = JSON.stringify(data);
            // console.log(data);

            preloader_start();

            var xhr = new XMLHttpRequest();

            xhr.open('POST', 'index.php?page=put_answer', true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(data);
            
            xhr.onreadystatechange = function() {
                if (xhr.readyState != 4) {
                    return;
                }
         
                otvet = JSON.parse(xhr.responseText);
                console.log(otvet);
                survey.update_afterClientAnswer(otvet);
                preloader();
            }
            
            return false;
        }

        var saveGame = document.getElementById("saveGame");
        saveGame.onclick = function() {window.location.href='index.php'};

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

        //обработчики окна подарка

        var privacy_label = document.getElementById("privacy");
        privacy_label.onclick = function () {
            var check_text = document.getElementById("check-text");
            var check_privacy = document.getElementById("privacy-check");
            if (check_privacy.checked) {
                check_text.innerHTML = "Ознакомлен(а) с политикой конфиденциальности";}
            else {check_text.innerHTML = "Подтвердите oзнакомление с политикой конфиденциальности";}
        };

        var gift_get = document.getElementById("gift-get");
        gift_get.onclick = gift_get.oninput = function() { var check_privacy = document.getElementById("privacy-check");
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
        };
 

        var gift_button_get = document.getElementById("gift-button-get");
        gift_button_get.onclick = function() {
            preloader_start();
            var mail = document.getElementById('mail');
            var mail_data = mail.value;
            // сбор пожеданий отключен
            // var place = document.getElementById('gift-block2-desire1-place');
            // var room = document.getElementById('gift-block2-desire2-room');
            var place_data = 0;
            var room_data = 0;
               
            var data = {
                mail: mail_data,
                place: place_data,
                room: room_data
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
        };
        // _____________________ЗАКОНЧИЛ НА ОНКЛИК АПДЕЙТ АФТЕР КЛАЕНТ ФОРВАРД____________________!!!!!!!!!!!!!!!!!!!
    },
    
    mobile_change: {                   
        mobile: 0,                          // размер экрана (0-mobill 1-desktop)
        getPageSize: function() {
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
    
        // var page_size = {'page':{'width':pageWidth,'height':pageHeight},'window':{'width':windowWidth,'height':windowHeight}}
        
        if (pageWidth <= 570) {
            this.mobile = 1;
        } else { 
            this.mobile = 0;
        }
        return false;
        // return {'page':{'width':pageWidth,'height':pageHeight},'window':{'width':windowWidth,'height':windowHeight}}
        },
        
        // getPageSize();
        // if (page_size.page.width <= 570) {
        //     mobile = 1;
        // } else { 
        //     mobile = 0;
        // }

        check_size: function () {
            this.getPageSize();
            if (this.mobile == 1) {
                window.location.reload();
                return false
            } else if (this.mobile == 0) {
                window.location.reload();
                return false
            }
        }

    },

    anime_slider: {
        anime_off: true,        // глобальная переменная для корректной работы анимации включаем в начале цикла анимации
        ints: [],               //  и выключаем по завершению работы
        num_step: 15,
        num_margin_right: 30, 
        control_size_up: 20,
        control_size_down: 15,   // Анимация UP маленького круга степ-сурвей перед ответом   
        flag_slaider: 0,         // флаг для отслеживания дваижения движения слайдера на нажатую кнопку             
        step_alpha: 0,   
        r: 0, g: 0, b: 0,
        
        margin_left: 0,        // размер шарика
        last_margin: 5, 
        size_step: 29,
        start_margin_left: 5, 
        size_step_start: 29,
        const_margin: 5,   
        status_screen: 1,
        size_circle: 12,     
        
        move_left: false,       // используем флаг в для перенаправления цикла
        move_right: false,  

        resize_step: function () { 
            // изменение переменных в зависимости от размера экрана
            if (survey.mobile_change.mobile == 0) {
                this.size_step = this.size_step_start = 47;
                this.num_step = 15; this.num_margin_right = 30;
                this.control_size_up = 20; this.control_size_down = 15; 
                this.start_margin_left = 5; this.last_margin = 5; this.const_margin = 5; this.status_screen=1; this.size_circle = 12;
            } else {this.size_step = this.size_step_start = 29;
                this.num_step = 10; this.num_margin_right = 17;
                this.control_size_up = 13; this.control_size_down = 10; 
                this.start_margin_left = 2; this.last_margin = 2; this.const_margin = 2; this.status_screen=0; this.size_circle = 17;
            }
        },

        anime_step_up: function (numStartQst) {                            // Анимация Up круга степ-сурвей перед ответом
            this.num_step += 1;
            this.num_margin_right -= 1;
            if (this.num_step == this.control_size_up) {
                clearInterval(handle_step);
                this.anime_off = true;
                this.ints=[];
                this.flag_slaider=0;
            }
            S(C('step-survey')[numStartQst]).marginRight = this.num_margin_right + 'px';
            S(C('step-survey')[numStartQst]).width = this.num_step + 'px';
            S(C('step-survey')[numStartQst]).height = this.num_step + 'px';
        
        },

        anime_step_down: function (prevQst, numStartQst) {         // Анимация DOWN круга степ-сурвей после ответа
            this.flag_slaider =1;
            this.num_step -= 1;                     
            this.num_margin_right += 1;
            if (this.num_step == this.control_size_down) {
                clearInterval(handle_down);
                handle_move_left_right = setInterval(anime_move_left_right,1, prevQst, numStartQst);
                this.ints.push(handle_move_left_right);
            }
            S(C('step-survey')[prevQst]).marginRight = this.num_margin_right + 'px';
            S(C('step-survey')[prevQst]).width = this.num_step + 'px';
            S(C('step-survey')[prevQst]).height = this.num_step + 'px';
            
        },

        anime_step_fillMiss: function(prevQst, numStartQst) {
            this.step_alpha += 0.05;
            if (this.step_alpha >= 1) {
                clearInterval(handle_miss);
                handle_down = setInterval(anime_step_down,50, prevQst, numStartQst);
                this.ints.push(handle_down);
            }
            S(C('step-survey')[prevQst]).backgroundColor = "rgba(128,128,128," + this.step_alpha + ")";
        },

        anime_step_fillHit: function (prevQst, numStartQst) {          // закрашивание при попадании Желтым цветом
            this.step_alpha += 0.05;
            if (this.step_alpha >= 1) {
                clearInterval(handle_hit);
                handle_down = setInterval(anime_step_down,50, prevQst, numStartQst);
                this.ints.push(handle_down);
            }
            S(C('step-survey')[prevQst]).backgroundColor = "rgba(255,255,0," + this.step_alpha + ")"
        },

        anime_step_fillHit_2: function (prevQst, numStartQst) {          // закрашивание при смене промаха на попадание (СЕРЫЙ - ЖЕЛТЫЙ)
            this.r +=5; this.g += 5; this.b -= 5; 
            if (this.r >=255) {
                clearInterval(handle_hit_2);
                S(C('step-survey')[prevQst]).backgroundColor = "rgb(255,255,0)";
                handle_down = setInterval(anime_step_down,50, prevQst, numStartQst);
                this.ints.push(handle_down);
                }
            S(C('step-survey')[prevQst]).backgroundColor = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
        },
        
        anime_step_fillHit_3: function (prevQst, numStartQst) {          // закрашивание при попадании СИНИМ цветом
            this.step_alpha += 0.05;
            if (this.step_alpha >= 1) {
                clearInterval(handle_hit_3);
                handle_down = setInterval(anime_step_down,50, prevQst, numStartQst);
                this.ints.push(handle_down);
            }
            S(C('step-survey')[prevQst]).backgroundColor = "rgba(0,0,255," + this.step_alpha + ")"
        },
        
        anime_step_fillHit_4: function (prevQst, numStartQst) {          // закрашивание при смене промаха на попадание (СЕРЫЙ - СИНИЙ)
            this.r -=5; this.g -= 5; this.b += 5; 
            if (this.r >=255) {
                clearInterval(handle_hit_4);
                S(C('step-survey')[prevQst]).backgroundColor = "rgb(0,0,255)";
                handle_down = setInterval(anime_step_down,50, prevQst, numStartQst);
                this.ints.push(handle_down);
                }
            S(C('step-survey')[prevQst]).backgroundColor = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
        },
        
        anime_step_fillHit_5: function (prevQst, numStartQst) {          // закрашивание при попадании КРАСНЫМ цветом
            this.step_alpha += 0.05;
            if (this.step_alpha >= 1) {
                clearInterval(handle_hit_5);
                handle_down = setInterval(anime_step_down,50, prevQst, numStartQst);
                this.ints.push(handle_down);
            }
            S(C('step-survey')[prevQst]).backgroundColor = "rgba(255,0,0," + this.step_alpha + ")"
        },
        
        anime_step_fillHit_6: function (prevQst, numStartQst) {          // закрашивание при смене промаха на попадание (СЕРЫЙ - КРАСНЫЙ)
            this.r +=5; this.g -= 5; this.b -= 5; 
            if (this.r >=255) {
                clearInterval(handle_hit_6);
                S(C('step-survey')[prevQst]).backgroundColor = "rgb(255,0,0)";
                handle_down = setInterval(anime_step_down,50, prevQst, numStartQst);
                this.ints.push(handle_down);
                }
            S(C('step-survey')[prevQst]).backgroundColor = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
        },

        anime_move_left_start: function (y) {                             // смещение слайдера после ответа (первый круг)
            this.margin_left -= 2;
            // if ((cookies.user_answer.length ==3 && numStartQst == 2) && margin_left == (-45*numStartQst)) clearInterval(handle_move_left);
            if (this.margin_left <= this.const_margin + y*(-this.size_step_start)){   
                clearInterval(handle_move_left_start);
                this.margin_left = this.const_margin + y*(-this.size_step_start);
                this.last_margin = this.margin_left // margin_left = last_margin = start_margin_left;
                handle_step = setInterval(survey.anime_slider.anime_step_up,100,survey.numStartQst)
            }
            // if (margin_left == -45 || margin_left == (-45*numStartQst)) clearInterval(handle_move_left);
            S(C('slider-survey')[0]).marginLeft = this.margin_left + 'px';
        },

        anime_move_left_right: function (y,x) {           // y - предыдущий вопрос, x - следующий вопрос
            if (x>y) {
                if (this.last_margin > this.margin_left && this.move_right==false) {
                    this.margin_left += 1;
                    if (this.margin_left == this.last_margin + (y*this.size_step - x*this.size_step)) {
                        clearInterval(handle_move_left_right);
                        this.last_margin = this.margin_left;      //last_margin = start_margin_left = margin_left; - было до правки
                        handle_step = setInterval(anime_step_up,50, x);
                        this.ints.push(handle_step);
                    }    
                    S(C('slider-survey')[0]).marginLeft = this.margin_left + 'px';}
                else {
                    this.move_right=true;
                    this.margin_left -=1;
                    if (this.margin_left == this.last_margin + (y*this.size_step - x*this.size_step)) {
                        clearInterval(handle_move_left_right);
                        this.last_margin = this.margin_left;      //last_margin = start_margin_left = margin_left; - было до правки
                        handle_step = setInterval(anime_step_up,50, x);
                        this.ints.push(handle_step);
                        this.move_right=false;
                    }    
                    S(C('slider-survey')[0]).marginLeft = this.margin_left + 'px';
                }
            } else if (x<y) {
                if (this.last_margin < this.margin_left && this.move_left==false) {
                    this.margin_left -= 1;
                    if (this.margin_left == this.last_margin + (y*this.size_step - x*this.size_step)) {
                        clearInterval(handle_move_left_right);
                        this.last_margin = this.margin_left; // last_margin = start_margin_left = margin_left; было до правки
                        handle_step = setInterval(anime_step_up,50, x);
                        this.ints.push(handle_step);
                    }
                    S(C('slider-survey')[0]).marginLeft = this.margin_left + 'px';}
                else  {
                    this.move_left=true;     // ставиим флаг
                    this.margin_left += 1;
                    if (this.margin_left == this.last_margin + (y*this.size_step - x*this.size_step)) {
                        clearInterval(handle_move_left_right);
                        this.last_margin = this.margin_left; // last_margin = start_margin_left = margin_left; было до правки
                        handle_step = setInterval(anime_step_up,50, x);
                        this.ints.push(handle_step);
                        this.move_left=false;    // убираем флаг
                    }
                    S(C('slider-survey')[0]).marginLeft = this.margin_left + 'px';
                }
            } else if (x==y) { 
                if (this.last_margin < this.margin_left) {
                    this.margin_left -= 1;
                    if (this.margin_left == this.last_margin + (y*this.size_step - x*this.size_step)) {
                        clearInterval(handle_move_left_right);
                        this.last_margin = margin_left;      //last_margin = start_margin_left = margin_left; - было до правки
                        handle_step = setInterval(anime_step_up,50, x);
                        this.ints.push(handle_step);
                    }    
                    S(C('slider-survey')[0]).marginLeft = this.margin_left + 'px';
                } else if (this.last_margin > this.margin_left) {
                    this.margin_left += 1;
                    if (this.margin_left == this.last_margin + (y*this.size_step - x*this.size_step)) {
                        clearInterval(handle_move_left_right);
                        this.last_margin = this.margin_left;      //last_margin = start_margin_left = margin_left; - было до правки
                        handle_step = setInterval(anime_step_up,50, x);
                        this.ints.push(handle_step);
                    }    
                    S(C('slider-survey')[0]).marginLeft = this.margin_left + 'px';
                  } else {clearInterval(handle_move_left_right);
                    this.last_margin = this.margin_left; // last_margin = start_margin_left = margin_left; было до правки
                    handle_step = setInterval(anime_step_up,50, x);
                    this.ints.push(handle_step);}
            }
        },
        
        move_slider_right: function () {
            // if (margin_left >= start_margin_left) {
            //     clearInterval(handle_msr);
            //     return false;}
            this.margin_left += 5;
            S(C('slider-survey')[0]).marginLeft = this.margin_left + 'px';
        },

        move_slider_left: function () {
            // if (margin_left <= (C('slider-box-survey')[0]).offsetWidth -(start_margin_left + size_circle + (countQst-1)*size_step))  {
            //     clearInterval(handle_msl);
            //     return false;}
            this.margin_left -= 5;
            S(C('slider-survey')[0]).marginLeft = this.margin_left + 'px';
        }

    },

    get_user_data: function() {
        preloader_start();

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'index.php?page=get_answer', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) {
                return;
            }
            this.cookies = JSON.parse(xhr.responseText);
            // numStartQst = 0;
           
            for (var i = 0; i<this.cookies.questions_count.length; i++) {
                    this.countQst += parseInt(cookies.questions_count[i].questions_count);
                    this.cookies.questions_count[i].questions_count = parseInt(this.cookies.questions_count[i].questions_count);
            }
            
            this.prevQst = this.numStartQst = this.cookies.active_question;
           
            var lev_1 = this.cookies.questions_count[0].questions_count;
            var lev_2 = this.cookies.questions_count[1].questions_count;
            var lev_3 = this.cookies.questions_count[2].questions_count;        
            // cookie_level();
        
            // var level = document.querySelectorAll(".step-level");
            // var level2 = document.querySelectorAll(".step-level2");
            // var level3 = document.querySelectorAll(".step-level3");
            // var circles = document.querySelectorAll(".step-survey");
            // var numQstLevel_1 = parseInt(cookies.questions_count[0].questions_count);
            // var numQstLevel_2 = parseInt(cookies.questions_count[1].questions_count);
            // console.log(C('slider-level')[0]);
            // console.log(level[0].style);
            
            C("step-level2")[0].innerHTML = lev_2;
            C("step-level3")[0].innerHTML = lev_3;
            // level2[0].innerHTML = levelQst_2.countQst;
            // level3[0].innerHTML = levelQst_3.countQst;

            // for (var i=0; i<this.countQst; i++) {
            //     C('step-survey')[i].style.background = 'white';
            // }
            
            if (this.numStartQst >= 0 && this.numStartQst < lev_1) {
                C("step-level")[0].innerHTML = this.numStartQst + 1 + "/" + lev_1;
                C("step-level")[0].style.borderColor = "yellow";
                
            } else if (this.numStartQst >= lev_1 && this.numStartQst < (lev_1 + lev_2)) {
            // console.log(levelQst_1.countQst)
            // console.log(numStartQst)
                C("step-level")[0].innerHTML = (this.numStartQst*1 + 1) - lev_1 + "/" + lev_2;
                C("step-level")[0].style.borderColor = "blue";
                C("step-level")[0].classList.add('step-level-js-M');
                S(C('result1')[0]).display = 'flex';
                S(C('step-level2')[0]).display = 'none';
            } else if (this.numStartQst >= (lev_1 + lev_2) && this.numStartQst < this.countQst) {
                C("step-level")[0].innerHTML = (this.numStartQst + 1) - (lev_1 + lev_2) + "/" + lev_3;
                C("step-level")[0].style.borderColor = "red";
                C("step-level")[0].classList.add('step-level-js-H');
                S(C('result1')[0]).display = 'flex';
                S(C('result2')[0]).display = 'flex';
                S(C('step-level2')[0]).display = 'none';
                S(C('step-level3')[0]).display = 'none';
                S(C('present')[0]).display = 'flex';
            } else if (this.numStartQst == this.countQst) {
                C("step-level")[0].innerHTML = "Done";
                C("step-level")[0].style.backgroundColor = "red";
                C("step-level")[0].style.color = "yellow";
                C("step-level")[0].classList.add('step-level-finish');
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

            for (var i=0; i<this.countQst; i++) {
                // circles[i].style. = 'grey';
                C("step-level")[i].style.display = 'inline';
                if (i<lev_1) {
                    C("step-level")[i].style.border = '1px solid yellow';
                    (this.cookies.user_answer[i].answer_is_true == '1')? C("step-level")[i].style.background = 'yellow' : C("step-level")[i].style.background = 'white';
                    (this.cookies.user_answer[i].answer_is_true == null)? C("step-level")[i].style.background = 'grey' : C("step-level")[i].style.background = 'white';
                } else if (i >= lev_1 && i < lev_1 + lev_2) {
                    C("step-level")[i].style.border = '1px solid blue';
                    (this.cookies.user_answer[i].answer_is_true == '1')? C("step-level")[i].style.background = 'blue' : C("step-level")[i].style.background = 'white';
                    (this.cookies.user_answer[i].answer_is_true == null)? C("step-level")[i].style.background = 'grey' : C("step-level")[i].style.background = 'white';
                } else if (i >= lev_1 + lev_2) {
                    C("step-level")[i].style.border = '1px solid red';
                    (this.cookies.user_answer[i].answer_is_true == '1')? C("step-level")[i].style.background = 'red' : C("step-level")[i].style.background = 'red'; 
                    (this.cookies.user_answer[i].answer_is_true == null)? C("step-level")[i].style.background = 'grey' : C("step-level")[i].style.background = 'white';
                } 
            }
            // for (var i = 0; i < this.cookies.user_answer.length; i++) {
            //     if (this.cookies.user_answer[i].answer_is_true == '1' && i < lev_1 )
            //         C("step-level")[i].style.background = 'yellow';
            //     else if (this.cookies.user_answer[i].answer_is_true == '1' && i >= lev_1 && i < lev_1 + lev_2)
            //         C("step-level")[i].style.background = 'blue';
            //     else if (this.cookies.user_answer[i].answer_is_true == '1' && i >= lev_1 + lev_2)
            //         C("step-level")[i].style.background = 'red';
            //     else C("step-level")[i].style.background = 'grey';
            // }
            
            if (this.cookies.level_access == 2) {
                O('next').classList.add ('next-level2');
                C('forward')[0].classList.add ('forward-level2');
                O('saveGame').classList.add ('forward-level2');
            } else if (this.cookies.level_access == 3) {
                O('next').classList.add ('next-level3');
                C('forward')[0].classList.add('forward-level3');
                O('saveGame').classList.add('forward-level3');
            } 
            // console.log(cookies);
            // console.log(prevQst);
            // console.log(numStartQst);

            var status_Game = document.getElementsByClassName('slider-box-main');
            if (this.cookies.user_answer.length > 0 && document.querySelectorAll("table")[0].style.opacity == "1") 
            status_Game[0].style.display = "block";


            preloader();
            return false;
        }
    },

    update_Q_A: function(messages) {
            var answShuffle = [];
        
        for (var i = 0; i < messages.answer.id_answer.length; i++) {
            var ans = [];
            ans.push(messages.answer.id_answer[i]);
            ans.push(messages.answer.answer[i]);
            answShuffle.push(ans);
        };

        answShuffle.shuffle = function () {
            for (var i = this.length - 1; i > 0; i--) {
                var num = Math.floor(Math.random() * (i + 1));
                var d = this[num];
                this[num] = this[i];
                this[i] = d;
            }
            return this;
        }

        answShuffle = answShuffle.shuffle();        //Перемешываем массив с элементами ответов
        var idShuffle = [], answerShuffle = [];       //Разбиваем на два массива*** делаем это, т.к. цикл не видит второго уровня и требуется еще один вложенный цикл
    
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
                if (this.cookies.level_access == 1) inputs[i].nextElementSibling.classList.add ('level1');
                else if (this.cookies.level_access == 2) inputs[i].nextElementSibling.classList.add ('level2');
                else if (this.cookies.level_access == 3) inputs[i].nextElementSibling.classList.add ('level3');
            } else {inputs[i].setAttribute('type', 'radio');
                inputs[i].nextElementSibling.classList.add ('radio');  
                inputs[i].nextElementSibling.classList.remove ('checkbox');
                if (this.cookies.level_access == 1) inputs[i].nextElementSibling.classList.add ('level1');
                else if (this.cookies.level_access == 2) inputs[i].nextElementSibling.classList.add ('level2');
                else if (this.cookies.level_access == 3) inputs[i].nextElementSibling.classList.add ('level3');
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

        // var result = document.getElementById("result");
        // var dark = document.getElementById("dark");
        // var otvet_true = document.getElementById("true");
        // var otvet_false = document.getElementById("false");
        // var image = document.getElementById("image");
        // var why = document.getElementById("why");
        // var why_title = document.getElementById("why-title");
        // var saveGame = document.getElementById("saveGame");

        O('result').style.display = "none";
        O('dark').style.display = "none";
        O('true').style.display = "none";
        O('false').style.display = "none";
        O('image').style.display = "none";
        O('why').style.display = "none";
        O('why-title').style.display = "none";
        O('why').innerHTML = '';
        O('saveGame').style.display = "none";
        
        if (this.cookies.level_access == 2) {
            O('next').classList.add ('next-level2');
            O('forward').classList.add('forward-level2');
            O('saveGame').classList.add ('forward-level2');
        } else if (this.cookies.level_access == 3) {
            O('next').classList.add ('next-level3');
            O('forward').classList.add('forward-level3');
            O('saveGame').classList.add ('forward-level3');
        } 
  
    },

    update_afterClientAnswer: function(otvet) {
        
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
        
        numStartQst = otvet.active_question;
        check_arr.push(otvet.active_question);

        result.style.display = "flex";
        dark.style.display = "block";
        if (otvet.answer_is_true == 1) {
            image.className = 'result-tru-question';  // Правка класс листа для IE
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
    },


    












}