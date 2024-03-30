let player = document.getElementById('player');

// partie sur le mouvement

let wall = document.getElementById('wall');
let xPos = 900; // position horizontal de depart
let yPos = 500; // position vertical de depart
let speed = 2; // vitesse du joueur
let keyState = {};

let isCollide = (obstacle, player, position) => {
    let obstacleRect = obstacle.getBoundingClientRect()
    let playerRect = player.getBoundingClientRect()
    if (position === "left")
    {
        return obstacleRect.right + 5 > playerRect.left && obstacleRect.top < playerRect.bottom && 
        obstacleRect.bottom > playerRect.top
    }
    if(position === "right")
    {
        return obstacleRect.left - 5 < playerRect.right && obstacleRect.top < playerRect.bottom && 
        obstacleRect.bottom > playerRect.top
    }
    if(position === "top")
    {
        return obstacleRect.bottom + 5 > playerRect.top && obstacleRect.left < playerRect.right && obstacleRect.right > playerRect.left
    }
    if (position === "bottom") 
    {
        return obstacleRect.top - 5 < playerRect.bottom && obstacleRect.left < playerRect.right && obstacleRect.right > playerRect.left
    }
};


let movePlayer = () => {
    player.style.left = xPos + 'px';
    player.style.top = yPos + 'px';
};

let updatePosition = () => {
    if (!isCollide(wall, player, "left") && keyState['ArrowLeft'] && xPos - speed > 0) { // aller a gauche
        xPos -= speed;
    }
    if (!isCollide(wall, player, "right") && keyState['ArrowRight'] && xPos + speed < (window.innerWidth - 50)) { // aller a droite
        xPos += speed;
    }
    if (!isCollide(wall, player, "top") && keyState['ArrowUp'] && yPos - speed > 60) { // aller en haut
        yPos -= speed;
    }
    if (!isCollide(wall,player, "bottom") && keyState['ArrowDown'] && yPos + speed < (window.innerHeight - 120)) { // aller en bas
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
    const missile = document.createElement('div');
    missile.classList.add('missile');
    
    let player = document.getElementById('player');
    let posY = parseInt(player.style.top) - 0.8 * (window.innerWidth / 100);
    let posX = parseInt(player.style.left) + 1.6 * (window.innerWidth / 100);
    missile.style.left = posX + "px";
    missile.style.top = posY + "px";
    var testx = `${(e.clientX - posX)*10}px`
    var testy = `${(e.clientY - posY)*10}px`
    
    if (parseInt(testx) < 500 && parseInt(testx) > -500 || parseInt(testy) < 100 && parseInt(testy) > -100)
    {
        missile.classList.add('test')
    }
    
    document.getElementById('missile-container').appendChild(missile);
    
    
    setTimeout(async () => {
        console.log(testx, testy);
        missile.style.transform = `translate(${testx}, ${testy})`;
            
        
    }, 30);
});




