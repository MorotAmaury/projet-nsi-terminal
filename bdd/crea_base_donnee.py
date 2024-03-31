import sqlite3

# Connexion à la base de données (créera un fichier si inexistant)
connexion = sqlite3.connect('BDD_projet.db')

# Création d'un curseur pour exécuter des requêtes
curseur = connexion.cursor()


try:
    curseur.execute('''CREATE TABLE utilisateurs (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        pseudo TEXT NOT NULL,
                        mdp TEXT NOT NULL,
                        top_score INT
                        )''')
except sqlite3.OperationalError:#prevoi les messages d'erreur 
    print("la table existe déjà")
try:
    curseur.execute('''CREATE TABLE equipements_uti (
                        id_equipements INTEGER,
                        id_utilisateur INTEGER,
                        FOREIGN KEY(id_utilisateur) REFERENCES utilisateurs(id)
                        FOREIGN KEY(id_equipements) REFERENCES diff_equipements(id_equipements)
                        )''')
except sqlite3.OperationalError:
    print("la table existe déjà")
    
try:
    curseur.execute('''CREATE TABLE diff_equipements (
                        id_equipements INTEGER PRIMARY KEY AUTOINCREMENT,
                        nom_equipement TEXT NOT NULL,
                        texture TEXT NOT NULL, #nom du fichier
                        )''')
except sqlite3.OperationalError:
    print("la table existe déjà")


# Commit pour valider les modifications
connexion.commit()

# Fermeture de la connexion
connexion.close()



"""FONCTIONS UTILISATEURS"""
def ajout_utilisateur(pseudo,mdp):
    connexion = sqlite3.connect('BDD_projet.db')
    curseur = connexion.cursor()
    
    curseur.execute("INSERT INTO utilisateurs (pseudo,mdp,top_score) VALUES (?, ?, 0)", (pseudo, mdp))
    
    connexion.commit()
    connexion.close()
    
def suppression_utilisateur(pseudo,mdp):
    connexion = sqlite3.connect('BDD_projet.db')
    curseur = connexion.cursor()
    
    curseur.execute("DELETE FROM utilisateurs WHERE pseudo=? AND mdp=?", (pseudo, mdp))
    
    connexion.commit()
    connexion.close()

"""FONCTIONS TOP_SCORE"""
def nouveau_top_score(pseudo,nv_top_score):
    connexion = sqlite3.connect('BDD_projet.db')
    curseur = connexion.cursor()
    
    curseur.execute("UPDATE utilisateurs SET top_score=? WHERE pseudo=?", (nv_top_score, pseudo))
    
    connexion.commit()
    connexion.close()
    
def recup_top_score(id_uti):
    connexion = sqlite3.connect('BDD_projet.db')
    curseur = connexion.cursor()
    
    curseur.execute("SELECT top_score FROM utilisateurs WHERE id=?", (id_uti,))
    
    connexion.commit()
    connexion.close()

"""FONCTIONS EQUIPEMENTS"""
def crea_equipement(nom,texture):
    connexion = sqlite3.connect('BDD_projet.db')
    curseur = connexion.cursor()
    
    curseur.execute("INSERT INTO diff_equipements (nom_equipement,texture) VALUES (?, ?)", (nom_equipement, texture))
    
    connexion.commit()
    connexion.close()
    

def ajout_equipement_uti(id_uti,id_equip):
    connexion = sqlite3.connect('BDD_projet.db')
    curseur = connexion.cursor()
    
    curseur.execute("INSERT INTO equipements_uti (id_equipements,id_utilisateur) VALUES (?, ?)", (id_equip, id_uti))
    
    connexion.commit()
    connexion.close()


def recup_equip(id_uti):
    connexion = sqlite3.connect('BDD_projet.db')
    curseur = connexion.cursor()
    
    curseur.execute("SELECT id_equipements FROM equipements_uti WHERE id_utilisateur=?", (id_uti,))
    
    connexion.commit()
    connexion.close()





