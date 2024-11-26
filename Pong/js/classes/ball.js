export default class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speedX = 2;
        this.speedY = 2;
    }

    // Déplacement de la balle
    move() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    // Dessin de la balle sur le canvas
    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    // Vérification des collisions avec les murs
    checkCollision(canvas) {
        // Rebond avec le haut et le bas du canvas
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.speedY = -this.speedY; // Inverser la direction verticale
        }

        // Vérification si la balle dépasse le bord gauche ou droit du canvas
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.reset(canvas); // Réinitialiser la balle si elle dépasse
        }
    }

    // Vérification des collisions avec les joueurs
    checkPlayerCollision(player) {
        // Collision avec le joueur 1 ou 2
        if (this.x - this.radius < player.x + player.width &&
            this.x + this.radius > player.x &&
            this.y > player.y && this.y < player.y + player.height) {
            this.speedX = -this.speedX; // Inverser la direction horizontale de la balle
        }
    }

    // Réinitialisation de la balle au centre du canvas
    reset(canvas) {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.speedX = -this.speedX; // Changer la direction horizontale
        this.speedY = 2; // Vitesse verticale par défaut
    }
}
