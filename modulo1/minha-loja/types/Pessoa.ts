export interface Pessoa {
  nome: string
  sobrenome: string
  idade: number
  cpf: number

  nomeCompleto(): string
}
