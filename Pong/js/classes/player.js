export default class Player {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    // Dessin du joueur sur le canvas
    draw(context) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    // Déplacement vertical basé sur la position de la souris
    move(mouseY) {
        this.y = mouseY - this.height / 2; // Centrer le joueur sur la souris
    }
}
