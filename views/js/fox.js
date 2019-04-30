'use strict'

var fox = {
    status_IMG: {sleep: "sleep", wakeUp: "wakeUp", speak: "speak", sniff: "sniff"},
    speak: false,
    words: {
        hello_new: "Добро пожаловать!",
        hello_old: ["Привет!", "С возвращением!" ],
        wakeUp: ["Вы еще здесь", "Может быть вам пора отдохнуть - промежуточные результаты игры сохраняются", "Мы ждем ваших действий"],
        help: ["Выберите вариант ответов", "Нажмите ответить", "Вариантов с ответами может быть несколько"],
        game_start: "Желаю удачи в игре!",
        level_end: ["Отличный результат!", "Попробуй еще раз", "Вы отличный знаток"],
        game_end: ["Вы дошли до конца, Вы молодец!", "Получи подарок - он ждет тебя на email"],
        email_enter: "Будьте внимательны при вводе емайл"
    },
    sleep: function() {
        
    },
    wakeUp: function() {
        
    },
    speak_HELLO: function() {
        var new_old = document.getElementsByClassName("start-h1");
        var fox_img = document.getElementsByClassName("fox");
        var fox_img_js = document.getElementsByClassName("fox-js");
        var fox_speeak = document.getElementsByClassName("fox-speak");
        var wakeUp = this.status_IMG.wakeUp;
        var speak = this.status_IMG.speak;
        var hello_new = this.words.hello_new;
        var hello_old = this.words.hello_old[Math.floor(Math.random() * this.words.hello_old.length)];
        console.log(hello_old);
        
        // switch (new_old.user) {
        //     case "new":
        // url("/do-my/views/images/icon/fox_wakeUp.svg") center center/cover 
                setTimeout(function() {
                    console.log(wakeUp);
                    fox_img[0].style.background = "url(views/images/icon/fox_" + wakeUp + ".svg) center center/cover no-repeat";
                    fox_img[0].classList.add('fox-js');
                    fox_img[0].classList.remove('fox');
                }, 2000, wakeUp);
                setTimeout(function() {
                    console.log(speak);
                    fox_img_js[0].style.background = "url(views/images/icon/fox_" + speak + ".svg) center center/cover no-repeat";
                    console.log((new_old[0].attributes.user.nodeValue == "old"));
                    fox_speeak[0].innerHTML = (new_old[0].attributes.user.nodeValue == 'new') ? hello_new : hello_old;
                    fox_speeak[0].style.display = 'block';
                    setTimeout(function(){fox_speeak[0].innerHTML = "";},3000);
                }, 3000, speak, new_old, hello_new, hello_old);
        //     break;
        //     case "old":
        //         setTimeout(function() {
        //             fox_img[0].style.background = "URL(do-my/views/images/icon/fox_" + this.status_IMG.wakeUp + ".svg";
        //         }, 3000);
        //         setTimeout(function() {
        //             fox_img[0].style.background = "URL(do-my/views/images/icon/fox_" + this.status_IMG.speak + ".svg";
        //             fox_speeak[0].innerHTML = this.hello_old;
        //             fox_speeak[0].style.display = 'block';

        //         }, 4000);
        //     break;
        // }
    },

}