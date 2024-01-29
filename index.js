// DEBUG - Verifying JS file is linked correctly
// console.log("JS is working!");

// Declare game board entity
gameBoardElement = document.querySelector("#game-board");


// Create player entity
const player = new Player(384, 308);


requestAnimationFrame(gameLoop);


function gameLoop() {
    player.move();
    //console.log("Brain");
    requestAnimationFrame(gameLoop);
}