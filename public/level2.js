// the link to your model provided by Teachable Machine export panel

let model, webcam, labelContainer, maxPredictions;


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

}

const shapes = ["Circle", "Triangle", "Star", "Square", "Kite"];

function toggleVisibility() {
    if (shapeCount < shapes.length) {
        const message = "Show me a " + shapes[shapeCount]
        shapeCount++;
        let d = audio(message)
        return message;
    }
    audio("You already saw all the shapes")
    return "You already saw all the shapes";
}

function correct() {
    if (shapes) {
        const message = "Correct, this is a" + shapes;
        let z = audio(message)
        return message;
    }
}

function error() {
    if (!shapes) {
        const message = "Incorrect, this is not a" + shapes;
        let b = audio(message)
        return message;
    }
}

const question = document.querySelector(".question");

const btn = document.querySelector(".btn");

const restartBtn = document.querySelector(".btnRestart");

btn.addEventListener("click", function () {
    shapeCount = 0;
    question.innerHTML = showShape();
});


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
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}