from flask import Flask, render_template ,request

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/game")
def game():
    selected_biome = request.args.get('biome', 'normal')  # Par défaut à 'normal' si aucun biome n'est spécifié
    return render_template('game.html', biome=selected_biome)

if __name__ == "__main__":
    app.run(debug=True)



#pour amaury ne pas effacer: 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