import { Tarefa } from "./Tarefa.js"

export class TarefaDataLimite extends Tarefa {
  private dataLimite: Date

  constructor(descriao: string, id: number, dataLimite: Date) {
    super(descriao, id)
    this.dataLimite = dataLimite
  }

  public getDataLimite(): Date {
    return this.dataLimite
  }

  public setDataLimite(dataLimite: Date): void {
    this.dataLimite = dataLimite
  }
}
