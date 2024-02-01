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

        // Golden Poop chance
        this.poopUpgradeChance = 10;
        this.poopUpgradeRoll = 0;

        this.poopUpgradeCheck();
    }
    deSpawn() {
        this.element.remove();
        const poopIndex = game.poops.indexOf(this);
        game.poops.splice(poopIndex, 1);
    }
    poopUpgradeCheck() {
        this.goldenPoopRoll = Math.floor(Math.random()*100)+1;
        if (this.goldenPoopRoll <= (this.poopUpgradeChance*.1)) {
            this.element.style.backgroundImage = "url('./assets/art/spr-poop-gold.png')";
            this.scoreValue *= 100;
        } else if (this.goldenPoopRoll <= (this.poopUpgradeChance)) {
            this.element.style.backgroundImage = "url('./assets/art/spr-poop-silver.png')";
            this.scoreValue *= 10;
        } else {
            this.element.style.backgroundImage = "url('./assets/art/spr-poop-default.png')";
        }
    }
}