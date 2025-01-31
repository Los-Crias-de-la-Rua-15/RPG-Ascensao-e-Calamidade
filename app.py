from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder="static")

# conexão entre back e front
@app.route('/')
def index():
    return send_from_directory(app.static_folder, "home.html")

# Dados fictícios (simulando um banco de dados)
personagens = [
    {"id": 1, "nome": "Guerreiro", "atributos": {"força": 10, "defesa": 8}},
    {"id": 2, "nome": "Mago", "atributos": {"inteligência": 12, "mana": 15}},
]

# Rota para listar personagens
@app.route('/personagens', methods=['GET'])
def listar_personagens():
    return jsonify(personagens)

# Rota para adicionar um personagem
@app.route('/personagens', methods=['POST'])
def adicionar_personagem():
    novo_personagem = request.json
    personagens.append(novo_personagem)
    return jsonify({"mensagem": "Personagem adicionado!"}), 201

# Rota para detalhes de um personagem
@app.route('/personagens/<int:id>', methods=['GET'])
def detalhes_personagem(id):
    personagem = next((p for p in personagens if p["id"] == id), None)
    if personagem:
        return jsonify(personagem)
    return jsonify({"erro": "Personagem não encontrado!"}), 404

if __name__ == '__main__':
    app.run(debug=True)
