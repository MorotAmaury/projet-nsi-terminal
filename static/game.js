let player = document.getElementById('player');
let wall = document.getElementsByClassName('wall');
let water = document.getElementsByClassName('water');
let xPos = 900; // position horizontal de depart
let yPos = 500; // position vertical de depart
let speed = 2; // vitesse du joueur
let keyState = {};



//Générateur procedural aleatoire actuelllement
document.addEventListener('DOMContentLoaded', function() {

    // Fonction pour générer un nombre aléatoire entre min et max
    let randomBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Nombre d'éléments wall et water à générer
    var numWalls = randomBetween(10, 25);
    var numWaters = randomBetween(10, 25);

    // Div game
    var gameDiv = document.querySelector('.game');    

    // Fonction pour générer les éléments wall
    let generateWalls = () => {
        for (var i = 0; i < numWalls; i++) {
            var wall = document.createElement('div'); // Create img element
            wall.classList.add('wall');
            wall.style.left = randomBetween(0, gameDiv.offsetWidth - 50) + 'px'; // Position horizontale aléatoire
            wall.style.top = randomBetween(0, gameDiv.offsetHeight - 50) + 'px'; // Position verticale aléatoire
            gameDiv.appendChild(wall); // Append the wall element to the game container
        }
    }
    

    // Fonction pour générer les éléments water
    let generateWaters = () => {
        for (var i = 0; i < numWaters; i++) {
            var water = document.createElement('div');
            water.classList.add('water');
            water.style.left = randomBetween(0, gameDiv.offsetWidth - 50) + 'px'; // Position horizontale aléatoire
            water.style.top = randomBetween(0, gameDiv.offsetHeight - 50) + 'px'; // Position verticale aléatoire
            gameDiv.appendChild(water);
        }
    }


    generateWalls();
    generateWaters();
});


let movePlayer = () => {
    player.style.left = xPos + 'px';
    player.style.top = yPos + 'px';
};

let updatePosition = () => {
    if (keyState['ArrowLeft'] && xPos - speed > 0) { // aller a gauche
        xPos -= speed;
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




