import { Pedido } from "./Pedido.js"

export class Cliente {
  private _id: number = 0
  private _nome: string = ""
  private _email: string = ""
  private _pedidos: Pedido[] = []

  constructor(id: number = 0, nome: string = "", email: string = "") {
    this.id = id
    this.nome = nome
    this.email = email
  }

  public get id(): number {
    return this._id
  }

  private set id(novoId: number) {
    if (novoId <= 0) {
      console.error("O ID do cliente deve ser um número positivo!")
      return
    }
    this._id = novoId
  }

  public get nome(): string {
    return this._nome
  }

  private set nome(novoNome: string) {
    if (novoNome.trim() === "" || novoNome.length < 3) {
      console.error("O nome do cliente deve conter pelo menos 3 caracteres!")
      return
    }
    this._nome = novoNome
  }

  public get email(): string {
    return this._email
  }

  private set email(novoEmail: string) {
    if (
      !novoEmail.includes("@") ||
      novoEmail.trim() === "" ||
      novoEmail.length < 5
    ) {
      console.error("Email inválido!")
      return
    }
    this._email = novoEmail
  }

  private get pedidos(): Pedido[] {
    return this._pedidos
  }

  public mostrarPedidos(): void {
    if (this.pedidos.length === 0) {
      console.log(`${this.nome} não possui pedidos.`)
      return
    }

    console.log(`Pedidos de ${this.nome}:`)
    this.pedidos.forEach((pedido) => {
      pedido.imprimirPedido()
    })

    console.log(`Total gasto: R$${this.valorGasto().toFixed(2)}\n`)
  }

  public mostrarPedido(pedidoId: number): void {
    const pedido = this.pedidos.find((p) => p.id === pedidoId)
    if (!pedido) {
      console.log(
        `Pedido #${pedidoId} não encontrado para o cliente ${this.nome}.`,
      )
      return
    }
    console.log(
      `Segue as informações do pedido ${pedido.id} do cliente ${this.nome}:`,
    )
    pedido.imprimirPedido()
  }

  public adicionarPedido(pedido: Pedido): void {
    this._pedidos.push(pedido)
    console.log(`Pedido #${pedido.id} do ${this.nome} criado!`)
  }

  public valorGasto(): number {
    return this.pedidos.reduce(
      (total, pedido) => total + pedido.valorTotal(),
      0,
    )
  }
}
