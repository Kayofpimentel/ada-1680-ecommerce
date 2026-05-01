import { Produto } from "./Produto.js"

export class ItemPedido {
  private _produto: Produto
  private _quantidade: number = 0

  constructor(produto: Produto, quantidade: number) {
    this._produto = produto
    this.adicionarProduto(produto, quantidade)
  }

  public get produto(): Produto {
    return this._produto
  }

  public get quantidade(): number {
    return this._quantidade
  }

  private adicionarProduto(novoProduto: Produto, novaQuantidade: number): void {
    if (novaQuantidade <= 0) {
      console.error("A quantidade não pode ser negativa ou zero!")
      return
    }
    this._quantidade = novaQuantidade
  }

  public removerQuantidade(quantidade: number): void {
    if (quantidade <= 0) {
      console.error("A quantidade a remover não pode ser negativa ou zero!")
      return
    }
    if (quantidade > this._quantidade) {
      console.error(
        "A quantidade a remover é maior do que a quantidade disponível!",
      )
      return
    }
    this._quantidade -= quantidade
  }

  public toJSON(): object {
    return {
      idProduto: this.produto.id,
      nomeProduto: this.produto.nome,
      precoUnitario: this.produto.preco,
      quantidade: this.quantidade,
    }
  }

  public static fromData(json: any): ItemPedido {
    const produto = new Produto(
      json.idProduto,
      json.nomeProduto,
      json.precoUnitario,
    )
    return new ItemPedido(produto, json.quantidade)
  }
}
