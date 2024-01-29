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
        this.velocity = 5;
        this.horVelPos = 0;
        this.horVelNeg = 0;
        this.verVelPos = 0;
        this.verVelNeg = 0;

        this.updateElementPosition();
    }
    updateElementPosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        console.log(this.element.getBoundingClientRect().width, this.width)
    }
    updateEdges() {
        this.leftEdge = this.x;
        this.rightEdge = this.x + this.width;
        this.topEdge = this.y;
        this.bottomEdge = this.y + this.height;
    }
    move() {
        // Check for Left Movement Key Up/Down
        // And apply corresponding Left velocity
        document.addEventListener("keydown", (event)=> {
            if (event.code  === "ArrowLeft") {
                this.horVelNeg = this.velocity;
            }
        })
        document.addEventListener("keyup", (event)=> {
            if (event.code  === "ArrowLeft") {
                this.horVelNeg = 0;
            }
        })
        
        // Check for Right Movement Key Up/Down
        // And apply corresponding Left velocity
        document.addEventListener("keydown", (event)=> {
            if (event.code  === "ArrowRight") {
                this.horVelPos = this.velocity;
            }
        })
        document.addEventListener("keyup", (event)=> {
            if (event.code  === "ArrowRight") {
                this.horVelPos = 0;
            }
        })

        // Check for Up Movement Key Up/Down
        // And apply corresponding Up velocity
        document.addEventListener("keydown", (event)=> {
            if (event.code  === "ArrowUp") {
                this.verVelNeg = this.velocity;
            }
        })
        document.addEventListener("keyup", (event)=> {
            if (event.code  === "ArrowUp") {
                this.verVelNeg = 0;
            }
        })

        // Check for Down Movement Key Up/Down
        // And apply corresponding Up velocity
        document.addEventListener("keydown", (event)=> {
            if (event.code  === "ArrowDown") {
                this.verVelPos = this.velocity;
            }
        })
        document.addEventListener("keyup", (event)=> {
            if (event.code  === "ArrowDown") {
                this.verVelPos = 0;
            }
        })
        // Udate internal player x/y position
        this.x += this.horVelPos - this.horVelNeg;
        this.y += this.verVelPos - this.verVelNeg;

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
    }
}