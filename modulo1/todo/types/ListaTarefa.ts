import { Tarefa } from "./Tarefa.js"
import { TarefaDataLimite } from "./TarefaDataLimite.js"

export class ListaTarefa {
  private tarefaIdCounter: number

  constructor(
    private nome: string,
    private tarefas: Tarefa[],
  ) {
    this.tarefaIdCounter = 1
  }

  public getNome(): string {
    return this.nome
  }

  public setNome(nome: string): void {
    this.nome = nome
  }

  public adicionarTarefa(descricao: string): void {
    const tarefa = new Tarefa(descricao, this.tarefaIdCounter++)
    this.tarefas.push(tarefa)
    console.log(`Tarefa "${descricao}" adicionada.`)
  }

  public adicionarTarefaComDataLimite(
    descricao: string,
    dataLimite: Date,
  ): void {
    const tarefa = new TarefaDataLimite(
      descricao,
      this.tarefaIdCounter++,
      dataLimite,
    )
    this.tarefas.push(tarefa)
    console.log(
      `Tarefa "${descricao}" com data limite ${dataLimite.toLocaleDateString()} adicionada.`,
    )
  }

  public listarTarefas(): void {
    console.log(`Tarefas da lista "${this.nome}":`)
    this.tarefas.forEach((t) => {
      console.log(
        `- [${t.estaConcluida() ? "x" : ""}] ${t.getDescricao()} (ID: ${t.getId()})`,
      )
    })
    console.log("")
  }

  public marcarTarefaConcluida(id: number): void {
    const tarefa = this.tarefas.find((t) => t.getId() === id)
    if (tarefa) {
      tarefa.marcarComoConcluida()
    }
  }

  public removerTarefa(id: number): void {
    const tarefa = this.tarefas.find((t) => t.getId() === id)
    if (tarefa) {
      console.log(`Tarefa "${tarefa.getDescricao()}" removida.`)
    }

    this.tarefas = this.tarefas.filter((t) => t.getId() !== id)
  }
}
