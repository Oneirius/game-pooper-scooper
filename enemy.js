class Enemy {
    constructor(velocity, spawnEdge, direction) {
        // Movement Speed
        this.velocity = velocity;

        // Create HTML element 
        this.element = document.createElement("div");
        // Set element class to Enemy
        this.element.classList.add("enemy");

        // Append element to board
        gameBoardElement.appendChild(this.element);

        // Set element dimensions
        this.width = this.element.getBoundingClientRect().width;
        this.height = this.element.getBoundingClientRect().height;

        // Set edge at which enemy is spawning
        this.spawnEdge = spawnEdge;

        // Set starting position based on the edge the enemy is spawning from
        switch(spawnEdge) {
            case "right":        
                this.x = gameBoardWidth+this.width;
                this.y = Math.floor((Math.random()*gameBoardHeight)-this.height);
                if (this.y < 0) {this.y = 0;}
                this.element.style.backgroundImage = "url('./assets/art/spr-enemy-rat-left')";
                break;
            case "left":
                this.x = -this.width;
                this.y = Math.floor((Math.random()*gameBoardHeight)-this.height);
                if (this.y < 0) {this.y = 0;}
                this.element.style.backgroundImage = "url('./assets/art/spr-enemy-rat-right')";
                break;
            case "up":
                this.x = Math.floor((Math.random()*gameBoardWidth)-this.width);
                this.y = -this.height
                if (this.x < 0) {this.x = 0;}
                this.element.style.backgroundImage = "url('./assets/art/spr-enemy-rat-down')";
                break;
            case "down":
                this.x = Math.floor((Math.random()*gameBoardWidth)-this.width);
                this.y = gameBoardHeight+this.height
                if (this.x < 0) {this.x = 0;}
                this.element.style.backgroundImage = "url('./assets/art/spr-enemy-rat-up')";
                break;
        }

        // Set enemy movement direction
        this.moveDirection = direction

        this.poopSpawnFrame = 100;
        this.poopFrame = Math.floor(Math.random()*(this.poopSpawnFrame));

        // Set element position
        this.updatePosition();
        this.updateEdges();
        this.updateSprite(this.spawnEdge);
    }
    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }
    updateEdges() {
        this.leftEdge = this.x;
        this.rightEdge = this.x + this.width;
        this.topEdge = this.y;
        this.bottomEdge = this.y + this.height;
    }
    updateSprite(spawnEdge) {
        switch(spawnEdge) {
            case "right":        
                this.element.style.backgroundImage = "url('./assets/art/spr-enemy-rat-left.png')";
                break;
            case "left":
                this.element.style.backgroundImage = "url('./assets/art/spr-enemy-rat-right.png')";
                break;
            case "up":
                this.element.style.backgroundImage = "url('./assets/art/spr-enemy-rat-down.png')";
                break;
            case "down":
                this.element.style.backgroundImage = "url('./assets/art/spr-enemy-rat-up.png')";
                break;
        }
    }
    move() {
        switch(this.moveDirection) {
            case "left":
                this.x -= this.velocity;
                break;
            case "right":
                this.x += this.velocity;
                break;
            case "down":
                this.y += this.velocity;
                break;
            case "up":
                this.y -= this.velocity;
                break;
        }
        this.updatePosition();
        this.updateEdges();
        this.checkForBoundaries();
    }
    checkForBoundaries() {
        switch(this.moveDirection) {
            case "left":
                if (this.x <= (0 - this.width)) {
                    this.deSpawn();
                }
                break;
            case "right":
                if (this.x >= (gameBoardWidth + this.width)) {
                    this.deSpawn();
                }
                break;
            case "down":
                if (this.y > (gameBoardHeight + this.height)) {
                    this.deSpawn();
                }
                break;
            case "up":
                if (this.y <= (0 - this.height)) {
                    this.deSpawn();
                }
                break;
        }
    }
    deSpawn() {
        this.element.remove();
        const enemyIndex = game.enemies.indexOf(this);
        game.enemies.splice(enemyIndex, 1);
    }
    spawnPoop() {
        this.poopFrame ++;
        if (this.poopFrame % this.poopSpawnFrame === 0) {
            game.poops.push(new Poop(this.x, this.y, this.width));
            this.poopFrame = Math.floor(Math.random()*(this.poopSpawnFrame*.5));
        }
    }
}