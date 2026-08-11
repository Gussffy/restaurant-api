# Restaurant API

API REST para gerenciamento simples dos pedidos de um restaurante.

## Integrantes

- CARLOS PATRICK DE AGUIAR LIMA COSTA
- GUILHERME RODRIGUES FRANCA DA ROCHA
- GUSTAVO SANTOS FRANCA
- JOAO VICTOR CARVALHO DE OLIVEIRA
- JOSE VITOR OLIVEIRA PATRIOTA SANTOS

## Descrição

O projeto tem como objetivo gerenciar os pedidos de um restaurante, permitindo o
cadastro de pratos, a criação de pedidos e o controle dos itens de cada pedido.
A aplicação representa corretamente os relacionamentos entre **Pedido**, **Item do Pedido**
e **Prato**, além de calcular o valor total de um pedido.

### Entidades

- **Prato**: `id`, `nome`, `descricao`, `categoria`, `preco`
- **Pedido**: `id`, `cliente`, `data`, `status`
- **Item do Pedido**: `id`, `pedido` (relação), `prato` (relação), `quantidade`

### Status do pedido

`Aberto`, `Em preparação`, `Pronto`, `Entregue`, `Cancelado`

## Tecnologias utilizadas

- Node.js
- Express
- MySQL 8
- Docker / Docker Compose
- mysql2

## Configuração do banco de dados

O banco de dados utilizado é o **MySQL 8** e pode ser iniciado via Docker Compose:

```bash
docker compose up -d
```

O script de criação das tabelas e dados de exemplo fica em `db/init.sql` e é
executado automaticamente na primeira subida do container.

Configurações de ambiente (arquivo `.env`):

```env
PORT=3000
CONNECTION_STRING=mysql://usuario:senha@localhost:3306/dev_api
```

## Instruções para executar

1. Clone o repositório e acesse a pasta do projeto.
2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o `.env` com base no `.env.example`.
4. Inicie o banco de dados:

   ```bash
   docker compose up -d
   ```

5. Inicie a aplicação:

   ```bash
   npm start
   ```

6. A API estará disponível em `http://localhost:3000`.

## Endpoints

### Pratos

| Método | Endpoint            | Descrição                  |
| ------ | ------------------- | -------------------------- |
| GET    | /pratos             | Lista todos os pratos      |
| GET    | /pratos/:id         | Consulta um prato          |
| POST   | /pratos             | Cadastra um prato          |
| PUT    | /pratos/:id         | Atualiza um prato          |
| DELETE | /pratos/:id         | Remove um prato            |
| GET    | /pratos/categoria/:categoria | Consulta pratos por categoria |

### Pedidos

| Método | Endpoint            | Descrição                          |
| ------ | ------------------- | ----------------------------------- |
| GET    | /pedidos            | Lista pedidos realizados            |
| GET    | /pedidos?status=Filtrado | Lista pedidos por status            |
| GET    | /pedidos/:id        | Consulta um pedido                  |
| GET    | /pedidos/:id/itens  | Consulta os itens de um pedido      |
| GET    | /pedidos/:id/total  | Calcula o valor total de um pedido  |
| POST   | /pedidos            | Cria um pedido                      |
| POST   | /pedidos/:id/itens  | Adiciona um item a um pedido        |
| PATCH  | /pedidos/:id/status | Altera o status de um pedido        |

## Validações

- Campos obrigatórios (nome, cliente etc.).
- O preço do prato não pode ser negativo.
- A quantidade do item não pode ser negativa ou zero.
- Status de pedido deve estar dentro dos valores permitidos.

## Tratamento de erros

A API retorna os seguintes códigos HTTP:

- `200` – operação realizada com sucesso;
- `201` – registro criado;
- `400` – dados inválidos ou campos incompletos;
- `404` – recurso não encontrado;
- `500` – erro interno da aplicação.