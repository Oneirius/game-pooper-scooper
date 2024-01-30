class Poop {
    constructor(x, y, size) {
        // Create HTML element 
        this.element = document.createElement("div");
        // Set element class to Enemy
        this.element.classList.add("poop");
        // Append element to board
        gameBoardElement.appendChild(this.element);
        // Position
        this.x = x;
        this.y = y;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        // Poop Health
        this.health = 5;
        this.scoreValue = 1;

        // Dimensions
        this.width = size;
        this.height = size;
        this.leftEdge = this.x;
        this.rightEdge = this.x + this.width;
        this.topEdge = this.y;
        this.bottomEdge = this.y + this.height;
        this.innerText = `${this.x} ${this.y}`
    }
    deSpawn() {
        this.element.remove();
        const poopIndex = gamePoops.indexOf(this);
        gamePoops.splice(poopIndex, 1);
    }
}