'use strict'

var fox = {
    status_IMG: {sleep: "sleep", wakeUp: "wakeUp", speak: "speak", sniff: "sniff"},
    speak: false,
    last_time: 0,
    words: {
        hello_new: "Привет, давай дружить!",
        hello_old: ["Привет! Я скучал)", "С возвращением!" ],
        hello_back_mouse: "фр..фр..Давай играть!",
        long_no_action: "Эгей, Эгегей, давай, давай",
        email_enter: "Будь внимателен!",
        toFast: "Не спеши!",
        after_Qst: ["Это мой любимый", "Это самый любимый", "Это мой самый самый любимый", "Рр.. будь осторожен", "Фр..фр.. ничего себе"],
        // __________Резерв___________
        wakeUp: ["Вы еще здесь", "Может быть вам пора отдохнуть - промежуточные результаты игры сохраняются", "Мы ждем ваших действий"],
        help: ["Выберите вариант ответов", "Нажмите ответить", "Вариантов с ответами может быть несколько"],
        game_start: "Желаю удачи в игре!",
        level_end: ["Отличный результат!", "Попробуй еще раз", "Вы отличный знаток"],
        game_end: ["Вы дошли до конца, Вы молодец!", "Получи подарок - он ждет тебя на email"],
        
    },
   
    speak_HELLO: function() {
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
        console.log(hello_old);
        // this.watch("last_time", function (LT, oldval, newval) {
        //     console.log(newval);
        // });

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
                fox_img[0].style.background = "url(views/images/icon/fox_" + wakeUp + ".svg) center/110% border-box no-repeat";
                last_time = new Date();
                
            },3000);
        }, 3000, speak, new_old, hello_new, hello_old, last_time);
        console.log(last_time);
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
        
    },
}