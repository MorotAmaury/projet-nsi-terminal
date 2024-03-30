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

    let choice1of4 = (n1, n2, n3, n4) => {
        let choix = Math.random();
        if (choix < 0.25) {
            return n1;
        } else if  (choix < 0.5) {
            return n2;
        } else if (choix < 0.75) {
            return n3;
        } else {
            return n4;
        }
    }

    // Nombre d'éléments wall et water à générer
    var numWalls = randomBetween(15, 25);
    var numWaters = randomBetween(15, 25);

    // Div game
    var gameDiv = document.querySelector('.game');    

    // Fonction pour générer les éléments wall
    let generateWalls = () => {
        for (var i = 0; i < numWalls; i++) {
            var wall = document.createElement('div'); // Create img element
            wall.classList.add('wall');
            wall.style.left = choice1of4(randomBetween(50, window.innerWidth/4), randomBetween(window.innerWidth/4, window.innerWidth/2 - 50), randomBetween(window.innerWidth/2+50, window.innerWidth*3/4), randomBetween(window.innerWidth*3/4, window.innerWidth-50)) + 'px'; // Position aléatoire tout en empêchant le spawn du joueur dans un bloc
            wall.style.top = choice1of4(randomBetween(50, window.innerHeight/4), randomBetween(window.innerHeight/4, window.innerHeight/2 - 50), randomBetween(window.innerHeight/2+50, window.innerHeight*3/4), randomBetween(window.innerHeight*3/4, window.innerHeight-50)) + 'px';// Facteur aléatoire de 4, augmenter permet de generer un meilleur aléatoire
            gameDiv.appendChild(wall); // Append the wall element to the game container
        }
    }
    

    // Fonction pour générer les éléments water
    let generateWaters = () => {
        for (var i = 0; i < numWaters; i++) {
            var water = document.createElement('div');
            water.classList.add('water');
            water.style.left = choice1of4(randomBetween(50, window.innerWidth/4), randomBetween(window.innerWidth/4, window.innerWidth/2 - 50), randomBetween(window.innerWidth/2+50, window.innerWidth*3/4), randomBetween(window.innerWidth*3/4, window.innerWidth-50)) + 'px'; // Position aléatoire tout en empêchant le spawn du joueur dans un bloc
            water.style.top = choice1of4(randomBetween(50, window.innerHeight/4), randomBetween(window.innerHeight/4, window.innerHeight/2 - 50), randomBetween(window.innerHeight/2+50, window.innerHeight*3/4), randomBetween(window.innerHeight*3/4, window.innerHeight-50)) + 'px';// Facteur aléatoire de 4, augmenter permet de generer un meilleur aléatoire
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
        player.classList.remove('runright', 'rundown', 'standing')
        player.classList.add('runleft')
    }
    if (keyState['ArrowRight'] && xPos + speed < (window.innerWidth - 50)) { // aller a droite
        xPos += speed;
        player.classList.remove('runleft', 'rundown', 'standing')
        player.classList.add('runright')
    }
    if (keyState['ArrowUp'] && yPos - speed > 60) { // aller en haut
        yPos -= speed;
    }
    if (keyState['ArrowDown'] && yPos + speed < (window.innerHeight - 120)) { // aller en bas
        yPos += speed;
        player.classList.remove('runright', 'runleft', 'standing')
        player.classList.add('rundown')
    }
    if (!(keyState['ArrowLeft']) && !(keyState['ArrowRight']) && !(keyState['ArrowUp']) && !(keyState['ArrowDown'])) {
        player.classList.remove('runright', 'runleft', 'rundown')
        player.classList.add('standing')
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




