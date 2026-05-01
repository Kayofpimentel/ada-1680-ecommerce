export class Produto {
  private _id: number = 0
  private _nome: string = ""
  private _preco: number = 1

  constructor(id: number, nome: string, preco: number) {
    this.id = id
    this.nome = nome
    this.preco = preco
  }

  public get id(): number {
    return this._id
  }

  private set id(novoId: number) {
    if (novoId <= 0) {
      console.error("O ID do produto deve ser um número positivo!")
      return
    }
    this._id = novoId
  }

  public get nome(): string {
    return this._nome
  }

  private set nome(novoNome: string) {
    if (novoNome.trim() === "" || novoNome.length < 3) {
      console.error("O nome do produto deve conter pelo menos 3 caracteres!")
      return
    }
    this._nome = novoNome
  }

  public get preco(): number {
    return Math.round(this._preco * 100) / 100
  }

  public set preco(novoPreco: number) {
    if (novoPreco <= 0) {
      console.error("O preço não pode ser negativo!")
      return
    }
    this._preco = novoPreco
  }

  public toJSON(): object {
    return {
      id: this.id,
      nome: this.nome,
      preco: this.preco,
    }
  }

  public static fromData(json: any): Produto {
    return new Produto(json.id, json.nome, json.preco)
  }
}
