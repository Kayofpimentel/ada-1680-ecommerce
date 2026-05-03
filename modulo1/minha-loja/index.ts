import { ClientePessoaFisica } from "./models/Cliente/ClientePessoaFisica.js"
import { ClientePessoaJuridica } from "./models/Cliente/ClientePessoaJuridica.js"
import { ProdutoFisico } from "./models/Produto/ProdutoFisico.js"
import { ProdutoDigital } from "./models/Produto/ProdutoDigital.js"
import { ItemCarrinho } from "./models/Pedido/ItemCarrinho.js"
import { Pedido } from "./models/Pedido/Pedido.js"

console.log("  SEÇÃO 1 — INSTÂNCIAS DAS CLASSES\n")

// (id, nome, preco, peso, descricao, estoque)
const camiseta = new ProdutoFisico(1, "Camiseta", 49.9, 0.3, "Camiseta de algodão", 10)
// (id, nome, preco, link, descricao, estoque)
const cursoTs = new ProdutoDigital(2, "Curso TypeScript", 79.9, "https://ada.tech/curso-ts", "Curso completo de TypeScript", 999)
// (id, email, nome, sobrenome, idade, cpf)
const joao = new ClientePessoaFisica(1, "joao.silva@example.com", "João", "Silva", 30, "12345678901")
// (id, email, razaoSocial, cnpj)
const empresaABC = new ClientePessoaJuridica(2, "contato@abc.com.br", "ABC Comércio Ltda", 12345678000195)

console.log(`  ProdutoFisico  : ${camiseta.nome} | R$${camiseta.preco} | Estoque: ${camiseta.estoque} | Peso: ${camiseta.peso}kg`)
console.log(`  ProdutoDigital : ${cursoTs.nome} | R$${cursoTs.preco} | Link: ${cursoTs.link}`)
console.log(`  ClientePF      : ${joao.nomeCompleto()} | ${joao.email} | CPF: ${joao.cpf}`)
console.log(`  ClientePJ      : ${empresaABC.razaoSocial} | CNPJ: ${empresaABC.cnpj} | ${empresaABC.email}`)

console.log("  SEÇÃO 2 — VALIDAÇÕES NOS SETTERS\n")

console.log("--- Produto: ID inválido (≤ 0) ---")
const prodIdInvalido = new ProdutoFisico(-1, "Produto Inválido", 10, 0.1, "desc", 1)
console.log(`  ID resultante: ${prodIdInvalido.id} (esperado: 0 — setter rejeitou)\n`)

console.log("--- Produto: preço inválido (≤ 0) ---")
const prodPrecoInvalido = new ProdutoFisico(6, "Produto Barato", -10, 0.1, "desc", 1)
console.log(`  Preço resultante: ${prodPrecoInvalido.preco} (esperado: 1 — valor padrão)\n`)

console.log("--- Produto: nome muito curto ---")
const prodNomeCurto = new ProdutoFisico(7, "AB", 10, 0.1, "desc", 1)
console.log(`  Nome resultante: "${prodNomeCurto.nome}" (esperado: "" — setter rejeitou)\n`)

console.log("--- Produto: estoque negativo ---")
const prodEstoqueNeg = new ProdutoFisico(8, "Produto Teste", 20, 0.5, "desc", -5)
console.log(`  Estoque resultante: ${prodEstoqueNeg.estoque} (esperado: 0 — setter rejeitou)\n`)

console.log("--- Cliente PF: nome muito curto ---")
const clienteNomeInvalido = new ClientePessoaFisica(9, "teste@email.com", "A", "Silva", 20, "12345678901")
console.log(`  Nome resultante: "${clienteNomeInvalido.nome}" (esperado: "" — setter rejeitou)\n`)

console.log("--- Cliente PF: email inválido ---")
const clienteEmailInvalido = new ClientePessoaFisica(10, "emailsemarroba", "Carlos", "Lima", 28, "12345678901")
console.log(`  Email resultante: "${clienteEmailInvalido.email}" (esperado: "" — setter rejeitou)\n`)

console.log("--- Cliente PF: idade errada ---")
const clienteIdadeInvalida = new ClientePessoaFisica(11, "idoso@email.com", "Velho", "Demais", 200, "12345678901")
console.log(`  Idade resultante: ${clienteIdadeInvalida.idade} (esperado: 0 — setter rejeitou)\n`)

console.log("--- Cliente PJ: CNPJ com quantidade errada de dígitos ---")
try {
  const pjCnpjInvalido = new ClientePessoaJuridica(12, "pj@email.com", "Empresa Inválida", 123)
  console.log(`  CNPJ resultante: ${pjCnpjInvalido.cnpj}`)
} catch (e: any) {
  console.log(`  Erro capturado (esperado): ${e.message}\n`)
}

console.log("  SEÇÃO 3 — LÓGICA DO CARRINHO\n")

const itemCamisa = new ItemCarrinho(camiseta, 2)
console.log(`  Criado ItemCarrinho: ${camiseta.nome} x${itemCamisa.quantidade} | Estoque reservado: ${camiseta.estoque}\n`)

console.log("--- Merge: adicionar mais do mesmo produto ---")
itemCamisa.adicionarQuantidade(3)
console.log(`  Quantidade: ${itemCamisa.quantidade} (esperado: 5) | Estoque: ${camiseta.estoque}\n`)

console.log("--- Tentar adicionar além do estoque disponível ---")
itemCamisa.adicionarQuantidade(999)
console.log(`  Quantidade: ${itemCamisa.quantidade}\n`)

console.log("--- Remover quantidade parcial ---")
itemCamisa.removerQuantidade(2)
console.log(`  Quantidade: ${itemCamisa.quantidade} (esperado: 3) | Estoque devolvido: ${camiseta.estoque}\n`)

console.log("--- calcularTotal via joao ---")
joao.adicionarAoCarrinho(camiseta, 2)
joao.adicionarAoCarrinho(cursoTs, 1)

console.log(`  Total esperado: R$${(2 * 49.9 + 79.9).toFixed(2)}`)
console.log(`  Total calculado: R$${joao.calcularTotalCarrinho().toFixed(2)}\n`)

console.log("  SEÇÃO 4 — CICLO DE STATUS DO PEDIDO\n")

joao.finalizarCompra() // pedido #1 → pendente
joao.mostrarPedido(1)

console.log("--- Tentar enviar sem pagar (transição inválida) ---")
joao.enviarPedido(1)

console.log("--- Pagar ---")
joao.pagarPedido(1)

console.log("--- Tentar pagar novamente (transição inválida) ---")
joao.pagarPedido(1)

console.log("--- Enviar e entregar ---")
joao.enviarPedido(1)
joao.entregarPedido(1)
joao.mostrarPedido(1)

console.log("  SEÇÃO 5 — CONTROLE DE ESTOQUE\n")

console.log(`  Estoque inicial: ${camiseta.estoque}`) // 5

camiseta.alterarEstoque(-3) // 5 → 2
console.log(`  Após baixar 3: ${camiseta.estoque} (esperado: 2)`)

camiseta.alterarEstoque(-10) // guard, stays 2
console.log(`  Após tentar baixar 10 (inválido): ${camiseta.estoque} (esperado: 2)`)

camiseta.alterarEstoque(8) // 2 → 10
console.log(`  Após repor 8: ${camiseta.estoque} (esperado: 10)\n`)

console.log("  SEÇÃO 6 — SERIALIZAÇÃO E DESSERIALIZAÇÃO")

const prodFisicoRecriado = ProdutoFisico.fromData(JSON.parse(JSON.stringify(camiseta.toJSON())))
console.log("--- ProdutoFisico ---")
console.log(`  Original : ${camiseta.nome} | R$${camiseta.preco} | ${camiseta.estoque} un`)
console.log(`  Recriado : ${prodFisicoRecriado.nome} | R$${prodFisicoRecriado.preco} | ${prodFisicoRecriado.estoque} un\n`)

const prodDigitalRecriado = ProdutoDigital.fromData(JSON.parse(JSON.stringify(cursoTs.toJSON())))
console.log("--- ProdutoDigital ---")
console.log(`  Original : ${cursoTs.nome} | ${cursoTs.link}`)
console.log(`  Recriado : ${prodDigitalRecriado.nome} | ${prodDigitalRecriado.link}\n`)

const pfRecriado = ClientePessoaFisica.fromData(JSON.parse(JSON.stringify(joao.toJSON())))
console.log("--- ClientePessoaFisica ---")
console.log(`  Original : ${joao.nomeCompleto()} | ${joao.email}`)
console.log(`  Recriado : ${(pfRecriado as ClientePessoaFisica).nomeCompleto()} | ${pfRecriado.email}\n`)

const pjRecriado = ClientePessoaJuridica.fromData(JSON.parse(JSON.stringify(empresaABC.toJSON())))
console.log("--- ClientePessoaJuridica ---")
console.log(`  Original : ${empresaABC.razaoSocial} | CNPJ: ${empresaABC.cnpj}`)
console.log(`  Recriado : ${(pjRecriado as ClientePessoaJuridica).razaoSocial} | CNPJ: ${(pjRecriado as ClientePessoaJuridica).cnpj}\n`)

const pedidoSerial = new Pedido(80, new Date())
pedidoSerial.adicionarItem(new ItemCarrinho(camiseta, 1)) // camiseta: 10 → 9
pedidoSerial.pagar()
const pedidoRecriado = Pedido.fromData(JSON.parse(JSON.stringify(pedidoSerial.toJSON())))
console.log("--- Pedido ---")
console.log(`  Original : Pedido #${pedidoSerial.id} | Status: ${pedidoSerial.status} | Total: R$${pedidoSerial.valorTotal()}`)
console.log(`  Recriado : Pedido #${pedidoRecriado.id} | Status: ${pedidoRecriado.status} | Total: R$${pedidoRecriado.valorTotal()}\n`)

console.log("  SEÇÃO 7 — FLUXO COMPLETO\n")

joao.adicionarAoCarrinho(camiseta, 2) // camiseta: 9 → 7
joao.adicionarAoCarrinho(cursoTs, 1) // cursoTs: 998 → 997
joao.adicionarAoCarrinho(camiseta, 1) // merge: 3×camiseta | camiseta: 7 → 6
console.log(`  Total no carrinho: R$${joao.calcularTotalCarrinho().toFixed(2)}`)
console.log(`  (esperado: 3 × R$49.90 + 1 × R$79.90 = R$${(3 * 49.9 + 79.9).toFixed(2)})\n`)

joao.removerDoCarrinho(camiseta.id, 1) // 2×camiseta | camiseta: 6 → 7
console.log(`  Após remover 1 camiseta: R$${joao.calcularTotalCarrinho().toFixed(2)}`)
console.log(`  (esperado: 2 × R$49.90 + 1 × R$79.90 = R$${(2 * 49.9 + 79.9).toFixed(2)})\n`)

console.log("--- Finalizar compra (joao) — pedido #2 ---")
joao.finalizarCompra()

console.log("--- Tentar finalizar com carrinho vazio ---")
try {
  joao.finalizarCompra()
} catch (e: any) {
  console.log(`  Erro capturado (esperado): ${e.message}\n`)
}

console.log("--- Histórico completo de pedidos (joao) ---")
joao.mostrarPedidos()

console.log("--- empresaABC: compra e histórico ---")
empresaABC.adicionarAoCarrinho(cursoTs, 3) // cursoTs: 997 → 994
empresaABC.finalizarCompra()
empresaABC.pagarPedido(1)
empresaABC.mostrarPedidos()

console.log("  FIM DOS TESTES")
