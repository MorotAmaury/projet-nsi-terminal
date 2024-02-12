let player = document.getElementById('player');

// partie sur le mouvement

let xPos = 900; // position horizontal de depart
let yPos = 500; // position vertical de depart
let speed = 2; // vitesse du joueur
let keyState = {};

let movePlayer = () => {
    player.style.left = xPos + 'px';
    player.style.top = yPos + 'px';
};

let updatePosition = () => {
    if (keyState['ArrowLeft'] && xPos - speed > 50) { // aller a gauche
        xPos -= speed;
    }
    if (keyState['ArrowRight'] && xPos + speed < (window.innerWidth - 100)) { // aller a droite
        xPos += speed;
    }
    if (keyState['ArrowUp'] && yPos - speed > 150) { // aller en haut
        yPos -= speed;
    }
    if (keyState['ArrowDown'] && yPos + speed < (window.innerHeight - 230)) { // aller en bas
        yPos += speed;
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

// partie tirer

document.addEventListener('click', (e) => {
    const missile = document.createElement('div')
    missile.classList.add('test')
    missile.style.left = player.style.left
    missile.style.top = player.style.top

    document.getElementById('missile-container').appendChild(missile)

    console.log(e.clientX, e.clientY);
    let incrementationX = e.clientX / 10
    let incrementationY = e.clientY / 10

    while (parseInt(missile.style.left) > 0 || parseInt(missile.style.right) > 0)
    {
        missile.style.left += incrementationX
        missile.style.top += incrementationY
    }
})

