
var handl_scroll_top; 
function scrolltop() {
    var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
        if(top>0) { 
            window.scrollTo(0,Math.floor(top/1.5));
            handl_scroll_top = setTimeout("scrolltop()",30);
        } else { clearTimeout(handl_scroll_top); }
    return false; 
}

var handl_scroll_el
function scroll_to_element(el) {
    var top = offset(el);
        if(top !== 0) { 
            window.scrollTo(0,Math.floor(top/1.5));
            handl_scroll_el = setTimeout("scroll_to_element()",30);
        } else { clearTimeout(handl_scroll_el); }
    return false; 
}

function offset(el) {
    var rect = el.getBoundingClientRect().top + el.clientHeight/2 + document.documentElement.clientHeight/2;
    // console.log(rect);
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var top = rect + scrollTop - document.documentElement.clientHeight;
    
    return top;
}






// elements - упродядоченный массив с объектами элементов DOM, между которыми планируется скролинг
// time_scroll - упорядоченный массив со временем скрола между элементами

// КОНСТРУКТОР многопозиционного скрола
function Scroll_objs(elements, time_scroll ) {
    this.elements = elements;
    this.time_scroll = time_scroll;
}



// var scroll_slow = {
//     target_Y: 0,
//     centrWindow_Y: 0,
//     get_coord: function() {
//         var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//         this.target_Y = O('button').getBoundingClientRect().top + scrollTop;   // координата Y кнопика относительно верха страницы
//         this.centrWindow_Y = scrollTop + document.documentElement.clientHeight/2; // координата Y центра окна относительно верха страницы
//     },
//     move_to: function(){
//         var handler_scroll = setInterval(,500)
//     },
//     anime_scroll: function(){
//         this.
//     }

// }