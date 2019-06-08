// _______________________________ S С R O L L (Плавная прокурутка страницы)______________________________________)

var handl_scroll_down,
    handl_scroll_el,                                                        // ссылка на сетинтервал для выключения скролла
    top_scroll_Y = 0,
    body = document.body,   
    html = document.documentElement,
    pageH_Y = Math.max( body.scrollHeight, body.offsetHeight, 
                html.clientHeight, html.scrollHeight, html.offsetHeight ),
    client_h_Y = document.documentElement.clientHeight,
    dist_scroll_check = 0,      // Растояние от верха окна до элемента
    dist_scroll = 0,                                                      
    scroll_top = 0,
    scroll_begin = false,
    step_scroll = 5;

function scroll_to_downPage() {
    top_scroll_Y += 5;
    if (top_scroll_Y > (pageH_Y - client_h_Y)) {
        clearInterval(handl_scroll_down);
    }
    scrollTo(0,top_scroll_Y);     
    // return false; 
}

function scroll_to_element(el) {
    if (scroll_begin) {
        if (dist_scroll_check>0) {
            scroll_top = window.pageYOffset || document.documentElement.scrollTop;
            if (dist_scroll <=0 || (scroll_top+step_scroll) > (pageH_Y - client_h_Y)) {
                clearInterval(handl_scroll_el);
                scroll_begin = false;
                console.log(dist_scroll);
                return false;
            }
            dist_scroll -= step_scroll;
            top_scroll_Y = scroll_top + step_scroll;
            scrollTo(0,top_scroll_Y);
        }
        else if (dist_scroll_check<0) {
            scroll_top = window.pageYOffset || document.documentElement.scrollTop;
            if (dist_scroll >= 0 || scroll_top==0) {
                clearInterval(handl_scroll_el);
                scroll_begin = false;
                console.log(dist_scroll);
                return false;
            }
            dist_scroll -= step_scroll;
            top_scroll_Y = scroll_top + step_scroll;
            scrollTo(0,top_scroll_Y);
        } else {
            clearInterval(handl_scroll_el);
            scroll_begin = false;
            return false;
        }

    } else {
        dist_scroll = dist_scroll_check = el.getBoundingClientRect().top + el.clientHeight/2 - window.innerHeight/2;
        scroll_top = window.pageYOffset || document.documentElement.scrollTop;
            if (dist_scroll>0) step_scroll = 5;
            else if (dist_scroll == 0) step_scroll = 0;
            else step_scroll = -5;
        pageH_Y = Math.max( body.scrollHeight, body.offsetHeight, 
                        html.clientHeight, html.scrollHeight, html.offsetHeight ),
        client_h_Y = document.documentElement.clientHeight;
        scroll_begin = true;
    }
    
}

// функция определения расстояния от верха до центра элемента
function offset(el) {
    var rect = el.getBoundingClientRect().top + el.clientHeight + document.documentElement.clientHeight/2;
    // console.log(rect);
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var top = rect + scrollTop - document.documentElement.clientHeight;
    
    return top;
}
