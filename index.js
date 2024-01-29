// DEBUG - Verifying JS file is linked correctly
// console.log("JS is working!");

// Declare game board entity
const gameBoardElement = document.querySelector("#game-board");
const gameBoardWidth = gameBoardElement.getBoundingClientRect().width;
const gameBoardHeight = gameBoardElement.getBoundingClientRect().height;


// Create player entity
const player = new Player(384, 308, gameBoardWidth, gameBoardHeight);

const gameEnemies = [];
gameEnemies.push(new Enemy(5, "right", "left"));




requestAnimationFrame(gameLoop);


function gameLoop() {
    player.move();
    gameEnemies.forEach((enemy)=> {
        enemy.move();
    })
    //console.log(gameEnemies);
    requestAnimationFrame(gameLoop);
}