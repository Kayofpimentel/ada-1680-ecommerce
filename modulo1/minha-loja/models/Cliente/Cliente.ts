import { Pedido } from "../Pedido/Pedido.js"
import { Carrinho } from "../Pedido/Carrinho.js"

export abstract class Cliente {
  private _id: number = 0
  private _email: string = ""
  private _pedidos: Pedido[] = []
  private _carrinho: Carrinho = new Carrinho()

  constructor(id: number = 0, email: string = "") {
    this.id = id
    this.email = email
  }

  public get id(): number {
    return this._id
  }

  protected set id(novoId: number) {
    if (novoId <= 0) {
      console.error("O ID do cliente deve ser um número positivo!")
      return
    }
    this._id = novoId
  }

  public get email(): string {
    return this._email
  }

  protected set email(novoEmail: string) {
    if (!novoEmail.includes("@") || novoEmail.trim() === "" || novoEmail.length < 5) {
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
      console.log(`Ainda não foram realizados pedidos.`)
      return
    }

    console.log(`Histórico de pedidos:`)
    this.pedidos.forEach((pedido) => {
      pedido.imprimirPedido()
    })

    console.log(`Total gasto: R$${this.valorGasto().toFixed(2)}\n`)
  }

  public mostrarPedido(pedidoId: number): void {
    const pedido = this.pedidos.find((p) => p.id === pedidoId)
    if (!pedido) {
      console.log(`Pedido #${pedidoId} não encontrado.`)
      return
    }
    console.log(`Segue as informações do pedido ${pedido.id}:`)
    pedido.imprimirPedido()
  }

  public adicionarAoCarrinho(produto: any, quantidade: number): void {
    this._carrinho.adicionarProduto(produto, quantidade)
  }

  public removerDoCarrinho(produtoId: number, quantidade: number): void {
    this._carrinho.removerProduto(produtoId, quantidade)
  }

  public calcularTotalCarrinho(): number {
    return this._carrinho.calcularTotal()
  }

  public finalizarCompra(): void {
    const pedido = this._carrinho.gerarPedido(this._pedidos.length + 1)
    this._pedidos.push(pedido)
    console.log(`Pedido #${pedido.id} gerado. Total: R$${pedido.valorTotal().toFixed(2)}\n`)
  }

  public pagarPedido(id: number): void {
    const pedido = this._pedidos.find((p) => p.id === id)
    if (!pedido) {
      console.error(`Pedido #${id} não encontrado.`)
      return
    }
    pedido.pagar()
  }

  public enviarPedido(id: number): void {
    const pedido = this._pedidos.find((p) => p.id === id)
    if (!pedido) {
      console.error(`Pedido #${id} não encontrado.`)
      return
    }
    pedido.enviar()
  }

  public entregarPedido(id: number): void {
    const pedido = this._pedidos.find((p) => p.id === id)
    if (!pedido) {
      console.error(`Pedido #${id} não encontrado.`)
      return
    }
    pedido.entregar()
  }

  public valorGasto(): number {
    return this.pedidos.reduce((total, pedido) => total + pedido.valorTotal(), 0)
  }

  abstract toJSON(): object
}
