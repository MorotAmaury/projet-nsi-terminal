import AjustementPositionCR.py 
import BotAttaqueCR.py 
import PlayerInRangeCR.py 

def bot(pos_joueur, pos_obstacles):
    #Fonction qui gère les actions du bbot en fonction du joueur et de l'environnement 
    if PlayerInRange(pos_joueur, pos_obstacles) == False:
        #Vérifie si le joueur est à porté
        AjustementPosition(pos_joueur, pos_obstacles)
        #Si le joueur n'est pas à porté, le bot se déplace afin de s'en rapprocher
    else:
        BotAttaque()
        #Si le joueur est à porté, le bot attaque 
    return bot(pos_joueur, pos_obstacles)
        #Relance le programme du bot de manière récursive jusqu'à sa mort, ou la fin de la partie

