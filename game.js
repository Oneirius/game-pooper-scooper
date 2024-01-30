class Game {
  constructor() {
    this.lives = 3;
    this.score = 0;
    this.frames = 0;
    this.isOver = false;

    // Initialize UI
    this.updateLives();
    this.updateScore();

    // Initialize Enemies and Poops array
    this.gameEnemies = [];
    this.gamePoops = [];

    // Game Loop Variables
    this.frames = 0;

    // Initialize Key listeners
    this.playerInputs();

    // Initialize other game objects
    this.player = new Player(384, 308, gameBoardWidth, gameBoardHeight);

    // Initialize game loop
    requestAnimationFrame(gameLoop);
  }

  // METHODS
  updateLives() {
    gameLivesElement.innerText = `${this.lives}`;
  }
  updateScore() {
    gameScoreElement.innerText = `${this.score}`;
  }
  healthCheck() {
    if (game.lives <= 0) {
      this.isOver = true;
      this.gameOver();
    }
  }
  gameOver() {
    if (this.isOver === true) {
      player.element.remove();
      gamePoops.forEach((e) => {
        e.deSpawn();
      });
      gameEnemies.forEach((e) => {
        e.deSpawn();
      });
      switchScreen(gameOverElement);
    }
  }
  
  playerInputs() {
    // Check for Left Movement Key Up/Down
    // And apply corresponding Left velocity
    document.addEventListener("keydown", (event) => {
      event.preventDefault();
      if (event.code === "ArrowLeft") {
        playerHorVelNeg = 1;
      }
    });
    document.addEventListener("keyup", (event) => {
      event.preventDefault();
      if (event.code === "ArrowLeft") {
        playerHorVelNeg = 0;
      }
    });
  
    // Check for Right Movement Key Up/Down
    // And apply corresponding Left velocity
    document.addEventListener("keydown", (event) => {
      event.preventDefault();
      if (event.code === "ArrowRight") {
        playerHorVelPos = 1;
      }
    });
    document.addEventListener("keyup", (event) => {
      event.preventDefault();
      if (event.code === "ArrowRight") {
        playerHorVelPos = 0;
      }
    });
  
    // Check for Up Movement Key Up/Down
    // And apply corresponding Up velocity
    document.addEventListener("keydown", (event) => {
      event.preventDefault();
      if (event.code === "ArrowUp") {
        playerVerVelNeg = 1;
      }
    });
    document.addEventListener("keyup", (event) => {
      event.preventDefault();
      if (event.code === "ArrowUp") {
        playerVerVelNeg = 0;
      }
    });
  
    // Check for Down Movement Key Up/Down
    // And apply corresponding Up velocity
    document.addEventListener("keydown", (event) => {
      event.preventDefault();
      if (event.code === "ArrowDown") {
        playerVerVelPos = 1;
      }
    });
    document.addEventListener("keyup", (event) => {
      event.preventDefault();
      if (event.code === "ArrowDown") {
        playerVerVelPos = 0;
      }
    });
    //console.log(playerHorVelPos, playerHorVelNeg, playerVerVelPos, playerVerVelNeg)
  }
  spawnEnemies(enSpawnDir) {
    if (this.frames % this.enemySpawnFrame === 0) {
      if (!this.isOver) {
        // Spawn Enemy and add to gameEnemies array
        const spawnDirection =
          enemySpawnDirections[
            Math.floor(Math.random() * enemySpawnDirections.length)
          ];
        let enemyMoveDirection = "";
        switch (spawnDirection) {
          case "right":
            enemyMoveDirection = "left";
            break;
          case "left":
            enemyMoveDirection = "right";
            break;
          case "up":
            enemyMoveDirection = "down";
            break;
          case "down":
            enemyMoveDirection = "up";
            break;
        }
        gameEnemies.push(
          new Enemy(
            5,
            spawnDirection,
            enemyMoveDirection,
            gameBoardWidth,
            gameBoardHeight
          )
        );
        // Reduce enemy spawn timer if it above minimum number of EnemySpawnFrames
        if (enemySpawnFrame > enemySpawnFrameMinimum) {
          enemySpawnFrame--;
        }
      }
    }
  }
}
