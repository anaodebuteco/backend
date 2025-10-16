// index.js
import readline from "readline-sync";
import * as controlador from "./controlador.js";

const readline = require("readline-sync");
const controlador = require("./controlador.js");

function menu() {
  console.log("\n=== MENU PRINCIPAL ===");
  console.log("1 - Adicionar tarefa");
  console.log("2 - Buscar tarefa");
  console.log("3 - Atualizar tarefa");
  console.log("4 - Remover tarefa");
  console.log("5 - Sair");
}

async function escolherOpcao(opcao) {
  switch (opcao) {
    case "1": {
      const nome = readline.question("Digite o nome da tarefa: ");
      await controlador.adicionarTarefa(nome);
      break;
    }
    case "2": {
      const nome = readline.question("Digite o nome da tarefa: ");
      const tarefa = await controlador.buscarTarefa(nome);
      console.log("\n📋 Detalhes da tarefa:");
      console.log(`ID: ${tarefa.id}`);
      console.log(`Nome: ${tarefa.nome}`);
      console.log(`Concluída: ${tarefa.concluida}`);
      break;
    }
    case "3": {
      const nome = readline.question("Digite o nome da tarefa: ");
      const concluida = readline.question("A tarefa está concluída? (true/false): ");
      await controlador.atualizarTarefa(nome, concluida);
      break;
    }
    case "4": {
      const nome = readline.question("Digite o nome da tarefa: ");
      await controlador.removerTarefa(nome);
      break;
    }
    case "5":
      console.log("👋 Encerrando o programa...");
      process.exit();
    default:
      console.log("❌ Opção inválida!");
  }
}

async function main() {
  while (true) {
    menu();
    const opcao = readline.question("Escolha uma opção: ");
    await escolherOpcao(opcao);
  }
}

main();
