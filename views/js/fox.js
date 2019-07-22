// 'use strict'

var fox = {
    status_IMG: {sleep: "sleep", wakeUp: "wakeUp", speak: "speak", sniff: "sniff"},
    sleep: true,
    speak: false,
    last_time: 0,
    ints_speak: [],

    words: {
        hello_new: "Привет.<br>Давай дружить!",
        hello_old: ["Привет!<br>Я скучал)", "Привет!<br>С возвращением!"],
        hello_back_mouse: "фр..фр..<br>Давай, давай!",
        long_no_action: "Эгей, эгегей.<br>Давай, давай",
        email_enter: "Будь внимателен!",
        toFast: "Не спеши!",
        after_Qst: ["Это мой любимый<br>вопрос", "Это самый любимый<br>вопрос", "Интересный вопрос", "Рр...<br>будь осторожен", "Фр..фр..<br>Ничего себе"],
        // __________Резерв___________
        // wakeUp: ["Вы еще здесь", "Может быть вам пора отдохнуть - промежуточные результаты игры сохраняются", "Мы ждем ваших действий"],
        help: ["Выбери вариант ответов", "Нажми ответить", "Будь внимателен"],
        // game_start: "Желаю удачи в игре!",
        // level_end: ["Отличный результат!", "Попробуй еще раз", "Ты отличный знаток"],
        game_end: ["Mолодец!", "Крутяшно!", "Я в тебя верил!"],
        about_level: ["Для прохождения этого уровня<br>ты можешь допустить 3 промаха", "Для прохождения этого уровня<br>ты можешь допустить 2 промаха", "Для прохождения этого уровня<br>ты можешь допустить 2 промаха"],
        about_hint: ["У тебя есть 9 моих подсказок","У тебя есть 8 моих подсказок","У тебя есть 7 моих подсказок","У тебя есть 6 моих подсказок","У тебя есть 5 моих подсказок","У тебя есть 4 моих подсказки","У тебя есть 3 моих подсказки", "У тебя есть 2 моих подсказки", "У тебя осталась 1 моя подсказка", "У тебя не осталось моих подсказок"]
    },
   
    speak_HELLO: function(privet) {

        var last_time = this.last_time;
        var new_old = document.getElementById("fox-start");
        var fox_img = document.getElementById("fox");
        var fox_img_js = document.getElementsByClassName("fox-js");
        var fox_words = fox_img.nextElementSibling;
        var fox_words_text = fox_img.nextElementSibling.firstElementChild;
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
        var about_level = this.words.about_level;
        var about_hint = this.words.about_hint;

        this.sleep = false;
        
        this.speak = true

        if ( privet == 'about_hint' || privet == 'about_level') {
            setTimeout(function() {
                fox_words.style.display = "none";
                fox_img.className = 'fox-wakeUp';
                var handler_wakeUp = setInterval(function(){
                    if(fox_img.classList.contains('fox-wakeUp')) {
                        fox_img.className = 'fox-wakeUp2';
                    } else if (fox_img.classList.contains('fox-wakeUp2')) {
                        fox_img.className = 'fox-wakeUp';
                    }
                },500);
                setTimeout(function(){clearInterval(handler_wakeUp)},1000);
            }, 0);
        } else if (privet == 'hint') {
            fox_words_text.innerHTML = fox.hint_words;
            fox_words.style.display = "block";
            setTimeout(function() {
                fox_img.className = 'fox-wakeUp';
                var handler_wakeUp_hint = setInterval(function(){
                    if(fox_img.classList.contains('fox-wakeUp')) {
                        fox_img.className = 'fox-wakeUp2';
                    } else if (fox_img.classList.contains('fox-wakeUp2')) {
                        fox_img.className = 'fox-wakeUp';
                    }
                },500);
                setTimeout(function(){clearInterval(handler_wakeUp_hint)},1000);
            }, 0);
        } else {
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
        }

        if (fox.speak_about_level_flag == true && fox.speak_hint_flag == false) {
            setTimeout(function() {
            fox_img.className = 'fox-speak';
            if (privet == 'about_level') {
                    if (cookies.level_access == 1) fox_words_text.innerHTML = about_level[0];
                    else if (cookies.level_access == 2) fox_words_text.innerHTML = about_level[1];
                    else if (cookies.level_access == 3) fox_words_text.innerHTML = about_level[2];
            } 
            
            // fox_words.style.display = "block";

            var handler_speak_lev = setInterval(function() {

                fox_words.style.display = "block";

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
            
            if (privet == "about_level") { 
                // setTimeout(function(){clearInterval(handler_speak); fox.speak_about_level_flag = false},11000);
                setTimeout(function(){
                    if (fox.hint == 9) fox_words_text.innerHTML = about_hint[0];
                    else if (fox.hint == 8) fox_words_text.innerHTML = about_hint[1];
                    else if (fox.hint == 7) fox_words_text.innerHTML = about_hint[2];
                    else if (fox.hint == 6) fox_words_text.innerHTML = about_hint[3];
                    else if (fox.hint == 5) fox_words_text.innerHTML = about_hint[4];
                    else if (fox.hint == 4) fox_words_text.innerHTML = about_hint[5];
                    else if (fox.hint == 3) fox_words_text.innerHTML = about_hint[6];
                    else if (fox.hint == 2) fox_words_text.innerHTML = about_hint[7];
                    else if (fox.hint == 1) fox_words_text.innerHTML = about_hint[8];
                    else if (fox.hint == 0) fox_words_text.innerHTML = about_hint[9];

                    fox_words.style.display = "block";
                    // if (cookies.level_access == 1) fox_words_text.innerHTML = about_hint[0];
                    // else if (cookies.level_access == 2) fox_words_text.innerHTML = about_hint[1];
                    // else if (cookies.level_access == 3) fox_words_text.innerHTML = about_hint[2];
                    // fox_words_text.innerHTML = "";
                    // fox_words.style.display = 'none';
                    // fox.last_time = new Date().getTime();
                },6000);
                setTimeout(function(){
                    clearInterval(handler_speak_lev); 
                    fox.speak_about_level_flag = false;
                    fox_words_text.innerHTML = "";
                    fox_words.style.display = 'none';
                    if (fox.ints_speak.length > 0) { // если есть очередь высказываний, говорим следующее слово
                        new Function(fox.ints_speak.shift())();
                        return;
                    } else fox.speak=false; // если слов в очереди день то выключаем свойство говорит
                    fox.last_time = new Date().getTime();
                    
                },11000);
            }
            // } else {
            //     setTimeout(function(){clearInterval(handler_speak)},3000);
            //     setTimeout(function(){
            //         if (fox.speak_about_level_flag == false) {fox_words_text.innerHTML = "";
            //         fox_words.style.display = 'none';
            //         fox.last_time = new Date().getTime();
            //         fox.speak=false;
            //         }
            //     },3000);
            // }
            }, 3000, speak, new_old, hello_new, hello_old, last_time, privet);
        } else {
            setTimeout(function() {
                
                fox_img.className = 'fox-speak';
                if (privet == "start"){
                    if (fox.speak_about_level_flag == false) {
                        if (new_old.attributes.user.nodeValue == 'new') fox_words_text.innerHTML = hello_new;
                        else if (new_old.attributes.user.nodeValue == 'old') fox_words_text.innerHTML = hello_old;
                        else if (new_old.attributes.user.nodeValue == 'back') fox_words_text.innerHTML = hello_back;
                    } else return;
                } else if (privet == "survey") fox_words_text.innerHTML = start_game;
                  else if (privet == "delay") fox_words_text.innerHTML = delay;
                  else if (privet == "multi") {
                    if (fox.speak_about_level_flag == false) {
                      fox_words_text.innerHTML = multi;
                    } else return
                  } 
                  else if (privet == "toFast") fox_words_text.innerHTML = toFast;
                  else if (privet == 'Qst') {
                        if (fox.speak_about_level_flag == false) {
                        fox_words_text.innerHTML = Qst;
                        } else return;
                } else if (privet == 'game_end') fox_words_text.innerHTML = game_end;
                else if (privet == 'about_level') {
                        if (cookies.level_access == 1) fox_words_text.innerHTML = about_level[0];
                        else if (cookies.level_access == 2) fox_words_text.innerHTML = about_level[1];
                        else if (cookies.level_access == 3) fox_words_text.innerHTML = about_level[2];
                } else if (privet == 'about_hint') {
                    if (fox.hint == 9) fox_words_text.innerHTML = about_hint[0];
                    else if (fox.hint == 8) fox_words_text.innerHTML = about_hint[1];
                    else if (fox.hint == 7) fox_words_text.innerHTML = about_hint[2];
                    else if (fox.hint == 6) fox_words_text.innerHTML = about_hint[3];
                    else if (fox.hint == 5) fox_words_text.innerHTML = about_hint[4];
                    else if (fox.hint == 4) fox_words_text.innerHTML = about_hint[5];
                    else if (fox.hint == 3) fox_words_text.innerHTML = about_hint[6];
                    else if (fox.hint == 2) fox_words_text.innerHTML = about_hint[7];
                    else if (fox.hint == 1) fox_words_text.innerHTML = about_hint[8];
                    else if (fox.hint == 0) fox_words_text.innerHTML = about_hint[9];
                        // {
                        // if (cookies.level_access == 1) fox_words_text.innerHTML = about_level[0];
                        // else if (cookies.level_access == 2) fox_words_text.innerHTML = about_level[1];
                        // else if (cookies.level_access == 3) fox_words_text.innerHTML = about_level[2];
                        // }
                    else fox_words_text.innerHTML = about_hint[0];
                } 
                // else if (privet == 'hint' && fox.hint_words != '') fox_words_text.innerHTML = fox.hint_words;
                
                
                
                if (privet == "hint") {
                    var handler_speak_hint = setInterval(function() {
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
                } else {
                    fox_words.style.display = "block";
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
                }
                
                if (privet == "hint") {
                    setTimeout(function(){clearInterval(handler_speak_hint)},6000);
                    setTimeout(function(){
                        fox_words_text.innerHTML = "";
                        fox_words.style.display = 'none';
                        fox.speak_hint_flag = false;
                        // if (fox.ints_speak.length > 0) { // если есть очередь высказываний, говорим следующее слово
                        //     new Function(fox.ints_speak.shift())();
                        //     return;
                        // } else 
                        fox.speak=false; // если слов в очереди день то выключаем свойство говорит
                        fox.last_time = new Date().getTime();
                    },6000);
                } else if (privet == "about_level") { 
                    setTimeout(function(){clearInterval(handler_speak); fox.speak_about_level_flag = false},11000);
                    setTimeout(function(){
                        if (fox.hint == 9) fox_words_text.innerHTML = about_hint[0];
                    else if (fox.hint == 8) fox_words_text.innerHTML = about_hint[1];
                    else if (fox.hint == 7) fox_words_text.innerHTML = about_hint[2];
                    else if (fox.hint == 6) fox_words_text.innerHTML = about_hint[3];
                    else if (fox.hint == 5) fox_words_text.innerHTML = about_hint[4];
                    else if (fox.hint == 4) fox_words_text.innerHTML = about_hint[5];
                    else if (fox.hint == 3) fox_words_text.innerHTML = about_hint[6];
                    else if (fox.hint == 2) fox_words_text.innerHTML = about_hint[7];
                    else if (fox.hint == 1) fox_words_text.innerHTML = about_hint[8];
                    else if (fox.hint == 0) fox_words_text.innerHTML = about_hint[9];
                        // if (cookies.level_access == 1) fox_words_text.innerHTML = about_hint[0];
                        // else if (cookies.level_access == 2) fox_words_text.innerHTML = about_hint[1];
                        // else if (cookies.level_access == 3) fox_words_text.innerHTML = about_hint[2];
                        // fox_words_text.innerHTML = "";
                        // fox_words.style.display = 'none';
                        // fox.last_time = new Date().getTime();
                    },6000);
                    setTimeout(function(){
                        fox_words_text.innerHTML = "";
                        fox_words.style.display = 'none';
                        if (fox.ints_speak.length > 0) {// если есть очередь высказываний, говорим следующее слово
                            new Function(fox.ints_speak.shift())();
                            return;
                        } else fox.speak=false; // если слов в очереди день то выключаем свойство говорит
                        fox.last_time = new Date().getTime();
                        
                    },11000);
                } else {
                    setTimeout(function(){clearInterval(handler_speak)},3000);
                    setTimeout(function(){
                            if(fox.speak_hint_flag == true) return;
                            fox_words_text.innerHTML = "";
                            fox_words.style.display = 'none';
                            if (fox.ints_speak.length > 0) { // если есть очередь высказываний, говорим следующее слово
                                new Function(fox.ints_speak.shift())();
                                return;
                            } else fox.speak=false; // если слов в очереди день то выключаем свойство говорит
                            fox.last_time = new Date().getTime();
                        // }
                    },3000);
                }
                }, 3000, speak, new_old, hello_new, hello_old, last_time, privet);
        }
       
        this.watch ("last_time", function (id, oldval, newval) {    // Ставим прослушку на сеттер для времени последнего обновления ЛИСА
            
            setTimeout(function(){
                if(fox.speak_hint_flag == true) return;
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

    speak_key_multi: false,
    speak_multi: function () {
        if (this.speak == true){
             this.ints_speak.push("fox.speak_HELLO('multi')");
             console.log(fox.ints_speak);
        }else fox.speak_HELLO("multi");

        // if (fox.speak_about_level_flag == true) {
        //     var handler_multi = setInterval(function(){
        //         if (fox.speak_about_level_flag == false) {
        //             fox.speak_HELLO("multi");
        //             fox.speak = true;
        //             clearInterval(handler_multi);
        //         }
        //     },500)
        // } else if (fox.speak == true) {
        //         var handler_multi_1 = setInterval(function(){
        //             if (fox.speak == false) {
        //                 fox.speak_HELLO("multi");
        //                 fox.speak = true;
        //                 clearInterval(handler_multi_1);
        //             }
        //         },1000)
        // } else {
        // fox.speak = true;
        // this.speak_HELLO("multi");
        // }
    },

    speak_key_Qst: false,
    speak_about_Qst: function () {
        if (this.speak == true) this.ints_speak.push("fox.speak_HELLO('Qst')");
        else fox.speak_HELLO("Qst");

        // if (fox.speak_about_level_flag == true) {
        //     var handler_Qst = setInterval(function(){
        //         if (fox.speak_about_level_flag == false) {
        //             fox.speak_HELLO("Qst");
        //             fox.speak = true;
        //             clearInterval(handler_Qst);
        //         }
        //     },500)
        // // } else if (fox.speak == true) {
        // //     var handler_multi_1 = setInterval(function(){
        // //         if (fox.speak == false) {
        // //             fox.speak_HELLO("Qst");
        // //             fox.speak = true;
        // //             clearInterval(handler_multi_1);
        // //         }
        // //     },1000)
        // } else {
        // fox.speak = true;
        // this.speak_HELLO("Qst");
        // }
    },

    speak_hurry: function () {
        if (this.speak == true || this.speak_hint_flag == true) this.ints_speak.push("fox.speak_HELLO('toFast')");
        else fox.speak_HELLO("toFast");
    },

    speak_game_end: function () {
        if (this.speak == true) this.ints_speak.push("fox.speak_HELLO('game_end')");
        else fox.speak_HELLO("game_end");
        
    },

    speak_hint_flag: false,
    speak_hint: function () {
        this.ints_speak.length = 0;
        if (this.speak_hint_flag == true) return;
        this.speak_hint_flag = true;
        // this.ints_speak.length = 0;
        // var fox_img = document.getElementById("fox");
        // var fox_words = fox_img.nextElementSibling;
        // var fox_words_text = fox_img.nextElementSibling.firstElementChild;
        // fox_words_text.innerHTML = fox.hint_words;
        // fox_words.style.display = "block";

        this.speak_HELLO("hint");
    },

    speak_about_level_flag: false,
    speak_about_level: function () {
        this.speak_hint_flag = false;
        // if (fox.speak == true) {
        //     var handler_level = setInterval(function(){
        //         if (fox.speak == false) {
        //             fox.speak_HELLO("about_level");
        //             fox.speak_about_level_flag = true;
        //             clearInterval(handler_level);
        //         }
        //     },100)
        // } else {
        this.speak_about_level_flag = true;
        this.speak_HELLO("about_level");
        
        // }
    },

    hint_flag: 0,
    hint_words: "",
    hint: 3,
    speak_about_hint: function() {
        if(fox.speak == true) return;
        fox.speak_HELLO("about_hint");
    },

    time_answer: 0,
    time_answer_toFast:false, 

    fast_answer: function() {
       
        this.watch('time_answer', function (id, oldval, newval) {            
        if (oldval== 0) return newval;
        else {
            if((newval-oldval)<=5000) {
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
        var new_old = document.getElementById("fox-start");
        var fox_img = document.getElementById("fox");
        var fox_img_wakeUp = document.getElementsByClassName("fox-sleep");
        var fox_img_js = document.getElementsByClassName("fox-js");
        var fox_words = fox_img.nextElementSibling;
        var fox_words_text = fox_img.nextElementSibling.firstElementChild;
        var sleep = this.status_IMG.sleep;
        var wakeUp = this.status_IMG.wakeUp;
        var speak = this.status_IMG.speak;
        var hello_new = this.words.hello_new;
        var hello_old = this.words.hello_old[Math.floor(Math.random() * this.words.hello_old.length)];
        var hello_back = this.words.hello_back_mouse;
      
        fox_img.onclick=fox_img.ontouchend = function() {
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
                    fox_words_text.innerHTML = hello_back; 
                    fox_words.style.display = "block";
                    
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
                        fox_words_text.innerHTML = "";
                        fox_words.style.display = 'none';
                        fox.last_time = new Date().getTime();
                    },3000);
        
                }, 3000, speak, new_old, hello_new, hello_old, last_time);
               
                fox.watch ("last_time", function (id, oldval, newval) {    // Ставим прослушку на сеттер для времени последнего обновления ЛИСА
                    
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

