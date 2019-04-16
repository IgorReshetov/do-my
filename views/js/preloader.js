function preloader() {
    setTimeout( function (){
        var preloader = document.getElementById('id-preloader');
        preloader.classList.add('load_end');
    } ,1000); 
}