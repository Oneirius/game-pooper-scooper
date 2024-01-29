// DEBUG - Verifying JS file is linked correctly
// console.log("JS is working!");

// Declare game board entity
const gameBoardElement = document.querySelector("#game-board");
const gameBoardWidth = gameBoardElement.getBoundingClientRect().width;
const gameBoardHeight = gameBoardElement.getBoundingClientRect().height;


// Create player entity
const player = new Player(384, 308, gameBoardWidth, gameBoardHeight);

let gameFrames = 0;
let enemySpawnFrame = 200;
const gameEnemies = [];







requestAnimationFrame(gameLoop);


function gameLoop() {
    gameFrames ++;
    enemySpawner();
    player.move();
    gameEnemies.forEach((enemy)=> {
        enemy.move();
    })
    requestAnimationFrame(gameLoop);
}

function enemySpawner() {
    if (gameFrames % enemySpawnFrame === 0) {
        gameEnemies.push(new Enemy(5, "right", "left"));
        enemySpawnFrame --;
    }
}