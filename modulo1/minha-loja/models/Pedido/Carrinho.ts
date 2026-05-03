import { Produto } from "../Produto/Produto.js"
import { ItemCarrinho } from "./ItemCarrinho.js"
import { Pedido } from "./Pedido.js"

export class Carrinho {
  private _itens: ItemCarrinho[] = []

  public get itens(): ItemCarrinho[] {
    return this._itens
  }

  public adicionarProduto(produto: Produto, quantidade: number): void {
    const itemExistente = this._itens.find(
      (item) => item.produto.id === produto.id,
    )
    if (itemExistente) {
      itemExistente.adicionarQuantidade(quantidade)
    } else {
      this._itens.push(new ItemCarrinho(produto, quantidade))
    }
  }

  public removerProduto(produtoId: number, quantidade: number): void {
    const itemExistente = this._itens.find(
      (item) => item.produto.id === produtoId,
    )
    if (itemExistente) {
      itemExistente.removerQuantidade(quantidade)
      if (itemExistente.quantidade === 0) {
        this._itens = this._itens.filter(
          (item) => item.produto.id !== produtoId,
        )
      }
    }
  }

  public gerarPedido(id: number): Pedido {
    if (this._itens.length === 0) throw new Error("Carrinho vazio!")
    const pedido = new Pedido(id, new Date())
    this._itens.forEach((item) => pedido.adicionarItem(item))
    this._itens = []
    return pedido
  }

  public calcularTotal(): number {
    return this._itens.reduce(
      (total, item) => total + item.produto.preco * item.quantidade,
      0,
    )
  }

  public toJSON(): object {
    return {
      itens: this._itens.map((item) => item.toJSON()),
    }
  }
}
