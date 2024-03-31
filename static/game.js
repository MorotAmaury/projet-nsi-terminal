let player = document.getElementById('player');
let wall = document.getElementsByClassName('wall');
let water = document.getElementsByClassName('water');
let tree = document.getElementsByClassName('tree');
let lava = document.getElementsByClassName('lava');
let portal = document.getElementById('portal');
let xPos = window.innerWidth/2; // position horizontal de depart
let yPos = window.innerHeight/2; // position vertical de depart
let speed = 2; // vitesse du joueur
let keyState = {};


//COLLISIONS


let isCollide = (obstacle, player, position) => {
    let obstacleRect = obstacle.getBoundingClientRect()
    let playerRect = player.getBoundingClientRect()
    // verifie la colision coter droit de l'obsstacle
    if (position === "left")
    {
        return obstacleRect.right + 5 > playerRect.left && obstacleRect.top < playerRect.bottom && 
        obstacleRect.bottom > playerRect.top && obstacleRect.left < playerRect.right
    }
    // verifie la colision coter gauche de l'obsstacle
    if(position === "right")
    {
        return obstacleRect.left - 5 < playerRect.right && obstacleRect.top < playerRect.bottom && 
        obstacleRect.bottom > playerRect.top && obstacleRect.right > playerRect.left
    }
    // verifie la colision coter bas de l'obsstacle
    if(position === "top")
    {
        return obstacleRect.bottom + 5 > playerRect.top && obstacleRect.left < playerRect.right 
        && obstacleRect.right > playerRect.left && obstacleRect.top < playerRect.bottom
    }
    // verifie la colision coter haut de l'obsstacle
    if (position === "bottom") 
    {
        return obstacleRect.top - 5 < playerRect.bottom && obstacleRect.left < playerRect.right && 
        obstacleRect.right > playerRect.left && obstacleRect.bottom > playerRect.top
    }
};

let isCollideToutLesMur = (liste_mur, liste_eau, liste_arbre,liste_lave, player, pos) => { 
    let test = false;
    Array.from(liste_mur).forEach(wall => {
        if (isCollide(wall, player, pos)) {
            test = true;
        }
    });
    Array.from(liste_eau).forEach(water => {
        if (isCollide(water, player, pos)) {
            test = true;
        }
    })
    Array.from(liste_arbre).forEach(tree => {
        if (isCollide(tree, player, pos)) {
            test = true;
        }
    })
    Array.from(liste_lave).forEach(lava => {
        if (isCollide(lava, player, pos)) {
            test = true;
        }
    })
    return test;
};

let isPageReloading = false;

let travelPortal = () => {
    if (!isPageReloading && ((isCollide(portal, player, "top")) || (isCollide(portal, player, "bottom"))
    || (isCollide(portal, player, "right")) || (isCollide(portal, player, "left")))) {
        isPageReloading = true;
        window.location.reload();
    }
};

//TERRAIN


document.addEventListener('DOMContentLoaded', function() {

    // Fonction pour générer un nombre aléatoire entre min et max
    let randomBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // Div game
    var gameDiv = document.querySelector('.game');

    // Nombre d'éléments wall et water à générer selon le biome

    if (gameDiv.classList.contains("default")) {
        var numWalls = randomBetween(15, 25);
        var numWaters = randomBetween(15, 25);
        var numTrees = randomBetween(20, 30);
        var numLava = 0
    }
    if (gameDiv.classList.contains("desert-de-cristal")) {
        var numWalls = randomBetween(15, 25);
        var numWaters = randomBetween(5, 10);
        var numTrees = randomBetween(5, 10);
        var numLava = 0
    }  
    if (gameDiv.classList.contains("toundra-gelee")) {
        var numWalls = randomBetween(15, 25);
        var numWaters = randomBetween(10, 20);
        var numTrees = randomBetween(5, 10);
        var numLava = 0
    }
    if (gameDiv.classList.contains("marais-hante")) {
        var numWalls = randomBetween(10, 20);
        var numWaters = randomBetween(25, 35);
        var numTrees = randomBetween(30, 40);
        var numLava = 0
    }
    if (gameDiv.classList.contains("volcan-actif")) {
        var numWalls = randomBetween(25, 35);
        var numWaters = 0;
        var numTrees = randomBetween(0, 3);
        var numLava = randomBetween(20, 30)
    }
    if (gameDiv.classList.contains("canyon-abyssal")) {
        var numWalls = randomBetween(20, 30);
        var numWaters = randomBetween(10, 20);
        var numTrees = randomBetween(5, 10);
        var numLava = randomBetween(0, 5);
    }
    if (gameDiv.classList.contains("plage-tropicale")) {
        var numWalls = randomBetween(0, 5);
        var numWaters = randomBetween(25, 35);
        var numTrees = randomBetween(15, 25);
        var numLava = 0
    }
    if (gameDiv.classList.contains("montagnes-flottantes")) {
        var numWalls = randomBetween(25, 35);
        var numWaters = randomBetween(7, 15);
        var numTrees = randomBetween(15, 25);
        var numLava = 0
    }
    if (gameDiv.classList.contains("jungle-perdue")) {
        var numWalls = randomBetween(0, 7);
        var numWaters = randomBetween(1, 5);
        var numTrees = randomBetween(55, 75);
        var numLava = 0
    }
    
    // Fonction pour empécher le spawn dans un bloc
    let notInSpawn = () => {
        let posL = randomBetween(50,  (window.innerWidth - 50));
        let posT = randomBetween(50,  (window.innerHeight - 50));
        while ((posL > window.innerWidth/2 - 75 && posL < window.innerWidth/2 + 75) && (posT > window.innerHeight/2 - 75 && posT < window.innerHeight/2 + 75)) {
            posL = randomBetween(50,  (window.innerWidth - 50));
            posT = randomBetween(50,  (window.innerHeight - 50));
        }
        return {posL, posT};
    };
    



    // Fonction pour générer les éléments water
    let generateWaters = () => {
        for (var i = 0; i < numWaters; i++) {
            var water = document.createElement('div');
            water.classList.add('water')
            var position = notInSpawn()
            water.style.left = position.posL + 'px';
            water.style.top = position.posT + 'px';
            gameDiv.appendChild(water);
        }
    }

    let generateLava = () => {
        for (var i = 0; i < numLava; i++) {
            var lava = document.createElement('div');
            lava.classList.add('lava')
            var position = notInSpawn()
            lava.style.left = position.posL + 'px';
            lava.style.top = position.posT + 'px';
            gameDiv.appendChild(lava);
        }
    }

    // Fonction pour générer les éléments wall
    let generateWalls = () => {
        for (var i = 0; i < numWalls; i++) {
            var wall = document.createElement('div');
            wall.classList.add('wall');
            var position = notInSpawn()
            wall.style.left = position.posL + 'px';
            wall.style.top = position.posT + 'px';
            if ((gameDiv.classList.contains("plage-tropicale")) && (position.posT < 600)) {
                gameDiv.appendChild(wall)
            } else if (!(gameDiv.classList.contains("plage-tropicale"))) {
                gameDiv.appendChild(wall);
            }
        }
    }


    let generateTrees = () => {
        for (var i = 0; i < numTrees; i++) {
            var tree = document.createElement('div');
            tree.classList.add('tree');
            var position = notInSpawn()
            tree.style.left = position.posL + 'px';
            tree.style.top = position.posT + 'px';
            if ((gameDiv.classList.contains("plage-tropicale")) && (position.posT < 600)) {
                gameDiv.appendChild(tree)
            } else if (!(gameDiv.classList.contains("plage-tropicale"))) {
                gameDiv.appendChild(tree);
            }
        }
    }

    generateWalls();
    generateWaters();
    generateTrees();
    generateLava();
});



//MOUVEMENT


let movePlayer = () => {
    player.style.left = xPos + 'px';
    player.style.top = yPos + 'px';
};

let updatePosition = () => {
    if (!isCollideToutLesMur(wall,water,tree,lava,player, "bottom") && keyState['ArrowDown'] && yPos + speed < (window.innerHeight - 75)) { // aller en bas
        yPos += speed;
        player.classList.remove('runright', 'runleft', 'standing')
        player.classList.add('rundown')
    }
    if (!isCollideToutLesMur(wall,water,tree,lava, player, "top") && keyState['ArrowUp'] && yPos - speed > 60) { // aller en haut
        yPos -= speed;
    }
    if (!isCollideToutLesMur(wall,water,tree,lava, player, "left") && keyState['ArrowLeft'] && xPos - speed > 0) { // aller a gauche
        xPos -= speed;
        player.classList.remove('runright', 'rundown', 'standing')
        player.classList.add('runleft')
    }
    if (!isCollideToutLesMur(wall,water,tree,lava, player, "right") && keyState['ArrowRight'] && xPos + speed < (window.innerWidth - 50)) { // aller a droite
        xPos += speed;
        player.classList.remove('runleft', 'rundown', 'standing')
        player.classList.add('runright')
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
    travelPortal();
}, 1); // Environ 60 images par seconde


//TIR


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




