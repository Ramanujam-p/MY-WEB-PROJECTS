let playerScore = 0;
let computerScore = 0;
let gamesPlayed = 0;
function playGame(playerChoice) {
    let choices = ["rock", "paper", "scissor"];
    let randomIndex = Math.floor(Math.random() * choices.length);
    let computerChoice = choices[randomIndex];
    alert("Computer chose: " + computerChoice);
    if (playerChoice === computerChoice) {
        alert("It's a tie!");
    }
    else if (
        (playerChoice === "rock" && computerChoice === "scissor") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissor" && computerChoice === "paper")
    ) {
        playerScore++;
        alert("You win this round!");
    }
    else {
        computerScore++;
        alert("Computer wins this round!");
    }

    gamesPlayed++;

    document.getElementById("player-score").textContent = playerScore;
    document.getElementById("computer-score").textContent = computerScore;
    document.getElementById("games").textContent = "GAMES PLAYED: " + gamesPlayed;
}

function res() {
    playerScore = 0;
    computerScore = 0;
    gamesPlayed = 0;
    document.getElementById("player-score").textContent = 0;
    document.getElementById("computer-score").textContent = 0;
    document.getElementById("games").textContent = "GAMES PLAYED: 0";
}