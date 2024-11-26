import Ball from '../js/classes/ball.js';
import Player from '../js/classes/player.js';

const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

// Création des instances de la balle et des joueurs
const ball = new Ball(320, 240, 10, "red");
const player1 = new Player(10, 240, 5, 80, "blue");
const player2 = new Player(630, 240, 5, 80, "blue");

let player1Score = 0;
let player2Score = 0;

// Mettre à jour l'affichage du score
function updateScore() {
    context.font = "20px Arial";
    context.fillStyle = "white";
    context.clearRect(0, 0, canvas.width, 30); // Effacer l'ancienne position du score
    context.fillText(`Joueur 1: ${player1Score} Joueur 2: ${player2Score}`, canvas.width / 2 - 100, 20);
}

// Vérification et MAJ du score
function checkScore() {
    if (ball.x + ball.radius > canvas.width) {
        player1Score++; // J1 marque un point
        ball.reset(canvas); // Réinitialiser la balle
    } else if (ball.x - ball.radius < 0) {
        player2Score++; // J2 marque un point
        ball.reset(canvas); // Réinitialiser la balle
    }
}

// Fonction d'animation du jeu
function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Effacer le canvas

    ball.move(); // Déplacer la balle
    ball.draw(context); // Dessiner la balle
    player1.draw(context); // Dessiner le J1
    player2.draw(context); // Dessiner le J2

    // Vérification des collisions avec les joueurs
    ball.checkPlayerCollision(player1);
    ball.checkPlayerCollision(player2);

    // Vérification des collisions avec les bords du canvas
    ball.checkCollision(canvas);

    // Vérification et mise à jour du score
    checkScore();
    updateScore(); // Mise à jour de l'affichage du score

    requestAnimationFrame(gameLoop); // Appel récursif pour animer le jeu
}

// Initialisation du jeu
gameLoop();

// Événement pour déplacer les joueurs avec la souris
canvas.addEventListener('mousemove', (event) => {
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    player1.move(mouseY);
    player2.move(mouseY);
});
