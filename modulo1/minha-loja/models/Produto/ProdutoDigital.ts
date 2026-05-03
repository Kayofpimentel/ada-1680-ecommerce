import { Produto } from "./Produto.js"

export class ProdutoDigital extends Produto {
  private _link: string = ""

  constructor(
    id: number,
    nome: string,
    preco: number,
    link: string,
    descricao: string = "",
    estoque: number = 0,
  ) {
    super(id, nome, preco, descricao, estoque)
    this._link = link
  }

  public get link(): string {
    return this._link
  }

  public set link(novoLink: string) {
    if (novoLink.trim() === "") {
      console.error("O link do produto digital não pode ser vazio!")
      return
    }
    this._link = novoLink
  }

  public toJSON(): object {
    return {
      id: this.id,
      nome: this.nome,
      preco: this.preco,
      descricao: this.descricao,
      estoque: this.estoque,
      link: this.link,
    }
  }

  public static fromData(json: any): ProdutoDigital {
    return new ProdutoDigital(
      json.id,
      json.nome,
      json.preco,
      json.link,
      json.descricao ?? "",
      json.estoque ?? 0,
    )
  }
}
