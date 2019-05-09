function preloader_start() {
    var preloader = document.getElementById('id-preloader');
    preloader.className = "preloader";
    preloader.style.display = 'block';
   }

function preloader() {
    var preloader = document.getElementById('id-preloader');
    preloader.classList.add('load_end');
    preloader.style.display = 'none';  
}

function preloader_AJAX(xhr) {
    xhr.upload.onloadstart = function() {
        var preloader = document.getElementById('id-preloader');
        preloader.className = "preloader";
        preloader.style.display = 'block';
    }    
    xhr.upload.onloadend = function() {
        preloader();
    }
}