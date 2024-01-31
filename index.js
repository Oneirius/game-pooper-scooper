// SCREEN ELEMENTS
// Declare game variable
let game;

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



// Declare Game Over element
const gameOverElement = document.querySelector("#game-over");

// MAIN MENU LOGIC
// Start Button
const buttonGameStart = document.querySelector("#button-start");
buttonGameStart.onclick = () => {
    switchScreen(gameBoardElement);
    game = new Game();
    initializeGame();
}

// GAME OVER LOGIC
// Restart Button
const buttonGameRestart = document.querySelector("#button-restart");
buttonGameRestart.onclick = () => { 
    switchScreen(gameBoardElement);
    game = new Game();
    initializeGame();
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

// Enemy spawn direction variables
const allSpawnDirections = ["left", "right", "up", "down"];
let enemySpawnDirectionChoices = [];

// Declare player directional velocity variables
let playerHorVelPos = 0;
let playerHorVelNeg = 0;
let playerVerVelPos = 0;
let playerVerVelNeg = 0;


function gameLoop() {
  if (gameBoardElement.style.visibility === 'visible') {
    game.frames++;
    game.spawnEnemies();
    game.addSpawnDirection();
    game.player.move(
      playerHorVelPos,
      playerHorVelNeg,
      playerVerVelPos,
      playerVerVelNeg
    );
    game.player.invincibilityCountDown();
    game.enemies.forEach((enemy) => {
      enemy.move();
      enemy.spawnPoop();
    });
    requestAnimationFrame(gameLoop);
  }
}

function randomizeSpawnDirectionOrder() {
  enemySpawnDirectionChoices = [...allSpawnDirections];
  enemySpawnDirectionChoices.sort(()=>(Math.random() > .5) ? 1 : -1)
  console.log(enemySpawnDirectionChoices);
}

function initializeGame() {
  randomizeSpawnDirectionOrder();
  requestAnimationFrame(gameLoop);
}