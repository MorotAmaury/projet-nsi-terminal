let player = document.getElementById('player');
let leftPosition = 900;
let topPosition = 500;
let speed = 2;
let keyState = {};

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
    updatePosition();
    movePlayer();
}, 1); // Environ 60 images par seconde

