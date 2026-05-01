import { Cliente } from "./types/Cliente.js"
import { Pedido } from "./types/Pedido.js"
import { Produto } from "./types/Produto.js"
import { ItemPedido } from "./types/ItemPedido.js"

//Testando a loja
console.log("Bem-vindo à minha loja!")

//Cadastro de produtos
console.log(`\nCadastrando produtos...`)

const produto1 = new Produto(1, "Camiseta", 49.9)
const produto2 = new Produto(2, "Calça Jeans", 99.9)
const produto3 = new Produto(3, "Tênis", 149.9)

//Cadastro de clientes
console.log(`\nCadastrando clientes...`)

const cliente1 = new Cliente(1, "João Silva", "joao.silva@example.com")
const cliente2 = new Cliente(2, "Maria Oliveira", "maria.oliveira@example.com")

//Gerando novos pedidos
console.log(`\nGerando pedidos...`)

const pedido1 = new Pedido(1, new Date())
pedido1.adicionarItem(new ItemPedido(produto1, 2))
pedido1.adicionarItem(new ItemPedido(produto3, 1))

cliente1.adicionarPedido(pedido1)
cliente1.mostrarPedido(pedido1.id)

pedido1.pagar()
pedido1.enviar()
pedido1.entregar()
cliente1.mostrarPedidos()
console.log(`---------\n`)

const pedido2 = new Pedido(2, new Date())
pedido2.adicionarItem(new ItemPedido(produto2, 1))
pedido2.adicionarItem(new ItemPedido(produto3, 2))

cliente1.adicionarPedido(pedido2)
cliente1.mostrarPedido(pedido2.id)

cliente1.mostrarPedidos()
console.log(`---------\n`)

const pedido3 = new Pedido(3, new Date())
pedido3.adicionarItem(new ItemPedido(produto1, 1))

cliente2.adicionarPedido(pedido3)
cliente2.mostrarPedido(pedido3.id)

pedido3.pagar()
pedido3.enviar()
cliente2.mostrarPedidos()

console.log(`Testando serialização JSON...\n`)

const jsonPedido1 = JSON.stringify(pedido1.toJSON())
const jsonPedido2 = JSON.stringify(pedido2.toJSON())
const jsonPedido3 = JSON.stringify(pedido3.toJSON())

console.log(`Pedido 1: ${jsonPedido1}\n`)
console.log(`Pedido 2: ${jsonPedido2}\n`)
console.log(`Pedido 3: ${jsonPedido3}\n`)

console.log(`Testando deserialização JSON...\n`)

const pedido1Deserializado = Pedido.fromData(JSON.parse(jsonPedido1))

const pedido2Deserializado = Pedido.fromData(JSON.parse(jsonPedido2))

const pedido3Deserializado = Pedido.fromData(JSON.parse(jsonPedido3))

console.log(`Pedido 1 Deserializado:\n`)
pedido1Deserializado.imprimirPedido()

console.log(`Pedido 2 Deserializado:\n`)
pedido2Deserializado.imprimirPedido()

console.log(`Pedido 3 Deserializado:\n`)
pedido3Deserializado.imprimirPedido()
