let player = document.getElementById('player');
let wall = document.getElementById('wall');
let leftPosition = 900;
let topPosition = 500;
let speed = 2;
let keyState = {};

let isCollide = (obstacle, player) => {
    let obstacleRect = obstacle.getBoundingClientRect()
    let playerRect = player.getBoundingClientRect()
    return !(obstacleRect.right < playerRect.left || obstacleRect.left > playerRect.right || obstacleRect.bottom > playerRect || obstacleRect.top > playerRect.bottom);
};


let movePlayer = () => {

    player.style.left = leftPosition + 'px';
    player.style.top = topPosition + 'px';
};

let updatePosition = () => {

    if (keyState['ArrowLeft'] && leftPosition - speed > 100) {
        leftPosition -= speed;
    }
    if (keyState['ArrowRight'] && leftPosition + speed < (window.innerWidth - 100)) {
        leftPosition += speed;
    }
    if (keyState['ArrowUp'] && topPosition - speed > 100) {
        topPosition -= speed;
    }
    if (keyState['ArrowDown'] && topPosition + speed < (window.innerHeight - 230)) {
        topPosition += speed;
    }
};

let analyseTouche = (e) => {
    if (e.type === 'keydown') {
        keyState[e.key] = true;
    } else if (e.type === 'keyup') {
        keyState[e.key] = false;
    }
};

document.addEventListener('keydown', analyseTouche);
document.addEventListener('keyup', analyseTouche);

// Utilisation de setInterval pour une mise à jour continue
setInterval(() => {
    if (!isCollide(wall, player)) {
        updatePosition();
    }
    movePlayer();
}, 1); // Environ 60 images par seconde