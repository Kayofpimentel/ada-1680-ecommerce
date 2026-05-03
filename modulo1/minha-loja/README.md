# Projeto Final — Módulo 1: Minha Loja Virtual

Implementação do projeto final do Módulo 1 do curso ADA, trilha de Front-End — CaixaVerso, turma 1680.

---

## Sobre o Repositório

O repositório foi criado para conter todo o conteúdo do curso. Por isso os arquivos de configuração (como `tsconfig.json`, `package.json` e `pnpm-workspace.yaml`) estão na raiz do repositório, não nesta pasta específica. O gerenciador de pacotes utilizado é o **pnpm**, sem configurações fora do padrão — os únicos pacotes listados atualmente no `package.json` são os do Módulo 1. Caso necessário, as configurações serão refatoradas por módulo a partir do Módulo 2.

Como esta pasta contém apenas a implementação do código, não foi utilizada a pasta `src`.

---

## Estrutura do Projeto

```
minha-loja/
├── Documentos/
│   ├── Entregaveis/
│   │   ├── uml-minha-loja.drawio.png # Imagem diagrama UML
│   │   └── minha-loja.puml           # Diagrama UML (as code)
│   └── Projeto final de módulo.pdf   # Arquivo com as definições do projeto
├── models/
│   ├── Cliente/
│   │   ├── Cliente.ts                # Classe abstrata base de clientes
│   │   ├── ClientePessoaFisica.ts    # Cliente individual (implements Pessoa)
│   │   └── ClientePessoaJuridica.ts  # Cliente empresa (implements Empresa)
│   ├── Pedido/
│   │   ├── Carrinho.ts               # Carrinho de compras
│   │   ├── ItemCarrinho.ts           # Item individual do carrinho
│   │   └── Pedido.ts                 # Pedido finalizado com ciclo de status
│   └── Produto/
│       ├── Produto.ts                # Classe abstrata base de produtos
│       ├── ProdutoDigital.ts         # Produto com link de download
│       └── ProdutoFisico.ts          # Produto com peso para entrega física
├── types/
│   ├── Empresa.ts                    # Interface para clientes pessoa jurídica
│   ├── Pessoa.ts                     # Interface para clientes pessoa física
│   └── StatusPedido.ts               # Enum com os estados do ciclo de vida do pedido
├── index.ts                       # Arquivo de testes e demonstração do projeto
└── README.md                      # Este arquivo
```

---

## Como Executar

A partir da **raiz do repositório** (`\CaixaVerso`):

```bash
npx tsx .\modulo1\minha-loja\index.ts
```

O arquivo `index.ts` percorre 7 seções que demonstram e validam toda a lógica implementada:

1. Instanciação de todas as classes
2. Validação dos setters (incluindo notas sobre comportamento do construtor)
3. Lógica do carrinho (adição, merge de itens repetidos, remoção, cálculo de total)
4. Ciclo de vida do pedido (transições válidas e inválidas de status)
5. Controle de estoque (reserva e liberação)
6. Serialização e desserialização (`toJSON` + `fromData`) de todas as classes
7. Fluxo completo: cliente adiciona produtos, finaliza compra, consulta histórico

---

## Os Quatro Pilares da POO

### 1. Encapsulamento

Todos os atributos das classes são privados (`private _atributo`) e acessados exclusivamente por getters e setters. Os setters, em geral, são `private` ou `protected`, impedindo que código externo altere os dados diretamente sem passar pelas validações internas.

Exemplo: o setter `preco` em `Produto` rejeita valores menores ou iguais a zero; o setter `email` em `Cliente` valida formato antes de aceitar a alteração.

### 2. Herança

Foram implementadas duas hierarquias de classes abstratas:

- **`Produto`** (abstrata) → `ProdutoFisico` e `ProdutoDigital`: os tipos concretos estendem `Produto`, herdam todos os atributos e validações comuns (id, nome, preço, descrição, estoque) e acrescentam apenas o que é específico (`_peso` e `_link`, respectivamente).
- **`Cliente`** (abstrata) → `ClientePessoaFisica` e `ClientePessoaJuridica`: os tipos concretos herdam toda a lógica do carrinho e do histórico de pedidos, e cada um implementa `toJSON()` de acordo com seus próprios atributos.

### 3. Polimorfismo

- `ClientePessoaFisica` implementa a interface `Pessoa` e `ClientePessoaJuridica` implementa a interface `Empresa`. Ambas são tratadas polimorficamente como `Cliente`, mas cada uma satisfaz um contrato diferente.
- O método `toJSON()` é declarado como `abstract` em `Produto` e em `Cliente`. Cada subclasse fornece sua própria implementação, produzindo objetos JSON específicos ao seu tipo — mesmo quando o objeto é referenciado pelo tipo base.
- `ItemCarrinho.fromData()` usa duck typing para decidir em tempo de execução qual construtor concreto chamar (`ProdutoDigital` ou `ProdutoFisico`), com base na presença do campo `link` no JSON deserializado.

### 4. Abstração

`Pessoa` e `Empresa` são interfaces que definem **o que** um cliente deve expor, sem impor **como** isso é feito. `Produto` e `Cliente` são classes abstratas que encapsulam o comportamento comum e obrigam as subclasses a implementar os detalhes específicos (como `toJSON()`). Quem usa um `Produto` ou um `Cliente` não precisa saber se está lidando com um produto físico ou digital, ou com uma pessoa física ou jurídica.

---

## Decisões de Design

### Composição entre `Cliente` e `Carrinho`

`Cliente` contém uma instância de `Carrinho` como atributo privado (`private _carrinho: Carrinho`), criada diretamente no corpo da classe. O carrinho não existe fora do contexto de um cliente — essa dependência de ciclo de vida justifica o uso de **composição** em vez de associação simples.

Para não expor o `Carrinho` diretamente, `Cliente` oferece métodos de delegação (`adicionarAoCarrinho`, `removerDoCarrinho`, `calcularTotalCarrinho`), mantendo o encapsulamento: o código externo nunca manipula o carrinho diretamente.

### Composição entre `Carrinho` e `ItemCarrinho`

O `Carrinho` é dono dos seus `ItemCarrinho`s: eles são criados dentro de `adicionarProduto()` e descartados em `gerarPedido()` (que zera a lista). Os itens não têm sentido fora de um carrinho — **composição forte**.

Um detalhe importante: ao adicionar um produto já existente no carrinho, o `Carrinho` encontra o `ItemCarrinho` correspondente e chama `adicionarQuantidade()` nele, em vez de criar um novo item duplicado. Isso garante que o carrinho sempre reflita a quantidade real e o estoque seja reservado corretamente.

### Composição entre `Pedido` e `ItemCarrinho`

Quando `Carrinho.gerarPedido()` é chamado, os próprios `ItemCarrinho`s do carrinho são transferidos para o `Pedido` — não copiados. O pedido passa a ser o dono desses itens, que representam o "snapshot" do que foi comprado. Essa é uma **composição**: os itens existem dentro do pedido e não fazem sentido de forma independente.

### Composição entre `Cliente` e `Pedido`

`Cliente` mantém um array `private _pedidos: Pedido[]`. Cada pedido é gerado pelo carrinho do próprio cliente e adicionado ao histórico em `finalizarCompra()`. Os pedidos pertencem ao cliente e não circulam de forma independente no sistema — **composição**. Como não temos outras entidades, o cliente atualiza o carrinho para as ações que não são de sua responsabilidade, como "enviar" e "receber", as lógicas ficaram centralizadas na classe do cliente pelo intuito de teste e demonstração.

### Associação entre `ItemCarrinho` e `Produto`

`ItemCarrinho` referencia um `Produto` já existente — ele não cria nem destrói o produto. Quando uma quantidade é adicionada ao item, o estoque do produto é decrementado (`produto.alterarEstoque(-quantidade)`); quando removida, é restaurado. Essa interdependência de estado, sem transferência de propriedade, caracteriza uma **associação** (e não composição).

### Setters `protected` vs. `private` em classes abstratas

Os setters de `Produto` são `protected` (e não `private`) para que as subclasses possam, se necessário, reutilizar as validações ao realizar operações internas. Isso evita duplicação de regras de negócio nas subclasses.

Em `Cliente`, os setters de `id` e `email` também são `protected` pelo mesmo motivo — `ClientePessoaFisica` e `ClientePessoaJuridica` herdam essas validações sem precisar reimplementá-las.

### Método `alterarEstoque` em vez de `baixarEstoque`/`aumentarEstoque`

Foi escolhido um único método `alterarEstoque(quantidade: number)` que aceita valores positivos (reposição) e negativos (reserva). Isso reduz a superfície da API, centraliza a validação de estoque negativo em um único lugar e torna o método reutilizável tanto para compras quanto para reposições.

---
