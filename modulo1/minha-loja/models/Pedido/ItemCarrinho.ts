import { Produto } from "../Produto/Produto.js"
import { ProdutoFisico } from "../Produto/ProdutoFisico.js"
import { ProdutoDigital } from "../Produto/ProdutoDigital.js"

export class ItemCarrinho {
  private _produto: Produto
  private _quantidade: number = 0

  constructor(produto: Produto, quantidade: number) {
    this._produto = produto
    this.adicionarQuantidade(quantidade)
  }

  public get produto(): Produto {
    return this._produto
  }

  public get quantidade(): number {
    return this._quantidade
  }

  public adicionarQuantidade(quantidade: number): void {
    if (quantidade <= 0) {
      console.error("A quantidade não pode ser negativa ou zero!")
      return
    }
    if (quantidade > this._produto.estoque) {
      console.error("Quantidade solicitada excede o estoque disponível!")
      return
    }
    this._produto.alterarEstoque(-quantidade)
    this._quantidade += quantidade
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
    this._produto.alterarEstoque(quantidade)
    this._quantidade -= quantidade
  }

  public toJSON(): object {
    return {
      produto: this._produto.toJSON(),
      quantidade: this.quantidade,
    }
  }

  public static fromData(json: any): ItemCarrinho {
    const produto = json.produto.link
      ? ProdutoDigital.fromData(json.produto)
      : ProdutoFisico.fromData(json.produto)

    return new ItemCarrinho(produto, json.quantidade)
  }
}
