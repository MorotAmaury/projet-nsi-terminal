
class Equipement:
    def __init__(self, id, texture):
        self.id = id
        self.texture =texture

    def get_id(self):
        return self.id
    
    def set_id(self, id):
        self.id = id
    
    def get_texture(self):
        return self.texture
    
    def set_texture(self, texture):
        self.texture = texture


# Création d'un équipement avec une texture
equipement1 = Equipement(1, "th.webp")

