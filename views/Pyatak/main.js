window.onload = init;
function init() {
var timeLoadPage = new Date();
timeNow();
updatetime();

// var obj = document.getElementById("sting");
// obj.onclick = boom;
document.onclick = boom;



function timeNow () {
    var clock = new Date().toTimeString().replace(/ .*/, '');
    var objClock = document.createElement("div");
    objClock.setAttribute("id","clock");
    document.getElementsByTagName("body")[0].appendChild(objClock);

};

function updatetime() {
    var clock = new Date().toTimeString().replace(/ .*/, '');
    var obj = document.getElementById('clock');
    obj.innerHTML=clock;
    window.setTimeout(arguments.callee,1000);
};

function boom(event) {
    console.log(event.target);
};




};