import AjustementPositionLR.py 
import BotAttaqueLR.py 
import PlayerInRangeLR.py 


def bot(pos_joueur, pos_obstacles):

    if PlayerInRange(pos_joueur, pos_obstacles):

        BotAttaque()

        return bot(pos_joueur, pos_obstacles)
    
    