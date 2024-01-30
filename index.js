// SCREEN ELEMENTS
// Declare Game Menu element
const gameMenuElement = document.querySelector("#game-menu");

// Declare Game Board element
const gameBoardElement = document.querySelector("#game-board");
// GAME LOGIC
const gameBoardWidth = gameBoardElement.getBoundingClientRect().width;
const gameBoardHeight = gameBoardElement.getBoundingClientRect().height;

// Declare game variable and create UI element for Lives

const gameLivesElement = document.querySelector("#life-counter");

// Declare game variable and create UI element for Score
const gameScoreElement = document.querySelector("#score-counter");

// Create player entity


// Declare Game Over element
const gameOverElement = document.querySelector("#game-over");

// MAIN MENU LOGIC
// Start Button
const buttonGameStart = document.querySelector("#button-start");
buttonGameStart.onclick = () => {
    switchScreen(gameBoardElement);
    let game = new Game();
}

// GAME OVER LOGIC
// Restart Button
const buttonGameRestart = document.querySelector("#button-restart");
buttonGameRestart.onclick = () => { 
    switchScreen(gameBoardElement);
    game = new Game();
}

const buttonMainMenu = document.querySelector("#button-main-menu");
buttonMainMenu.onclick = () => { switchScreen(gameMenuElement); 
    console.log(gameMenuElement.style.visibility, gameBoardElement.style.visibility, gameOverElement.style.visibility) 
}

function switchScreen(screen) {
    gameMenuElement.style.visibility = "hidden";
    gameBoardElement.style.visibility = "hidden";
    gameOverElement.style.visibility = "hidden";
    screen.style.visibility = "visible";
}

// Declare game frame variable

// Enemy Spawning variables and logic
// Enemy spawn time variables
let enemySpawnFrame = 50;
const enemySpawnFrameMinimum = 50;

// Enemy spawn direction variables
//const enemySpawnDirectionChoices = ["left", "right", "up", "down"];
const enemySpawnDirections = ["left", "right", "up", "down"];
//enemySpawnDirections.push(enemySpawnDirectionChoices[0]);
//enemySpawnDirectionChoices.shift();



// Declare player directional velocity variables
let playerHorVelPos = 0;
let playerHorVelNeg = 0;
let playerVerVelPos = 0;
let playerVerVelNeg = 0;


function gameLoop() {
    //this.incrementFrames;
    game.frames++;
    game.spawnEnemies(enemySpawnDirections);
    player.move(
      playerHorVelPos,
      playerHorVelNeg,
      playerVerVelPos,
      playerVerVelNeg
    );
    player.invincibilityCountDown();
    gameEnemies.forEach((enemy) => {
      enemy.move();
      enemy.spawnPoop();
    });
    requestAnimationFrame(gameLoop);
  }