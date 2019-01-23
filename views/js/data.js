window.onload = init;
function init() {
var timeLoadPage = new Date();

document.onclick = function(e){
    var obj = e.target;
    var objClass = obj.getAttribute("class");
    console.log (objClass);
    // if (e.target.tagName!=='a') e.target.style.display = 'none';
}
};