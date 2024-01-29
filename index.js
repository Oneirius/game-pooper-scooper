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
const enemySpawnFrameMinimum = 50;

const gameEnemies = [];
const gamePoops = [];

let playerHorVelPos = 0;
let playerHorVelNeg = 0;
let playerVerVelPos = 0;
let playerVerVelNeg = 0;
playerInputs();





requestAnimationFrame(gameLoop);


function gameLoop() {
        gameFrames ++;
        enemySpawner();
        player.move(playerHorVelPos, playerHorVelNeg, playerVerVelPos, playerVerVelNeg);
        gameEnemies.forEach((enemy)=> {
        enemy.move();
    })
    requestAnimationFrame(gameLoop);
}


function enemySpawner() {
    if (gameFrames % enemySpawnFrame === 0) {
        // Spawn Enemy and add to gameEnemies array
        gameEnemies.push(new Enemy(5, "right", "left"));
        // Reduce enemy spawn timer if it above minimum number of EnemySpawnFrames
        if (enemySpawnFrame > enemySpawnFrameMinimum) {
            enemySpawnFrame --;
        }
    }
}

function playerInputs() {
    // Check for Left Movement Key Up/Down
    // And apply corresponding Left velocity
    document.addEventListener("keydown", (event)=> {
        if (event.code  === "ArrowLeft") {
            playerHorVelNeg = 1;
        }
    })
    document.addEventListener("keyup", (event)=> {
        if (event.code  === "ArrowLeft") {
            playerHorVelNeg = 0;
        }
    })
    
    // Check for Right Movement Key Up/Down
    // And apply corresponding Left velocity
    document.addEventListener("keydown", (event)=> {
        if (event.code  === "ArrowRight") {
            playerHorVelPos = 1;
        }
    })
    document.addEventListener("keyup", (event)=> {
        if (event.code  === "ArrowRight") {
            playerHorVelPos = 0;
        }
    })

    // Check for Up Movement Key Up/Down
    // And apply corresponding Up velocity
    document.addEventListener("keydown", (event)=> {
        if (event.code  === "ArrowUp") {
            playerVerVelNeg = 1;
        }
    })
    document.addEventListener("keyup", (event)=> {
        if (event.code  === "ArrowUp") {
            playerVerVelNeg = 0;
        }
    })

            // Check for Down Movement Key Up/Down
        // And apply corresponding Up velocity
    document.addEventListener("keydown", (event)=> {
        if (event.code  === "ArrowDown") {
            playerVerVelPos = 1;
        }
    })
    document.addEventListener("keyup", (event)=> {
        if (event.code  === "ArrowDown") {
            playerVerVelPos = 0;
        }
    })
    console.log(playerHorVelPos, playerHorVelNeg, playerVerVelPos, playerVerVelNeg)
}