window.onload = init;

function init() {
    var button1 = document.getElementById('pfd-load');
    button1.onclick = send_book;
}


function send_book(){
var mail_field = document.getElementById("pfd-load");
var book_data = parseInt(mail_field.getAttribute('book'));
       
var data = {
    book:book_data,
};

var data = JSON.stringify(data);

var xhr = new XMLHttpRequest();

xhr.open('POST', 'index.php?page=put_book', true);
xhr.setRequestHeader("Content-type", "application/json");
xhr.send(data);

xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) {
        return;
    }


var messages = JSON.parse(xhr.responseText);


}
}