import { Pessoa } from "../../types/Pessoa.js"
import { Cliente } from "./Cliente.js"

export class ClientePessoaFisica extends Cliente implements Pessoa {
  private _nome: string = ""
  private _sobrenome: string = ""
  private _idade: number = 0
  private _cpf: number = 0

  constructor(id: number = 0, email: string = "", nome: string = "", sobrenome: string = "", idade: number = 0, cpf: string = "") {
    super(id, email)
    this.nome = nome
    this.sobrenome = sobrenome
    this.idade = idade
    this.cpf = parseInt(cpf) || 0
  }

  public get nome(): string {
    return this._nome
  }

  private set nome(novoNome: string) {
    if (novoNome.trim().length < 2) {
      console.error("O nome deve ter pelo menos 2 caracteres!")
      return
    }
    this._nome = novoNome.trim()
  }

  public get sobrenome(): string {
    return this._sobrenome
  }

  private set sobrenome(novoSobrenome: string) {
    if (novoSobrenome.trim().length < 2) {
      console.error("O sobrenome deve ter pelo menos 2 caracteres!")
      return
    }
    this._sobrenome = novoSobrenome.trim()
  }

  public get idade(): number {
    return this._idade
  }

  private set idade(novaIdade: number) {
    if (novaIdade < 0 || novaIdade > 120) {
      console.error("A idade deve estar entre 0 e 120!")
      return
    }
    this._idade = novaIdade
  }

  public get cpf(): number {
    return this._cpf
  }

  private set cpf(novoCpf: number) {
    if (novoCpf <= 0 || novoCpf.toString().length > 11) {
      console.error("CPF inválido!")
      return
    }
    this._cpf = novoCpf
  }

  nomeCompleto(): string {
    return `${this._nome} ${this._sobrenome}`.trim()
  }

  public toJSON(): object {
    return {
      id: this.id,
      email: this.email,
      nome: this._nome,
      sobrenome: this._sobrenome,
      idade: this._idade,
      cpf: this._cpf,
    }
  }

  public static fromData(json: any): Cliente {
    const novoCliente = new ClientePessoaFisica(json.id, json.email, json.nome, json.sobrenome, json.idade, json.cpf)
    return novoCliente
  }
}
