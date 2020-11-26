// importar o módulo do express e vincular a uma constante de mesmo nome.
// Esse modulo nos ajuda a subir o servidor do nodejs.
const express = require("express");
// vamos criar um app para representar o servidor e fazer suas execuções
const app = express();
// vamos importar o modulo do monogoose para realizar as tarefas do banco de dados
const mongoose = require("mongoose");
// importação do modulo body-parser para realiazar a conversão dos dados vindos dos clientes para o formato json.
const bodyParser = require("body-parser");
// utilização do bodyparser na nossa aplicação
app.use(bodyParser.json());
mongoose.connect(
  "mongodb+srv://Demarrage:abcd.1234@cluster0.2ijmo.mongodb.net/atividade?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
// Vamos criar um schema para realizar a estrutura da tabela de cadastro dos clientes
const tabela = new mongoose.Schema({
  nomecliente: String,
  email: String,
  telefone: String,
  cpf: String,
  idade: { type: Number, min: 16, max: 100 },
  datacadastro: { type: Date, default: Date.now },
});
// contruindo a tabela
const Cliente = mongoose.model("Cliente", tabela);
// rotas para a aplicação
// GET
app.get("/", (req, res) => {
  Cliente.find((erro, dados) => {
    if (erro) console.error(`Erro ao tentar listar os clientes ${erro}`);
    res.status(200).send({ saida: dados });
  });
});
// POST
app.post("/cadastro", (req, res) => {
  const dados = new Cliente(req.body);
  dados
    .save()
    .then(() => res.send("Cliente cadastrado com sucesso!"))
    .catch((erro) => console.error(`Erro ao tentar cadastrar ${erro}`));
});
// PUT
app.put("/atualizar", (req, res) => {
  res.send("voce esta no metodo PUT");
});
// DELETE
app.delete("/apagar/:id", (req, res) => {
  Cliente.findByIdAndDelete(req.params.id, (erro, dados) => {
    if (erro) console.error(`Erro ao tentar apagar ${erro}`);
    res.status(200).send({ resultado: "Apagado" });
  });
});
app.listen(4505);
console.log("Servidor Online...");
