const URL = "https://teachablemachine.withgoogle.com/models/7fE52w6Ip/";

let model, webcam, labelcontainer, maxPredictions;

const shapeElem = document.querySelector(".shapeName");
const shapesElem = document.querySelector(".shapes");
const questionElem = document.querySelector(".question");
const messagesElem = document.querySelector(".message");


function audio(message) {
    let utter = new SpeechSynthesisUtterance();
    utter.lang = 'en-US';
    utter.text = message
    utter.volume = 5;
    window.speechSynthesis.speak(utter);
    return utter;

}

const shapes = ["Circle", "Triangle", "Star", "Square", "Kite"];
let shapeCount = 0;
let currentShape = "";

function nextShape() {
    if (shapeCount < shapes.length) {

        currentShape = shapes[shapeCount];
        const message = "Show me a " + currentShape
        shapeCount++;
        let d = audio(message)
        return message;
    }

    
    const message = "Well done! You know your shapes." 
    audio(message)
    bell.play();

    currentShape = "";

    return message;
}

function toggleVisibility(elem) {
    elem.classList.toggle("hidden");
}

function correct() {
    const message = "Correct, this is a" + currentShape;
    let z = audio(message)
    return message;
}

function error(shape) {
    let message = "Incorrect, this is not a" + currentShape;

    // if (shape) {
    //     message += "That is a " + shape
    // }

    let b = audio(message)
    return message;
    
}

const question = document.querySelector(".question");

const restartBtn = document.querySelector(".btnRestart");
const startBtn = document.querySelector(".startBtn");

// btn.addEventListener("click", function () {
//     shapeCount = 0;
//     question.innerHTML = showShape();
// });


restartBtn.addEventListener("click", function () {
    
    audio("Oh! Do you want to restart?").onend = function() {
        if (confirm("Restart?")) {
            audio("Eish! Let's restart then").onend = function() {
                shapeCount = 0;
                nextShape();
            }
        }
    }
    
});



const bell = new Audio("/audio/cheering.mp3");

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }

    toggleVisibility(restartBtn);
    toggleVisibility(startBtn);

    nextShape();
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

const speakAboutShapeSeen = _.throttle(function (modelShapeName) {
    if (currentShape === modelShapeName) {
        correct();
        modelShapeName = "";
        nextShape();

    } else {
        error(modelShapeName);
        modelShapeName = "";
    }
}, 5000)

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);

    if (currentShape == "") {
        return;
    }

    let highestProb = 0;
    let modelShapeName = "";

    prediction.forEach(function(pred){
        if (pred.probability > highestProb) {
            highestProb = pred.probability;
            modelShapeName = pred.className;
        }
    });

    if (highestProb < 0.95){
        return;
    }

    speakAboutShapeSeen(modelShapeName);
    

    // for (let i = 0; i < maxPredictions; i++) {
    //     const classPrediction =
    //         prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    //     labelContainer.childNodes[i].innerHTML = classPrediction;
    // }

    // document.getElementById("webcam-container").innerHTML = "";
    // document.getElementById("webcam-container").appendChild(webcam.canvas);

    
}








