// Объект индивидуального тест/опроса

var survey = {

// ___________________________Свойства___________________________ 

    numStartQst: 0,                  // Номер текущего вопроса
    countQst: 0,                     // Общее количество вопросов
    cookies: {},                     // свойства пользователя 
    prevQst: 0,                      // Номер предыдущего вопроса
    check_arr: [0],                 // Массив проверки для вывода результата уровня
    check_level: false,
    otvet: {},                       // Объект с ответом при получении ответа на вопрос

    
// _________________________Методы_____________________________

    put_handler: function() {          // расстановка обработчиков на DOM
        document.body.onresize = this.mobile_change.check_size;
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
            
            this.numStartQst = this.cookies.active_question;
            this.prevQst = this.cookies.active_question;

            var lev_1 = this.cookies.questions_count[0].questions_count;
            var lev_2 = this.cookies.questions_count[1].questions_count;
            var lev_3 = this.cookies.questions_count[2].questions_count;        
            // cookie_level();
        
            var level = document.querySelectorAll(".step-level");
            var level2 = document.querySelectorAll(".step-level2");
            var level3 = document.querySelectorAll(".step-level3");
            var circles = document.querySelectorAll(".step-survey");
            var numQstLevel_1 = parseInt(cookies.questions_count[0].questions_count);
            var numQstLevel_2 = parseInt(cookies.questions_count[1].questions_count);
            // console.log(C('slider-level')[0]);
            // console.log(level[0].style);
            
            C("step-level2")[0].innerHTML = lev_2;
            C("step-level3")[0].innerHTML = lev_3;
            // level2[0].innerHTML = levelQst_2.countQst;
            // level3[0].innerHTML = levelQst_3.countQst;

            for (var i=0; i<this.countQst; i++) {
                C('step-survey')[i].style.background = 'white';
            }
            
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
            
            if (cookies.level_access == 2) {
                O('next').classList.add ('next-level2');
                C('forward')[0].classList.add ('forward-level2');
            } else if (cookies.level_access == 3) {
                O('next').classList.add ('next-level3');
                C('forward')[0].classList.add('forward-level3');
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
    },


    












}