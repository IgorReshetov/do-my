function preloader() {
    // setTimeout( function (){
        var preloader = document.getElementById('id-preloader');
        preloader.classList.add('load_end');
    // },1000); 
    setTimeout( function (){
    var preloader = document.getElementById('id-preloader');
    preloader.style.display = 'none';}, 1000);
}

function preloader_AJAX(xhr) {
    xhr.upload.onloadstart = function() {
        var preloader = document.getElementById('id-preloader');
        preloader.classList.remove('load_end');
        preloader.style.display = 'block';
    }    
    xhr.upload.onloadend = function() {
        preloader();
    }
}