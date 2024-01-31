// SCREEN ELEMENTS
// Declare game variable
let game;

// MENU ELEMENTS
// Declare Game Menu element
const gameMenuElement = document.querySelector("#game-menu");

// GAME ELEMENTS
// Declare Game Board element
const gameBoardElement = document.querySelector("#game-board");
// Game Board variables
const gameBoardWidth = gameBoardElement.getBoundingClientRect().width;
const gameBoardHeight = gameBoardElement.getBoundingClientRect().height;

// Declare game variable and create UI element for Lives
const gameLivesElement = document.querySelector("#life-counter");

// Declare game variable and create UI element for Score
const gameScoreElement = document.querySelector("#score-counter");


// GAME OVER ELEMENTS
// Declare Game Over element
const gameOverElement = document.querySelector("#game-over");
// Declare game over variables and create UI element for final score
const endRandomMessageElement = document.querySelector("#end-message-random");
const endScoreElement = document.querySelector("#end-score");
const endScoreAssessmentElement = document.querySelector("#end-assessment");


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

endRandomMessageArray = [
  "All pooped out!",
  "2 Poop 2 Scoop!",
  "Overwhelmed!",
  "Pbbbbt!",
  "Do you even scoop, bro?!",
  "Our scoop can't handle poop of this magnitude!",
  "It was a poop trap!",
  "Too much poop creep...",
  "We're gonna need a bigger scoop!"
]

function updateGameOverElements() {
  // Pick a random message from the random message array
  endRandomMessageElement.innerText = endRandomMessageArray[
  Math.floor(Math.random()*endRandomMessageArray.length)];
  endScoreElement.innerText = `You scored ${game.score} points!`
  endScoreAssessmentElement.innerText = scoreAssessment(game.score);
  // Update the text insde the End Score element
}

endAssessmentMessageArray = [
  "Did you even try?!",                               //0
  "Hmm...",                                           //1
  "I was expecing better...",                         //2
  "I think you can do better!",                       //3
  "A good attempt, take another shot!",               //4
  "Acceptable, but there's room for improvement!",    //5
  "Pretty decent!",                                   //7
  "Not bad!",                                         //6
  "Nicely done!",                                     //8
  "Pretty good!",                                     //9
  "Good!",                                            //10
  "Very nice!",                                       //11
  "You did well!",                                    //12
  "Well done!",                                       //13
  "Impressive!",                                      //14
  "Wow, you're a natural at this!",                   //15
  "WOW!!",                                            //16
  "Holy scoop!",                                      //17
  "Incredible!!!",                                    //18
  "King Scoopa in da hizzouse!"                       //19
]

function scoreAssessment(score) {
    if ( score === 0) {
    return  endAssessmentMessageArray[0];
  } else if (score <= 5 ){
    return endAssessmentMessageArray[1];
  } else if (score <= 10 ){
    return endAssessmentMessageArray[2];
  } else if (score <= 20 ){
    return endAssessmentMessageArray[3];
  } else if (score <= 40 ){
    return endAssessmentMessageArray[4];
  } else if (score <= 75 ){
    return endAssessmentMessageArray[5];
  } else if (score <= 150 ){
    return endAssessmentMessageArray[6];
  } else if (score <= 250 ){
    return endAssessmentMessageArray[7];
  } else if (score <= 450 ){
    return endAssessmentMessageArray[8];
  } else if (score <= 750 ){
    return endAssessmentMessageArray[9];
  } else if (score <= 1000 ){
    return endAssessmentMessageArray[10];
  } else if (score <= 1200 ){
    return endAssessmentMessageArray[11];
  } else if (score <= 1350 ){
    return endAssessmentMessageArray[12];
  } else if (score <= 1500 ){
    return endAssessmentMessageArray[13];
  } else if (score <= 1600 ){
    return endAssessmentMessageArray[14];
  } else if (score <= 1700 ){
    return endAssessmentMessageArray[15];
  } else if (score <= 1800 ){
    return endAssessmentMessageArray[16];
  } else if (score <= 1900 ){
    return endAssessmentMessageArray[17];
  } else if (score <= 2000 ){
    return endAssessmentMessageArray[18];
  } else if (score <= 2500 ){
    return endAssessmentMessageArray[19];
  } 
}
