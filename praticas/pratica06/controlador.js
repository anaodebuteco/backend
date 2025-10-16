// controlador.js
import { Tarefa } from "./modelo.js";

const { Tarefa } = require("./modelo.js");

async function adicionarTarefa(nome) { ... }

module.exports = { adicionarTarefa, buscarTarefa, atualizarTarefa, removerTarefa };

export async function adicionarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.inserir();
  console.log("✅ Tarefa adicionada com sucesso!");
}

export async function buscarTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.buscar();
  return tarefa;
}

export async function atualizarTarefa(nome, concluida) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.buscar();

  if (tarefa.id) {
    tarefa.concluida = concluida.toLowerCase() === "true";
    await tarefa.alterar();
    console.log("📝 Tarefa atualizada com sucesso!");
  }
}

export async function removerTarefa(nome) {
  const tarefa = new Tarefa(nome);
  await tarefa.init();
  await tarefa.buscar();

  if (tarefa.id) {
    await tarefa.deletar();
    console.log("🗑️ Tarefa removida com sucesso!");
  }
}
