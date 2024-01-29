class Player {
    constructor(x, y) {
        // Declare Player position
        this.x = x;
        this.y = y;

        // Create Player Element
        this.element = document.createElement("div");

        // Add Player Element to the baord
        gameBoardElement.appendChild(this.element);

        // Declare Player Element attributes
        this.element.setAttribute("id", "player");
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;

        // Get dimension informantion from Player Element
        this.width = this.element.getBoundingClientRect().width;
        this.height = this.element.getBoundingClientRect().height;

        // Collision box edges
        this.updateEdges();

        // Declare player movement variables
        this.walkVelocity = 5;
        this.cleanVelocity = 2;
        this.velocity = this.walkVelocity;
        this.horVelPos = 0;
        this.horVelNeg = 0;
        this.verVelPos = 0;
        this.verVelNeg = 0;

        this.updateElementPosition();

        // Poop Collision flag
        this.poopCollision = false;
    }
    updateElementPosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }
    updateEdges() {
        this.leftEdge = this.x;
        this.rightEdge = this.x + this.width;
        this.topEdge = this.y;
        this.bottomEdge = this.y + this.height;
    }
    move(horVelPos, horVelNeg, verVelPos, verVelNeg) {
        // Udate internal player x/y position
        this.x += (horVelPos - horVelNeg)* this.velocity;
        this.y += (verVelPos - verVelNeg)* this.velocity;

        // Check for boundaries
        this.updateElementPosition();
        this.updateEdges();
        this.checkBoundaries();
        //console.log(this.leftEdge, this.width, gameBoardWidth);
    }
    checkBoundaries() {
        // Check & enforce left Boundary
        if (this.x < 0) {
            this.x = 0;
        }
        // Check & enforce Right boundary
        if (this.rightEdge > gameBoardWidth) {
            this.x = gameBoardWidth - this.width;
        }
        // Check & enforce top boundary
        if (this.y < 0) {
            this.y = 0;
        }
        // Check and enforce bottom boundary
        if (this.bottomEdge > gameBoardHeight) {
            this.y = gameBoardHeight - this.height;
        }
        this.updateElementPosition();
        this.updateEdges();
        this.enemyCollisionCheck();
        this.poopCollisionCheck();
    }
    enemyCollisionCheck() {
        gameEnemies.forEach((enemy) => {
            if (
                this.leftEdge < enemy.rightEdge &&
                this.rightEdge > enemy.leftEdge &&
                this.topEdge < enemy.bottomEdge &&
                this.bottomEdge > enemy.topEdge
            ){
                console.log("enemy collision detected!")
            }
        })
    }
    poopCollisionCheck() {
        this.poopCollision = false;
        gamePoops.forEach((poop) => {
            /*
            if (
                (this.rightEdge > poop.leftEdge && this.topEdge < poop.bottomEdge) ||
                (this.rightEdge > poop.leftEdge && this.bottomEdge > poop.topEdge) ||
                (this.leftEdge < poop.rightEdge && this.topEdge < poop.bottomEdge) ||
                (this.leftEdge < poop.rightEdge && this.bottomEdge > poop.topEdge)
            */
           // Check for collision with poop
           if (
                this.leftEdge < poop.rightEdge &&
                this.rightEdge > poop.leftEdge &&
                this.topEdge < poop.bottomEdge &&
                this.bottomEdge > poop.topEdge
            )
           {
                // Reduce Poop health
                poop.health -= 1;
                if (poop.health <= 0) {
                    // Despawn poops reduced to 0 or less health
                    poop.deSpawn();
                }
                // Set poop collision flag
                this.poopCollision = true;                
                console.log("poop collision detected!", this.velocity)
            }
            // Set speed and appearance based on poop collision
            if (this.poopCollision === true) {
                this.velocity = this.cleanVelocity;
                this.element.style.backgroundColor = "#244"
            } else {
                this.velocity = this.walkVelocity;
                this.element.style.backgroundColor = "#04c"
            }
        })
    }
}