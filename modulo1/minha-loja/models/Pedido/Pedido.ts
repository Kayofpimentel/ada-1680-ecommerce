import { StatusPedido } from "../../types/StatusPedido.js"
import { ItemCarrinho } from "./ItemCarrinho.js"

export class Pedido {
  private _id: number = 0
  private _data: Date = new Date()
  private _status: StatusPedido = StatusPedido.PENDENTE
  private _itens: ItemCarrinho[] = []

  constructor(id: number, data: Date) {
    this.id = id
    this.data = data
  }

  public get id(): number {
    return this._id
  }

  private set id(novoId: number) {
    if (novoId <= 0) {
      console.error("O ID do pedido deve ser um número positivo!")
      return
    }
    this._id = novoId
  }

  public get data(): Date {
    return this._data
  }

  private set data(novaData: Date) {
    if (novaData > new Date()) {
      console.error("A data do pedido não pode ser no futuro!")
      return
    }
    this._data = novaData
  }

  public get status(): StatusPedido {
    return this._status
  }

  private set status(novoStatus: StatusPedido) {
    if (!Object.values(StatusPedido).includes(novoStatus)) {
      console.error("Status do pedido inválido!")
      return
    }
    this._status = novoStatus
  }

  public get itens(): ItemCarrinho[] {
    return this._itens
  }

  private set itens(novosItens: ItemCarrinho[]) {
    this._itens = novosItens
  }

  public adicionarItem(item: ItemCarrinho): void {
    this._itens.push(item)
  }

  public valorTotal(): number {
    return this.itens.reduce(
      (total, item) => total + item.produto.preco * item.quantidade,
      0,
    )
  }

  public pagar(): void {
    if (this._status !== StatusPedido.PENDENTE) {
      console.error("Não é possível pagar este pedido!")
      return
    }
    this._status = StatusPedido.PAGO
    console.log(`Pedido #${this.id} pago com sucesso!`)
  }

  public enviar(): void {
    if (this._status !== StatusPedido.PAGO) {
      console.error("Não é possível enviar este pedido!")
      return
    }
    this._status = StatusPedido.ENVIADO
    console.log(`Pedido #${this.id} enviado com sucesso!`)
  }

  public entregar(): void {
    if (this._status !== StatusPedido.ENVIADO) {
      console.error("Não é possível entregar este pedido!")
      return
    }
    this._status = StatusPedido.ENTREGUE
    console.log(`Pedido #${this.id} entregue com sucesso!`)
  }

  public imprimirPedido(): void {
    console.log(`\nPedido #${this.id}`)
    console.log(`Data: ${this.data.toLocaleDateString()}`)
    console.log(`Itens:`)
    this.itens.forEach((item) => {
      console.log(
        `- ${item.produto.nome} (Quantidade: ${item.quantidade}, Preço: R$${item.produto.preco.toFixed(2)})`,
      )
    })
    console.log(`Total: R$${this.valorTotal().toFixed(2)}`)
    console.log(`**** Status: ${this._status} ****\n`)
  }

  public toJSON(): object {
    return {
      id: this._id,
      data: this._data.toLocaleString(),
      status: this._status,
      itens: this._itens.map((item) => item.toJSON()),
    }
  }

  public static fromData(json: any): Pedido {
    const novoPedido = new Pedido(json.id, new Date(json.data))
    novoPedido._status = json.status as StatusPedido
    novoPedido.itens = Array.isArray(json.itens)
      ? json.itens.map((item: any) => ItemCarrinho.fromData(item))
      : []
    return novoPedido
  }
}
