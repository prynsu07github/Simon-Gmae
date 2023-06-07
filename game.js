let level = 0
let gameRunning = false
let boxColors = ["green", "red", "yellow", "blue"]
let userTurns = []
let computerTurns = []

$(document).keydown(function () {
    if (!gameRunning) {
        $("h1").text(`Level ${level}`)
        setTimeout(computerPlay, 200)
        gameRunning = true
    }
})

function computerPlay() {
    let randomNumber = Math.floor(Math.random() * 4)
    computerTurns.push(boxColors[randomNumber])
    playSound(boxColors[randomNumber])
    animation(boxColors[randomNumber])
}


$(".boxes").on("click", function () {
    if (gameRunning) {
        userTurns.push(this.id)
        playSound(this.id)
        animation(this.id)
        checkAnswers(userTurns.length - 1)
    }
})


function checkAnswers(currentLevel) {
    console.log(computerTurns)
    console.log(userTurns)
    if (userTurns[currentLevel] === computerTurns[currentLevel]) {
        if (userTurns.length === computerTurns.length) {
            userTurns = []
            currentLevel++
            $("h1").text(`Level ${currentLevel}`)
            setTimeout(computerPlay, 1000)
        }
    }
    else {
        var gameOverAudio = new Audio("./sounds/wrong.mp3")
        gameOverAudio.play()
        $("body").css("background-color", "red")
        setTimeout(restartGame, 500)
    }

}

function restartGame() {
    $("body").css("background-color", "rgb(84, 3, 84)")
    gameRunning = false
    level = 0
    computerTurns = []
    userTurns = []
    $("h1").text(`Game Over Press Any Key to Restart`)
}

function animation(boxId){
    $(`#${boxId}`).fadeOut(50).fadeIn(50)
}

function playSound(colourname) {
    var audio = new Audio(`./sounds/${colourname}.mp3`)
    audio.play()
}