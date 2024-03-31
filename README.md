# projet-nsi-terminal
- jeu de type roguelike (archero)
- pve avec des salles générées procéduralement (fait approximativement)
- deplacement avec les fleche , visée avec la souris ( fait)
- gestion utilisateurs + score (pas fait)
- gestion inventaire , loot , capacités (pas fait)



Pour faire marcher le projet, s'assurer de bien avoir le dossier static, templates ainsi que les fichier game.html index.html
app.py game.js biome.js game/home/styles.css 

Ensuite lancer le projet en executant dans le terminal python app.py ou python3 app.py et puis allez sur localhost:5000 dans 
le navigateur 

Pour ce deplacer utiliser les fleche directive du clavier, pour tirer cliquer a un endroit de l'ecran

On a pas eu le temps necessaire pour finir l'idee intial qui etais probablement un peu trop ambitieuse 
Ce qu'on aurait voulue faire: 
    - ajouter des monstres qui tire controller par IA en python 
    - un monde generer un peu plus intelligement (pas juste des carrer positionner aleatoirement)
    - faire un systeme de score et d'user stocker dans une base de donner 
    - un systeme avec un inventaire et des capaciter du joueur 

Finalement ce qu'on a fait: 
    - La fichier et les fonction pour utiliser la base de donnees (meme si pas utiliser)
    - Des mur qui sont generer aleatoirement sur le terrain
    - Un personnage qui peut se deplacer et tirer (ne pouvant pas se deplacer dans les mur)
    - Le commencement de l'IA pour les monstres (qui ne sont pas present)
