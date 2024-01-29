class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.element = document.createElement("div");
        this.element.setAttribute("id", "player");
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        gameBoardElement.appendChild(this.element);
    }
}