

function menu() {
    
    var mail_field = document.getElementById("menu-mail");
    mail_field.onclick = show_get_menu;
    mail_field.oninput = show_get_menu;

    var menu_button = document.getElementById("menu-btn-box-main");
    menu_button.onclick = function () {
        if (flag == 0){
               
            document.getElementById('menu-wraper').classList.add("menu-wraper-moov");
            // document.getElementById('menu-wraper').classList.remove("menu-wraper-back");
            
            document.getElementById('menu-btn').classList.add('menu-btn-open');
            document.getElementById('menu-btn-bot').classList.add('menu-btn-bot-open');
            document.getElementById('menu-btn-top').classList.add('menu-btn-top-open');
    
            flag = 1;
            return;
        }

        if (flag == 1){
    
        document.getElementById('menu-wraper').classList.remove("menu-wraper-moov");
        // document.getElementById('menu-wraper').classList.add("menu-wraper-back");
        
        
        document.getElementById('menu-btn').classList.remove('menu-btn-open');
        document.getElementById('menu-btn-bot').classList.remove('menu-btn-bot-open');
        document.getElementById('menu-btn-top').classList.remove('menu-btn-top-open');
        
        flag = 0;
        return;
        }

        if (flag == 11){
    
            document.getElementsByClassName('menu-wraper-promo')[0].classList.remove("menu-wraper-promo-moov");
            
            
            document.getElementById('menu-btn').classList.remove('menu-btn-open');
            document.getElementById('menu-btn-bot').classList.remove('menu-btn-bot-open');
            document.getElementById('menu-btn-top').classList.remove('menu-btn-top-open');
            
            flag = 0;
            return;
        }
        
    }

    var menu_button = document.getElementById("getpromo");
    menu_button.onclick = function () {
        if (flag == 1){
    
            document.getElementById('menu-wraper').classList.remove("menu-wraper-moov");
            
            
            document.getElementById('menu-wraper-promo').classList.add("menu-wraper-promo-moov");
            
            
            flag = 11;
            return;
        }
    }


    var mail_button = document.getElementById("promo-button-get");
    mail_button.onclick = send_mail_menu;


};


// function menu_moov(e) {
//     // var flag = 0;
//     // if (document.getElementById('menu-wraper').classList.contains('menu-wraper-moov')){flag = 1;}
//     // if (document.getElementById('menu-wraper-promo').classList.contains('menu-wraper-promo-moov')){flag = 11;}
    
//     console.log (e.target.getAttribute('class'));
//     console.log (flag);
//     if (e.target.getAttribute('class') == "menu-btn-box" && flag == 0){
               
//         document.getElementById('menu-wraper').classList.add("menu-wraper-moov");
//         document.getElementById('menu-wraper').classList.remove("menu-wraper-back");
        
//         document.getElementById('menu-btn').classList.add('menu-btn-open');
//         document.getElementById('menu-btn-bot').classList.add('menu-btn-bot-open');
//         document.getElementById('menu-btn-top').classList.add('menu-btn-top-open');

//         flag = 1;
//         return;
//     }

//     if (e.target.getAttribute('id') == "getpromo" && flag == 1){
    
//         document.getElementById('menu-wraper').classList.remove("menu-wraper-moov");
//         document.getElementById('menu-wraper').classList.add("menu-wraper-back");
        
//         document.getElementById('menu-wraper-promo').classList.add("menu-wraper-promo-moov");
//         document.getElementById('menu-wraper-promo').classList.remove("menu-wraper-promo-back");
        
//         flag = 11;
//         return;
//     }


//     if ((e.target.getAttribute('class') == "menu-btn-box menu-btn-open"||e.target.getAttribute('class') == "menu-btn-box"||e.target.getAttribute('class') == "menu-btn-box menu-btn-top-open"||e.target.getAttribute('class') == "menu-btn-box menu-btn-bot-open") && flag == 1){
    
//         document.getElementById('menu-wraper').classList.remove("menu-wraper-moov");
//         document.getElementById('menu-wraper').classList.add("menu-wraper-back");
        
        
//         document.getElementById('menu-btn').classList.remove('menu-btn-open');
//         document.getElementById('menu-btn-bot').classList.remove('menu-btn-bot-open');
//         document.getElementById('menu-btn-top').classList.remove('menu-btn-top-open');
        
//         flag = 0;
//         return;
//     }

    

//     if (e.target.getAttribute('class') == "menu-btn-box" && flag == 11){
    
//         document.getElementsByClassName('menu-wraper-promo')[0].classList.remove("menu-wraper-promo-moov");
//         document.getElementsByClassName('menu-wraper-promo')[0].classList.add("menu-wraper-promo-back");
        
//         document.getElementById('menu-btn').classList.remove('menu-btn-open');
//         document.getElementById('menu-btn-bot').classList.remove('menu-btn-bot-open');
//         document.getElementById('menu-btn-top').classList.remove('menu-btn-top-open');
        
//         flag = 0;
//         return;
//     }

// }


function show_get_menu () {
    
    var mail_field = document.getElementById("menu-mail");
    var mail_button = document.getElementById("promo-button-get");
    var mail = mail_field.value;
    var result = mail.length;
    var result1 = mail.indexOf("@");
    var result2 = mail.indexOf(".");
    
    // проверка правильности мэйла
    if (result > 8 && result-result1 > 4 && result-result2 >2 && result1 > 2 && result2 > 0) {
        var text_result = document.getElementsByClassName('hiden-menu-user-promo-block');
        text_result[2].innerHTML = '';
        mail_button.style.display = 'block';
    }
    else {mail_button.style.display = 'none';}
}


function send_mail_menu() {
    var mail_field = document.getElementById("menu-mail");
    var mail_data = mail_field.value;
           
    var data = {
        mail:mail_data,
    };

    var data = JSON.stringify(data);

    var xhr = new XMLHttpRequest();

    preloader_start();


    xhr.open('POST', 'index.php?page=put_mail_short', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(data);
  
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) {
            return;
        }
    
        console.log (xhr.responseText);
        var messages = JSON.parse(xhr.responseText);

        console.log (messages);
        
        
        if (messages == 1) {
            var mail_button = document.getElementById("promo-button-get");
            mail_button.style.display = 'none';
            var text_result = document.getElementsByClassName('hiden-menu-user-promo-block');
            document.getElementsByClassName('hiden-menu-input-wraper')[0].style.display = 'none';
            document.getElementsByClassName('hiden-menu-user-promo-block')[0].style.display = 'none';
            text_result[2].innerHTML = 'Информация с промокодом по '+messages+' квизу направлена вам на email';
            
        }
        else if (messages > 1){
            var mail_button = document.getElementById("promo-button-get");
            mail_button.style.display = 'none';
            var text_result = document.getElementsByClassName('hiden-menu-user-promo-block');
            document.getElementsByClassName('hiden-menu-input-wraper')[0].style.display = 'none';
            document.getElementsByClassName('hiden-menu-user-promo-block')[0].style.display = 'none';
            text_result[2].innerHTML = 'Информация с промокодами по '+messages+' квизам направлена вам на email';
        }else{
            var text_not_result = document.getElementsByClassName('hiden-menu-user-promo-block');
            text_not_result[0].innerHTML = 'По указанному email нет пройденных квизов.<br>Уточните ваш email:';
            document.getElementById("menu-mail").value = '';
        }

        preloader();
    }
}
