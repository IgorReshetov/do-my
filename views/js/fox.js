'use strict'

var fox = {
    status_IMG: {sleep: "sleep", wakeUp: "wakeUp", speak: "speak", sniff: "sniff"},
    speak: false,
    last_time: 0,
    words: {
        hello_new: "Привет, давай дружить!",
        hello_old: ["Привет! Я скучал)", "Привет! С возвращением!" ],
        hello_back_mouse: "фр..фр..Давай играть!",
        long_no_action: "Эгей, Эгегей, давай, давай",
        email_enter: "Будь внимателен!",
        toFast: "Не спеши!",
        after_Qst: ["Это мой любимый", "Это самый любимый", "Интересный", "Рр.. будь осторожен", "Фр..фр.. ничего себе"],
        // __________Резерв___________
        // wakeUp: ["Вы еще здесь", "Может быть вам пора отдохнуть - промежуточные результаты игры сохраняются", "Мы ждем ваших действий"],
        help: ["Выбери вариант ответов", "Нажми ответить", "Будь внимателен"],
        // game_start: "Желаю удачи в игре!",
        // level_end: ["Отличный результат!", "Попробуй еще раз", "Ты отличный знаток"],
        game_end: ["Mолодец!", "Крутяшно", "Я в тебя верил"],
        
    },
   
    speak_HELLO: function() {
        var last_time = this.last_time;
        var new_old = document.getElementsByClassName("start-h1");
        var fox_img = document.getElementsByClassName("fox");
        var fox_img_js = document.getElementsByClassName("fox-js");
        var fox_speak = document.getElementsByClassName("fox-speak");
        var sleep = this.status_IMG.sleep;
        var wakeUp = this.status_IMG.wakeUp;
        var speak = this.status_IMG.speak;
        var hello_new = this.words.hello_new;
        var hello_old = this.words.hello_old[Math.floor(Math.random() * this.words.hello_old.length)];
        var hello_back = this.words.hello_back_mouse;
        console.log(hello_old);
        
        setTimeout(function() {
            console.log(wakeUp);
            fox_img[0].style.background = "url(views/images/icon/fox_" + wakeUp + ".svg) center/110% border-box no-repeat";
            fox_img[0].classList.add('fox-js');
            fox_img[0].classList.remove('fox');
        }, 2000, wakeUp);

        setTimeout(function() {
            console.log(speak);
            fox_img_js[0].style.background = "url(views/images/icon/fox_" + speak + ".svg) center/63% border-box no-repeat";
            console.log((new_old[0].attributes.user.nodeValue == "old"));
            fox_speak[0].innerHTML = (new_old[0].attributes.user.nodeValue == 'new') ? hello_new : hello_old;
            if (new_old[0].attributes.user.nodeValue == 'back') fox_speak[0].innerHTML = hello_back; 
            fox_speak[0].style.display = 'block';
            setTimeout(function(){
                fox_speak[0].innerHTML = "";
                fox.last_time = new Date().getTime();
                // console.log(fox.last_time);
            },3000);
        }, 3000, speak, new_old, hello_new, hello_old, last_time);
       
        this.watch ("last_time", function (id, oldval, newval) {    // Ставим прослушку на сеттер для времени последнего обновления ЛИСА
            console.log(oldval);
            console.log(newval);
            console.log(id);
            setTimeout(function(){
                fox_img_js[0].style.background = "url(views/images/icon/fox_" + sleep + ".svg) center/100% border-box no-repeat";
                fox_img_js[0].classList.add('fox');
                fox_img_js[0].classList.remove('fox-js');
            }, 5000)
        });
    },

    sleep: function() {
        var last_time = this.last_time;
        var new_old = document.getElementsByClassName("start-h1");
        var fox_img = document.getElementsByClassName("fox");
        var fox_img_js = document.getElementsByClassName("fox-js");
        var fox_speak = document.getElementsByClassName("fox-speak");
        var wakeUp = this.status_IMG.wakeUp;
        var speak = this.status_IMG.speak;
        var hello_new = this.words.hello_new;
        var hello_old = this.words.hello_old[Math.floor(Math.random() * this.words.hello_old.length)];
        var hello_back = this.words.hello_back_mouse;
    },

    wakeUp_mouse: function() {
        var last_time = this.last_time;
        var new_old = document.getElementsByClassName("start-h1");
        var fox_img = document.getElementsByClassName("fox");
        var fox_img_js = document.getElementsByClassName("fox-js");
        var fox_speak = document.getElementsByClassName("fox-speak");
        var sleep = this.status_IMG.sleep;
        var wakeUp = this.status_IMG.wakeUp;
        var speak = this.status_IMG.speak;
        var hello_new = this.words.hello_new;
        var hello_old = this.words.hello_old[Math.floor(Math.random() * this.words.hello_old.length)];
        var hello_back = this.words.hello_back_mouse;
        
        fox_img[0].onclick = function() {
            fox_img[0].style.background = "url(views/images/icon/fox_" + wakeUp + ".svg) center/110% border-box no-repeat";
            fox_img[0].classList.add('fox-js');
            fox_img[0].classList.remove('fox');
            setTimeout(function() {
                fox_img_js[0].style.background = "url(views/images/icon/fox_" + speak + ".svg) center/63% border-box no-repeat";
                fox_speak[0].innerHTML = hello_back; 
                fox_speak[0].style.display = 'block';
                setTimeout(function(){
                    fox_speak[0].innerHTML = "";
                    fox.last_time = new Date().getTime();
                    // console.log(fox.last_time);
                },2000);
            }, 1000, speak, new_old, hello_new, hello_old, last_time);
        
            this.watch ("last_time", function (id, oldval, newval) {    // Ставим прослушку на сеттер для времени последнего обновления ЛИСА
                console.log(oldval);
                console.log(newval);
                console.log(id);
                setTimeout(function(){
                    fox_img_js[0].style.background = "url(views/images/icon/fox_" + sleep + ".svg) center/100% border-box no-repeat";
                    fox_img_js[0].classList.add('fox');
                    fox_img_js[0].classList.remove('fox-js');
                }, 3000)
            });
        }
    },

    enter_leave_mouse: function() {
        var sleep = this.status_IMG.sleep;
        var sniff = this.status_IMG.sniff;
        var fox_img = document.getElementsByClassName("fox");
        fox_img[0].onmouseenter = function () {
            fox_img[0].style.background = "url(views/images/icon/fox_" + sniff + ".svg) center/78% border-box no-repeat";
        };
        fox_img[0].onmouseleave = function () {
            fox_img[0].style.background = "url(views/images/icon/fox_" + sleep + ".svg) center/100% border-box no-repeat";
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

/*
var no_active_delay = 30; // Количество секунд простоя мыши, при котором пользователь считается неактивным
  var now_no_active = 0; // Текущее количество секунд простоя мыши
  setInterval("now_no_active++;", 1000); // Каждую секунду увеличиваем количество секунд простоя мыши
  setInterval("updateChat()", 1000); // Запускаем функцию updateChat() через определённый интервал
  document.onmousemove = activeUser; // Ставим обработчик на движение курсора мыши
  function activeUser() {
    now_no_active = 0; // Обнуляем счётчик простоя секунд
  }
  function updateChat() {
    if (now_no_active >= no_active_delay) { // Проверяем не превышен ли "предел активности" пользователя
      alert("Пользователь не активен"); // В реальности стоит убрать, а здесь дано как доказательство того, что всё работает
      return;
    } */