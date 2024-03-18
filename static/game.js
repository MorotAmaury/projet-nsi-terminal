let player = document.getElementById('player');
<<<<<<< HEAD
let wall = document.getElementById('wall');
let leftPosition = 900;
let topPosition = 500;
let speed = 2;
=======

// partie sur le mouvement

let xPos = 900; // position horizontal de depart
let yPos = 500; // position vertical de depart
let speed = 2; // vitesse du joueur
>>>>>>> 3a7693534ca00cec48dd7124f4032c914fa8ddb1
let keyState = {};

let isCollide = (obstacle, player) => {
    let obstacleRect = obstacle.getBoundingClientRect()
    let playerRect = player.getBoundingClientRect()
    return !(obstacleRect.right < playerRect.left || obstacleRect.left > playerRect.right || obstacleRect.bottom > playerRect || obstacleRect.top > playerRect.bottom);
};


let movePlayer = () => {
<<<<<<< HEAD

    player.style.left = leftPosition + 'px';
    player.style.top = topPosition + 'px';
};

let updatePosition = () => {

    if (keyState['ArrowLeft'] && leftPosition - speed > 100) {
        leftPosition -= speed;
=======
    player.style.left = xPos + 'px';
    player.style.top = yPos + 'px';
};

let updatePosition = () => {
    if (keyState['ArrowLeft'] && xPos - speed > 0) { // aller a gauche
        xPos -= speed;
>>>>>>> 3a7693534ca00cec48dd7124f4032c914fa8ddb1
    }
    if (keyState['ArrowRight'] && xPos + speed < (window.innerWidth - 50)) { // aller a droite
        xPos += speed;
    }
    if (keyState['ArrowUp'] && yPos - speed > 60) { // aller en haut
        yPos -= speed;
    }
    if (keyState['ArrowDown'] && yPos + speed < (window.innerHeight - 120)) { // aller en bas
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
    if (!isCollide(wall, player)) {
        updatePosition();
    }
    movePlayer();
<<<<<<< HEAD
}, 1); // Environ 60 images par seconde
=======
}, 1); // Environ 60 images par seconde

// partie tirer



document.addEventListener('click', (e) => {
    const missile = document.createElement('div')
    missile.classList.add('test')
    missile.style.left = player.style.left
    missile.style.top = player.style.top

    document.getElementById('missile-container').appendChild(missile)

    let missile_mouvement = (incrementationX, incrementationY) => {
        return new Promise(resolve => {
            while (parseInt(missile.style.left) < window.innerWidth + 500 && parseInt(missile.style.left) > -500 && 
            parseInt(missile.style.top) < window.innerHeight + 500 && parseInt(missile.style.top) > -500) 
            {
                console.log(parseInt(missile.style.left),  incrementationX);
                missile.style.left = (parseInt(missile.style.left) + incrementationX) + 'px'
                missile.style.top = (parseInt(missile.style.top) + incrementationY) + 'px'
    
            }
            resolve()
        })
    }

    setTimeout(async() => {
        let incrementationX = e.clientX - Math.abs(parseInt(missile.style.left))
        let incrementationY = e.clientY - Math.abs(parseInt(missile.style.top))
        await missile_mouvement(incrementationX, incrementationY)
    }, 30)

    
        

})

>>>>>>> 3a7693534ca00cec48dd7124f4032c914fa8ddb1
