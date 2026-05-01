import { ListaTarefa } from "./types/ListaTarefa.js"

const lista1 = new ListaTarefa("Tarefas do dia", [])

console.log(lista1.getNome())
lista1.listarTarefas()

lista1.adicionarTarefa("Lavar o carro")
lista1.adicionarTarefaComDataLimite("Pagar contas", new Date(2024, 5, 30))
lista1.marcarTarefaConcluida(1)
lista1.listarTarefas()

lista1.adicionarTarefa("Fazer compras")
lista1.removerTarefa(1)
lista1.adicionarTarefaComDataLimite("Enviar relatório", new Date(2024, 6, 5))
lista1.listarTarefas()
