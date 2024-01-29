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

        // Set starting position based on the edge the enemy is spawning from
        switch(spawnEdge) {
            case "right":        
                this.x = gameBoardWidth-32;
                this.y = Math.floor(Math.random()*gameBoardHeight-this.height);
                break;
        }

        // Set enemy movement direction
        this.moveDirection = direction

        // Set element position
        this.updatePosition();
        this.updateEdges();
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
    move() {
        console.log(this.moveDirection)
        switch(this.moveDirection) {
            case "left":
                this.x -= this.velocity;
                break;
        }
        this.updatePosition();
        this.updateEdges();
        this.checkForBoundaries();
    }
    checkForBoundaries(direction) {
        switch(direction) {
            case "left":
                if (this.x <= 0 - this.width) {
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
}