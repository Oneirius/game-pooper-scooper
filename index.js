// DEBUG - Verifying JS file is linked correctly
// console.log("JS is working!");

// Declare game board entity
const gameBoardElement = document.querySelector("#game-board");
const gameBoardWidth = gameBoardElement.getBoundingClientRect().width;
const gameBoardHeight = gameBoardElement.getBoundingClientRect().height;
console.log(gameBoardWidth, gameBoardHeight);


// Create player entity
const player = new Player(384, 308, gameBoardWidth, gameBoardHeight);


requestAnimationFrame(gameLoop);


function gameLoop() {
    player.move();
    //console.log("Brain");
    requestAnimationFrame(gameLoop);
}