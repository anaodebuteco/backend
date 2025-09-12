const express = require("express");

const app = express();


let tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];


app.use(express.json());


app.use((req, res, next) => {
  const data = new Date().toISOString();
  console.log(`[${data}] ${req.method} ${req.url}`);
  next();
});

module.exports = app; 


app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});

const router = express.Router();

// GET /tarefas → lista todas
router.get("/", (req, res) => {
  res.json(tarefas);
});

// POST /tarefas → cria nova
router.post("/", (req, res) => {
  const novaTarefa = {
    id: tarefas.length + 1,
    nome: req.body.nome,
    concluida: req.body.concluida || false
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// GET /tarefas/:tarefaId → busca por id
router.get("/:tarefaId", (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) {
    return next(new Error("Tarefa não localizada"));
  }
  res.json(tarefa);
});

// PUT /tarefas/:tarefaId → atualiza
router.put("/:tarefaId", (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) {
    return next(new Error("Tarefa não localizada"));
  }
  tarefa.nome = req.body.nome ?? tarefa.nome;
  tarefa.concluida = req.body.concluida ?? tarefa.concluida;
  res.json(tarefa);
});

// DELETE /tarefas/:tarefaId → remove
router.delete("/:tarefaId", (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const index = tarefas.findIndex(t => t.id === id);
  if (index === -1) {
    return next(new Error("Tarefa não localizada"));
  }
  tarefas.splice(index, 1);
  res.status(204).send();
});

// Usando o router
app.use("/tarefas", router);

// Middleware de erro
app.use((err, req, res, next) => {
    res.status(400).json({ erro: err.message });
  });
  