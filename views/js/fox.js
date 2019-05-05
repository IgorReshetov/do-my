// 'use strict'

var fox = {
    status_IMG: {sleep: "sleep", wakeUp: "wakeUp", speak: "speak", sniff: "sniff"},
    sleep: true,
    speak: false,
    last_time: 0,

    words: {
        hello_new: "Привет, давай дружить!",
        hello_old: ["Привет! Я скучал)", "Привет! С возвращением!" ],
        hello_back_mouse: "фр..фр..Давай играть!",
        long_no_action: "Эгей, эгегей, давай, давай",
        email_enter: "Будь внимателен!",
        toFast: "Не спеши!",
        after_Qst: ["Это мой любимый", "Это самый любимый", "Интересный вопрос", "Рр.. будь осторожен", "Фр..фр.. ничего себе"],
        // __________Резерв___________
        // wakeUp: ["Вы еще здесь", "Может быть вам пора отдохнуть - промежуточные результаты игры сохраняются", "Мы ждем ваших действий"],
        help: ["Выбери вариант ответов", "Нажми ответить", "Будь внимателен"],
        // game_start: "Желаю удачи в игре!",
        // level_end: ["Отличный результат!", "Попробуй еще раз", "Ты отличный знаток"],
        game_end: ["Mолодец!", "Крутяшно!", "Я в тебя верил!"],
        
    },
   
    speak_HELLO: function(privet) {
        
        var last_time = this.last_time;
        var new_old = document.getElementsByClassName("start-h1");
        var fox_img = document.getElementById("fox");
        var fox_img_js = document.getElementsByClassName("fox-js");
        var fox_words = document.getElementsByClassName("fox-words");
        var sleep = this.status_IMG.sleep;
        var wakeUp = this.status_IMG.wakeUp;
        var speak = this.status_IMG.speak;
        var start_game = this.words.game_start;
        var delay = this.words.long_no_action;
        var hello_new = this.words.hello_new;
        var multi = this.words.email_enter;
        var toFast = this.words.toFast;
        var Qst = this.words.after_Qst[Math.floor(Math.random() * this.words.after_Qst.length)];
        var hello_old = this.words.hello_old[Math.floor(Math.random() * this.words.hello_old.length)];
        var game_end = this.words.game_end[Math.floor(Math.random() * this.words.game_end.length)];
        var hello_back = this.words.hello_back_mouse;
               
        this.sleep = false;
        setTimeout(function() {
            fox_img.className = 'fox-wakeUp';
            var handler_wakeUp = setInterval(function(){
                if(fox_img.classList.contains('fox-wakeUp')) {
                    fox_img.className = 'fox-wakeUp2';
                } else if (fox_img.classList.contains('fox-wakeUp2')) {
                    fox_img.className = 'fox-wakeUp';
                }
            },500);
            setTimeout(function(){clearInterval(handler_wakeUp)},1000);

        }, 2000);

        setTimeout(function() {
            fox_img.className = 'fox-speak';
            if (privet == "start"){
                    if (new_old[0].attributes.user.nodeValue == 'new') fox_words[0].innerHTML = hello_new;
                    else if (new_old[0].attributes.user.nodeValue == 'old') fox_words[0].innerHTML = hello_old;
                    else if (new_old[0].attributes.user.nodeValue == 'back') fox_words[0].innerHTML = hello_back;
            } else if (privet == "survey") fox_words[0].innerHTML = start_game;
              else if (privet == "delay") fox_words[0].innerHTML = delay;
              else if (privet == "multi") fox_words[0].innerHTML = multi;
              else if (privet == "toFast") fox_words[0].innerHTML = toFast;
              else if (privet == 'Qst') fox_words[0].innerHTML = Qst;
              else if (privet == 'game_end') fox_words[0].innerHTML = game_end; 
            fox_words[0].style.opacity = 1;
            
            var handler_speak = setInterval(function() {
                if(fox_img.classList.contains('fox-speak')) {
                        fox_img.className = 'fox-speak2';
                    setTimeout( function(){
                        fox_img.className = 'fox-speak3';
                    }, 100);
                } else if (fox_img.classList.contains('fox-speak3' )) {
                        fox_img.className = 'fox-speak2';
                    setTimeout( function(){
                        fox_img.className = 'fox-speak';
                    }, 100);
                } 

                },100);
            setTimeout(function(){clearInterval(handler_speak)},3000);

            setTimeout(function(){
                fox_words[0].innerHTML = "";
                fox_words[0].style.opacity = 0;
                fox.last_time = new Date().getTime();
            },3000);

        }, 3000, speak, new_old, hello_new, hello_old, last_time, privet);
       
        this.watch ("last_time", function (id, oldval, newval) {    // Ставим прослушку на сеттер для времени последнего обновления ЛИСА
            
            setTimeout(function(){
                fox_img.className='fox-sleep';
                fox.sleep=true;
         }, 5000)
        });
    },

    speake_start: function () {
        this.speak_HELLO("start");
    },

    speak_survey: function () {
        this.speak_HELLO("survey");
    },

    speak_multi: function () {
        this.speak_HELLO("multi");
    },

    speak_about_Qst: function () {
        this.speak_HELLO("Qst");
    },

    speak_hurry: function () {
        this.speak_HELLO("toFast");
    },

    speak_game_end: function () {
        this.speak_HELLO("game_end");
    },

    time_answer: 0,
    time_answer_toFast:false, 

    fast_answer: function() {
       
        this.watch('time_answer', function (id, oldval, newval) {            
        if (oldval== 0) return newval;
        else {
            if((newval-oldval)<=3000) {
                fox.time_answer_toFast = true;
                return newval;
            } else {
                fox.time_answer_toFast = false;
                return newval;
            }
        }
        });
        
    },

    no_active_time: 0,

    no_active_user: function() {
        var no_active_delay = 30; // Количество секунд простоя мыши, при котором пользователь считается неактивным
        setInterval(function(){fox.no_active_time++; }, 1000); // Каждую секунду увеличиваем количество секунд простоя мыши
        setInterval(function() {
            if (fox.no_active_time >= no_active_delay) { // Проверяем не превышен ли "предел активности" пользователя 
            fox.speak_HELLO("delay");
            fox.no_active_time = 0;  // ЛИС ГОВОРИТ ЭГЕГЕЙ ДАВАЙ ДАВАЙ!
            return;
            }
        }, 5000, no_active_delay); // Запускаем функцию проверки через определённый интервал
        document.onmousemove = document.onkeypress = document.ontouchend = function() {
            fox.no_active_time = 0; // Обнуляем счётчик простоя секунд
        };
     
    },

   
    wakeUp_mouse: function() {
        var last_time = this.last_time;
        var new_old = document.getElementsByClassName("start-h1");
        var fox_img = document.getElementById("fox");
        var fox_img_wakeUp = document.getElementsByClassName("fox-sleep");
        var fox_img_js = document.getElementsByClassName("fox-js");
        var fox_words = document.getElementsByClassName("fox-words");
        var sleep = this.status_IMG.sleep;
        var wakeUp = this.status_IMG.wakeUp;
        var speak = this.status_IMG.speak;
        var hello_new = this.words.hello_new;
        var hello_old = this.words.hello_old[Math.floor(Math.random() * this.words.hello_old.length)];
        var hello_back = this.words.hello_back_mouse;
      
        fox_img.onclick = function() {
            if (fox.sleep == true) {
                fox.sleep = false;
                fox_img.className = 'fox-wakeUp';
            var handler_wakeUp = setInterval(function(){
                if(fox_img.classList.contains('fox-wakeUp')) {
                    fox_img.className = 'fox-wakeUp2';
                } else if (fox_img.classList.contains('fox-wakeUp2')) {
                    fox_img.className = 'fox-wakeUp';
                }
            },500);
            setTimeout(function(){clearInterval(handler_wakeUp)},1000);
        
                setTimeout(function() {
                   fox_img.className = 'fox-speak';
                    fox_words[0].innerHTML = hello_back; 
                    fox_words[0].style.opacity = 1;
                    
                    var handler_speak = setInterval(function() {
                        if(fox_img.classList.contains('fox-speak')) {
                                fox_img.className = 'fox-speak2';
                            setTimeout( function(){
                                fox_img.className = 'fox-speak3';
                            }, 100);
                        } else if (fox_img.classList.contains('fox-speak3' )) {
                                fox_img.className = 'fox-speak2';
                            setTimeout( function(){
                                fox_img.className = 'fox-speak';
                            }, 100);
                        } 
        
                        },100);
                    setTimeout(function(){clearInterval(handler_speak)},3000);
        
                    setTimeout(function(){
                        fox_words[0].innerHTML = "";
                        fox_words[0].style.opacity = 0;
                        fox.last_time = new Date().getTime();
                    },3000);
        
                }, 3000, speak, new_old, hello_new, hello_old, last_time);
               
                this.watch ("last_time", function (id, oldval, newval) {    // Ставим прослушку на сеттер для времени последнего обновления ЛИСА
                    
                    setTimeout(function(){
                        fox_img.className='fox-sleep';
                        fox.sleep=true;
                 }, 3000)
                });

            } else return false;
        }
    },

    enter_leave_mouse: function() {
        var sleep = this.status_IMG.sleep;
        var sniff = this.status_IMG.sniff;
        var fox_img = document.getElementById("fox");
        fox_img.onmouseenter = function () {
            if(fox_img.classList.contains('fox-sleep')) { 
                fox_img.className = 'fox-sniff';
            }
        };
        fox_img.onmouseleave = function () {
            if(fox_img.classList.contains('fox-sniff')) {
                fox_img.className = 'fox-sleep';
            }
        };
    }
}

// ______________________________ПРОСЛУШКА СВОЙСТВА ОБЪЕКТА____________________________________
// СТАВИМ на свойство объекта прослушку
if (!Object.prototype.watch) {
	Object.defineProperty(Object.prototype, "watch", {
		  enumerable: false
		, configurable: true
		, writable: false
		, value: function (prop, handler) {
			var
			  oldval = this[prop]
			, newval = oldval
			, getter = function () {
				return newval;
			}
			, setter = function (val) {
				oldval = newval;
				return newval = handler.call(this, prop, oldval, val);
			}
			;
			
			if (delete this[prop]) { // can't watch constants
				Object.defineProperty(this, prop, {
					  get: getter
					, set: setter
					, enumerable: true
					, configurable: true
				});
			}
		}
	});
}

// УБИРАЕМ с объекта прослушку
if (!Object.prototype.unwatch) {
	Object.defineProperty(Object.prototype, "unwatch", {
		  enumerable: false
		, configurable: true
		, writable: false
		, value: function (prop) {
			var val = this[prop];
			delete this[prop]; // удаляем доступ
			this[prop] = val;
		}
	});
}

// _________________________________________________________________________________________________________

