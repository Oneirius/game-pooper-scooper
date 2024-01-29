class Game {
    constructor() {
        this.element = document.createElement("div");
        this.element.setAttribute("id", "game-controller");
        gameBoardElement.appendChild(this.element);
        this.element.innerText = "Many Bananananananananas!";
    }
}