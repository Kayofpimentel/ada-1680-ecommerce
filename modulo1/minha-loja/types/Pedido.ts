import { ItemPedido } from "./ItemPedido.js"
export class Pedido {
  private _id: number = 0
  private _data: Date = new Date()
  private _status: string = "pendente"
  private _itens: ItemPedido[] = []

  constructor(id: number, data: Date) {
    this.id = id
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

  public get status(): string {
    return this._status
  }

  public get data(): Date {
    return this._data
  }

  public valorTotal(): number {
    return this.itens.reduce(
      (total, item) => total + item.produto.preco * item.quantidade,
      0,
    )
  }

  public adicionarItem(item: ItemPedido): void {
    this._itens.push(item)
  }

  public get itens(): ItemPedido[] {
    return this._itens
  }

  public pagar(): void {
    if (this._status != "pendente") {
      console.error("Não é possível pagar este pedido!")
      return
    }
    this._status = "pago"
    console.log(`Pedido #${this.id} pago com sucesso!`)
  }

  public enviar(): void {
    if (this._status != "pago") {
      console.error("Não é possível enviar este pedido!")
      return
    }
    this._status = "enviado"
    console.log(`Pedido #${this.id} enviado com sucesso!`)
  }

  public entregar(): void {
    if (this._status != "enviado") {
      console.error("Não é possível entregar este pedido!")
      return
    }
    this._status = "entregue"
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
    novoPedido._status = json.status
    novoPedido._itens = json.itens.map((item: any) => ItemPedido.fromData(item))
    return novoPedido
  }
}
