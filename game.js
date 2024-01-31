class Game {
  constructor() {
    this.lives = 1;
    this.score = 0;
    this.frames = 0;
    this.isOver = false;

    // Initialize UI
    this.updateLives();
    this.updateScore();

    // Initialize Enemies and Poops array
    this.enemies = [];
    this.poops = [];

    // Game Loop Variables
    this.frames = 0;

    // Enemy Spawning Variables
    this.enemySpawnFrame = 100;
    this.enemySpawnFrameMinimum = 50;
    this.enemySpawnDirectionFrame = 500;
    this.enemySpawnDirections = 0;


    // Initialize Key listeners
    this.playerInputs();

    // Initialize other game objects
    this.player = new Player(384, 308, gameBoardWidth, gameBoardHeight);
  }

  // METHODS
  updateLives() { gameLivesElement.innerText = `${this.lives}`; }
  updateScore() { gameScoreElement.innerText = `${this.score}`; }
  healthCheck() {
    if (game.lives <= 0) {
      this.isOver = true;
      this.boardCleanup();
    }
  }
  boardCleanup() {
    if (this.isOver === true) {
      this.enemies.forEach((e) => {
        e.element.remove();
      });
      this.enemies = [];
     this.poops.forEach((e)=>{
      e.element.remove();
     })
      this.poops = [];
      this.player.element.remove();
      switchScreen(gameOverElement);
      updateGameOverElements();
      console.log(this.enemies);
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
  
  addSpawnDirection() {
    if (this.frames % this.enemySpawnDirectionFrame === 0 && this.enemySpawnDirections < enemySpawnDirectionChoices.length) {
      this.enemySpawnDirections ++;
      this.enemySpawnDirectionFrame += this.enemySpawnDirectionFrame;
      console.log(this.enemySpawnDirections, this.enemySpawnDirectionFrame);
    }
  }
  spawnEnemies() {
    if (this.frames % this.enemySpawnFrame === 0) {
      if (!this.isOver) {
        // Spawn Enemy and add to enemies array
        const spawnDirection =
          enemySpawnDirectionChoices[
            Math.floor(Math.random() * this.enemySpawnDirections)
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
        game.enemies.push(
          new Enemy(
            3,
            spawnDirection,
            enemyMoveDirection,
            gameBoardWidth,
            gameBoardHeight
          )
        );
        // Reduce enemy spawn timer if it above minimum number of EnemySpawnFrames
        if (this.enemySpawnFrame > this.enemySpawnFrameMinimum) {
          this.enemySpawnFrame -=5;
        }
      }
    }
  }

}
