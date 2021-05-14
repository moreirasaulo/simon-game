let userClickedPattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let level = 0;

let sequenceCount = -1; // Game count

let index = -1; // User clicks' count, will start from 0

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4); // Will generate random numbers between 0 and 3

    let randomChosenColour = buttonColours[randomNumber]; // Will pick a previously generated number (0-3) and select the corresponding colour from the buttonColours array. It'll be stored in new variable randomChosenColour

    gamePattern.push(randomChosenColour); // Pushes the new randomChosenColour (may be yellow, red, blue or green) to the gamePattern array.

    playSound(randomChosenColour); // Calls the function that plays the corresponding sound for each colour.

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // Creates the fade effect for the chosen colour.

    levelCounter(level); // Will modify the h1 according to the current level.
    level++;

    sequenceCount++;

    // This will restart the user's pattern each time this method is called
    index = -1;
    userClickedPattern = [];
}

// These listeners will push the clicked colour to the userClickedPattern array and play the corresponding sound.
$("#green").click(function (event) {
    let userChosenColour = "green";
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    index++;
    if (sequenceCount == index) {
        checkAnswer(index);
    }
    else {
        checkSequence();
    }
})
$("#yellow").click(function (event) {
    let userChosenColour = "yellow";
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    index++;
    if (sequenceCount == index) {
        checkAnswer(index);
    }
    else {
        checkSequence();
    }
})
$("#blue").click(function (event) {
    let userChosenColour = "blue";
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    index++;
    if (sequenceCount == index) {
        checkAnswer(index);
    }
    else {
        checkSequence();
    }
})
$("#red").click(function (event) {
    let userChosenColour = "red";
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    index++;
    if (sequenceCount == index) {
        checkAnswer(index);
    }
    else {
        checkSequence();
    }
})

// Function to play the sound according to the colour input.
function playSound(name) {
    let audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

// Function to create animation when a button is pressed.
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Listener to detect when a keyboard key has been pressed to start the game. It should be called just one time.
let started = 0;
$(document).keypress(function (event) {
    if (started === 0) {
        nextSequence();
        started++;
    }
})

function levelCounter(level) {
    $("h1").text("Level " + level);
}

function checkAnswer(currentLevel) {
    // Will check if both arrays are equal
    if (JSON.stringify(userClickedPattern) == JSON.stringify(gamePattern)) {
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
    else {
        gameOver();
        console.log("User pattern: " + userClickedPattern);
        console.log("Game pattern: " + gamePattern);
    }
}

function gameOver() {
    let audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over!<br><h6>Press any key to restart</h6>");
    startOver();
}

// To restart the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = 0;
    sequenceCount = -1;
    index = -1;
}

function checkSequence() {
    let position = userClickedPattern.length - 1;
    if (JSON.stringify(userClickedPattern[position]) != JSON.stringify(gamePattern[position])) {
        gameOver();
    }
}