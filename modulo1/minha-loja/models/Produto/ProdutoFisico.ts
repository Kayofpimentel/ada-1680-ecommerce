import { Produto } from "./Produto.js"
export class ProdutoFisico extends Produto {
  private _peso: number = 0

  constructor(
    id: number,
    nome: string,
    preco: number,
    peso: number,
    descricao: string = "",
    estoque: number = 0,
  ) {
    super(id, nome, preco, descricao, estoque)
    this._peso = peso
  }

  public get peso(): number {
    return this._peso
  }

  public set peso(novoPeso: number) {
    if (novoPeso <= 0) {
      console.error("O peso não pode ser negativo ou zero!")
      return
    }
    this._peso = novoPeso
  }

  public toJSON(): object {
    return {
      id: this.id,
      nome: this.nome,
      preco: this.preco,
      descricao: this.descricao,
      estoque: this.estoque,
      peso: this.peso,
    }
  }

  public static fromData(json: any): ProdutoFisico {
    return new ProdutoFisico(
      json.id,
      json.nome,
      json.preco,
      json.peso,
      json.descricao ?? "",
      json.estoque ?? 0,
    )
  }
}
