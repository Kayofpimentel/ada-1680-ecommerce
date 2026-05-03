import { Empresa } from "../../types/Empresa.js"
import { Cliente } from "./Cliente.js"

export class ClientePessoaJuridica extends Cliente implements Empresa {
  private _razaoSocial: string = ""
  private _cnpj: number = 0

  constructor(id: number, email: string, razaoSocial: string, cnpj: number) {
    super(id, email)
    this.razaoSocial = razaoSocial
    this.cnpj = cnpj
  }

  public get razaoSocial(): string {
    return this._razaoSocial
  }

  private set razaoSocial(razaoSocial: string) {
    if (!razaoSocial || razaoSocial.trim().length === 0) {
      throw new Error("Razão social não pode ser vazia")
    }
    this._razaoSocial = razaoSocial
  }

  public get cnpj(): number {
    return this._cnpj
  }

  private set cnpj(cnpj: number) {
    if (cnpj <= 0 || cnpj.toString().length !== 14) {
      throw new Error("CNPJ deve ser um número com 14 dígitos")
    }
    this._cnpj = cnpj
  }

  public toJSON(): object {
    return {
      id: this.id,
      email: this.email,
      razaoSocial: this.razaoSocial,
      cnpj: this.cnpj,
    }
  }
  public static fromData(json: any): Cliente {
    return new ClientePessoaJuridica(
      json.id,
      json.email,
      json.razaoSocial,
      json.cnpj,
    )
  }
}
