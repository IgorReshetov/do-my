

function menu() {

    console.log (flag);
         
    document.onclick = menu_moov;

    var mail_field = document.getElementById("menu-mail");
    mail_field.onclick = show_get_menu;
    mail_field.oninput = show_get_menu;

    var mail_button = document.getElementById("promo-button-get");
    mail_button.onclick = send_mail_menu;


};


function menu_moov(e) {
    
    console.log (e.target.getAttribute('class'));
    if (e.target.getAttribute('class') == "menu-btn-box" && flag == 0){

          
        document.getElementsByClassName('menu-wraper')[0].classList.add("menu-wraper-moov");
        document.getElementsByClassName('menu-wraper')[0].classList.remove("menu-wraper-back");
        
        flag = 1;

        document.getElementById('menu-btn').classList.add('menu-btn-open');
        document.getElementById('menu-btn-bot').classList.add('menu-btn-bot-open');
        document.getElementById('menu-btn-top').classList.add('menu-btn-top-open');

        return;
    }

    if (e.target.getAttribute('id') == "getpromo" && flag == 1){
    
        document.getElementsByClassName('menu-wraper')[0].classList.remove("menu-wraper-moov");
        document.getElementsByClassName('menu-wraper')[0].classList.add("menu-wraper-back");
        
        document.getElementsByClassName('menu-wraper-promo')[0].classList.add("menu-wraper-promo-moov");
        document.getElementsByClassName('menu-wraper-promo')[0].classList.remove("menu-wraper-promo-back");
        
        flag = 11;
        return;
    }


    if (e.target.getAttribute('class') != "hiden-menu-user-getpromo" && flag == 1){
    
        document.getElementsByClassName('menu-wraper')[0].classList.remove("menu-wraper-moov");
        document.getElementsByClassName('menu-wraper')[0].classList.add("menu-wraper-back");
        
        flag = 0;
        document.getElementById('menu-btn').classList.remove('menu-btn-open');
        document.getElementById('menu-btn-bot').classList.remove('menu-btn-bot-open');
        document.getElementById('menu-btn-top').classList.remove('menu-btn-top-open');
        return;
    }

    

    if (e.target.getAttribute('class') != "hiden-menu-user-promo-block" && flag == 11){
    
        document.getElementsByClassName('menu-wraper-promo')[0].classList.remove("menu-wraper-promo-moov");
        document.getElementsByClassName('menu-wraper-promo')[0].classList.add("menu-wraper-promo-back");
        flag = 0;
        document.getElementById('menu-btn').classList.remove('menu-btn-open');
        document.getElementById('menu-btn-bot').classList.remove('menu-btn-bot-open');
        document.getElementById('menu-btn-top').classList.remove('menu-btn-top-open');
        return;
    }
    
}


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

    preloader_AJAX(xhr);


    xhr.open('POST', 'index.php?page=put_mail_short', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(data);
  
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) {
            return;
        }
    
    
    var messages = JSON.parse(xhr.responseText);

       
      
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
    }
}
