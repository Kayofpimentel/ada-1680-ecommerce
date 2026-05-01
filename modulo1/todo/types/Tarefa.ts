export class Tarefa {
  private concluida: boolean

  constructor(
    private descricao: string,
    private readonly id: number,
  ) {
    this.concluida = false
  }

  public getDescricao(): string {
    return this.descricao
  }

  public marcarComoConcluida(): void {
    this.concluida = true
  }

  public getId(): number {
    return this.id
  }

  public estaConcluida(): boolean {
    return this.concluida
  }
}
