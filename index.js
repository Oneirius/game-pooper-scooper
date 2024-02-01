// SCREEN ELEMENTS
// Declare game variable
let game;

// Declare audio toggle variable
let isAudioOn = false;

// MENU ELEMENTS
// Declare Game Menu element
const gameMenuElement = document.querySelector("#game-menu");

// MENU AUDIO ELEMENTS
// Declare menu audio element
const menuAudioElement = document.querySelector("#menu-music");
menuAudioElement.volume = 0.2;

// Declare audio toggle button
const audioSwitchElement = document.querySelector("#button-audio");

// AUDIO TOGGLE BEHAVIOUR
audioSwitchElement.onclick = () => {
  if (menuAudioElement.paused === true) {
    isAudioOn = true;
    menuAudioElement.play();
    audioSwitchElement.style.backgroundColor = "brown";
    audioSwitchElement.style.color = "white";
    audioSwitchElement.innerText = "Audio: ON";
  } else {
    isAudioOn = false;
    audioStop(menuAudioElement);
    audioSwitchElement.style.backgroundColor = "#999";
    audioSwitchElement.style.color = "black";
    audioSwitchElement.innerText = "Audio: OFF";
  }
  console.log(isAudioOn);
};

// GAME ELEMENTS
// Declare Game Board element
const gameBoardElement = document.querySelector("#game-board");
// Game Board variables
const gameBoardWidth = gameBoardElement.getBoundingClientRect().width;
const gameBoardHeight = gameBoardElement.getBoundingClientRect().height;

// Declare game audio elements
const gameAudioElement = document.querySelector("#game-music");
gameAudioElement.volume = 0.2;
const gameSFXVacuum = document.querySelector("#sfx-vacuum");
gameSFXVacuum.volume = 0.2;

// Declare game variable and create UI element for Lives
const gameLivesElement = document.querySelector("#life-counter");

// Declare game variable and create UI element for Score
const gameScoreElement = document.querySelector("#score-counter");

// GAME OVER ELEMENTS
// Declare Game Over element
const gameOverElement = document.querySelector("#game-over");


// Declare game over audio element
const gameOverAudioElement = document.querySelector("#game-over-music");
gameOverAudioElement.volume = 0.2;

// Declare game over variables and create UI element for final score
const endRandomMessageElement = document.querySelector("#end-message-random");
const endScoreElement = document.querySelector("#end-score");
const endScoreAssessmentElement = document.querySelector("#end-assessment");

// MAIN MENU LOGIC
// Start Button
const buttonGameStart = document.querySelector("#button-start");
buttonGameStart.onclick = () => {
  switchScreen(gameBoardElement, gameAudioElement);
  game = new Game();
  initializeGame();
};

// GAME OVER LOGIC
// Restart Button
const buttonGameRestart = document.querySelector("#button-restart");
buttonGameRestart.onclick = () => {
  switchScreen(gameBoardElement, gameAudioElement);
  game = new Game();
  initializeGame();
};

const buttonMainMenu = document.querySelector("#button-main-menu");
buttonMainMenu.onclick = () => {
  switchScreen(gameMenuElement, menuAudioElement);
  console.log(
    gameMenuElement.style.visibility,
    gameBoardElement.style.visibility,
    gameOverElement.style.visibility
  );
};

function switchScreen(screen, audio) {
  // Hide all game screens
  gameMenuElement.style.visibility = "hidden";
  gameBoardElement.style.visibility = "hidden";
  gameOverElement.style.visibility = "hidden";
  // Show the screen supplied in the paramenters
  screen.style.visibility = "visible";

  // Stop playing all audio
  audioStop(menuAudioElement);
  audioStop(gameAudioElement);
  audioStop(gameOverAudioElement);
  // Start playing the audio supplied in the paramaters
  isAudioOn ? audio.play() : null;
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
  if (gameBoardElement.style.visibility === "visible") {
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
  enemySpawnDirectionChoices.sort(() => (Math.random() > 0.5 ? 1 : -1));
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
  "We're gonna need a bigger scoop!",
];

function updateGameOverElements() {
  // Pick a random message from the random message array
  endRandomMessageElement.innerText =
    endRandomMessageArray[
      Math.floor(Math.random() * endRandomMessageArray.length)
    ];
  endScoreElement.innerText = `You scored ${game.score} points!`;
  endScoreAssessmentElement.innerText = scoreAssessment(game.score);
  // Update the text insde the End Score element
}

// Array with ranges and messages for player end score
const scoreAssessmentRanges = [
  { min: -999, max: -1, message: "HAX!!!" },
  { min: 0, max: 0, message: "Did you even try?!" },
  { min: 1, max: 5, message: "Hmm..." },
  { min: 6, max: 10, message: "I was expecing better..." },
  { min: 11, max: 15, message: "I think you can do better!" },
  { min: 16, max: 22, message: "A good attempt, take another shot!" },
  { min: 23, max: 23, message: "fnord" },
  {
    min: 26,
    max: 41,
    message: "Acceptable, but there's room for improvement!",
  },
  {
    min: 42,
    max: 42,
    message:
      "The answer to the ultimate question of Life, the Universe, and Everything!",
  },
  { min: 41, max: 68, message: "Pretty decent!" },
  { min: 69, max: 69, message: "Noice!" },
  { min: 70, max: 107, message: "Nicely done!" },
  { min: 108, max: 108, message: "You are destined for the stars!" },
  { min: 109, max: 350, message: "Pretty good!" },
  { min: 351, max: 689, message: "Good!" },
  { min: 690, max: 690, message: "10x Noice!" },
  { min: 691, max: 750, message: "Good!" },
  { min: 751, max: 950, message: "Very nice!" },
  { min: 951, max: 1100, message: "You did well!" },
  { min: 1101, max: 1200, message: "Well done!" },
  { min: 1201, max: 1300, message: "Impressive!" },
  { min: 1301, max: 1400, message: "Wow, you're a natural at this!" },
  { min: 1401, max: 1500, message: "You might be better than me!" },
  { min: 1501, max: 1600, message: "Incredible!!!" },
  { min: 1601, max: 1700, message: "Holy Poop!" },
  { min: 1701, max: 1800, message: "Holy Scoop!" },
  { min: 1801, max: 1900, message: "King Scoopa in da hizzouse!" },
  {
    min: 1901,
    max: 2000,
    message: "OK, you're probably better than me at my own game!",
  },
  {
    min: 2001,
    max: 8999,
    message: "Your dedication is laudable! Can you reach 10,000?",
  },
  { min: 9000, max: 9000, message: "WHAT 9000?!" },
  { min: 9000, max: 10000, message: "IT'S OVER 9000!!!" },
  { min: 10001, max: 99999, message: "SUPA SCOOPA! Can you reach 100,000?" },
  {
    min: 100000,
    max: 999999,
    message: "Godlike! But can you reach 1,000,000 and become a true legend?!",
  },
  {
    min: 1000000,
    max: 9999999,
    message: "Legend! Show me a screenshot - @vanther on twitter!",
  },

  // Add an entry specifically for 23, 42, 69, 108
];

// Function to determine the assessment message based on the player's final score
function scoreAssessment(score) {
  for (const range of scoreAssessmentRanges) {
    if (score >= range.min && score <= range.max) {
      return range.message;
    }
  }
}

function audioStop(audio) {
  audio.pause();
  audio.currentTime = 0;
}
