export abstract class Produto {
  private _id: number = 0
  private _nome: string = ""
  private _preco: number = 1
  private _descricao: string = ""
  private _estoque: number = 0

  constructor(
    id: number,
    nome: string,
    preco: number,
    descricao: string,
    estoque: number,
  ) {
    this.id = id
    this.nome = nome
    this.preco = preco
    this.descricao = descricao
    this.estoque = estoque
  }

  public get id(): number {
    return this._id
  }

  protected set id(novoId: number) {
    if (novoId <= 0) {
      console.error("O ID do produto deve ser um número positivo!")
      return
    }
    this._id = novoId
  }

  public get nome(): string {
    return this._nome
  }

  protected set nome(novoNome: string) {
    if (novoNome.trim() === "" || novoNome.length < 3) {
      console.error("O nome do produto deve conter pelo menos 3 caracteres!")
      return
    }
    this._nome = novoNome
  }

  public get preco(): number {
    return Math.round(this._preco * 100) / 100
  }

  protected set preco(novoPreco: number) {
    if (novoPreco <= 0) {
      console.error("O preço não pode ser negativo!")
      return
    }
    this._preco = novoPreco
  }

  public get descricao(): string {
    return this._descricao
  }

  protected set descricao(novaDescricao: string) {
    if (novaDescricao.trim() === "" || novaDescricao.length < 3) {
      console.error(
        "A descrição do produto deve conter pelo menos 3 caracteres!",
      )
      return
    }
    this._descricao = novaDescricao
  }

  public get estoque(): number {
    return this._estoque
  }

  protected set estoque(estoque: number) {
    if (estoque < 0) {
      console.error("O estoque não pode ser negativo!")
      return
    }
    this._estoque = estoque
  }

  //Mudando o nome de baixarEstoque para alterarEstoque com o intuito de deixar claro que a função pode tanto aumentar quanto diminuir o estoque
  public alterarEstoque(quantidade: number): void {
    const novoEstoque = this.estoque + quantidade
    if (novoEstoque < 0) {
      console.error("O estoque não pode ser negativo!")
      return
    }
    this._estoque = novoEstoque
  }

  abstract toJSON(): object
}
