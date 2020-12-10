const URL = "https://teachablemachine.withgoogle.com/models/7fE52w6Ip/";

let model, webcam, labelcontainer, maxPredictions;

const shapeElem = document.querySelector(".shapeName");
const shapesElem = document.querySelector(".shapes");
const questionElem = document.querySelector(".question");
const messagesElem = document.querySelector(".message");
const startBtn = document.querySelector(".start");
const restartBtn = document.querySelector(".restart");


const shapesListTemplate = Handlebars.compile(document.querySelector(".shapesListTemplate").innerHTML);

restartBtn.addEventListener("click", function () {

})