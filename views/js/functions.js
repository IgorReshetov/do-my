function onclick_flowQuestion(e){
    var obj = e.target;
    var objClass = obj.getAttribute("class");
    if (objClass == "start-h2") {
        document.getElementsByClassName("start-h2")[0].style.display = "none";
        document.getElementsByClassName("start-o-proecte")[0].style.display = "none";
        document.getElementsByClassName("start-ozenka")[0].style.display = "block";
        setTimeout(function () {document.querySelector(".start-qustions-1").style.display="block"},400);
    }
    console.log (objClass);
};






 // if (e.target.tagName!=='a') e.target.style.display = 'none';
// var item = document.querySelector("#theItem");

// function swap () {
//     var firstDiv = document.querySelector("p.Ievel5")
// };


// function name(arg1, arg2) {
//     var result;
//     if () {

//     } else {

//     }
    
//     return result;
// }
