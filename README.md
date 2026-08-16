# Restaurant API

API REST para gerenciamento de clientes, pratos e pedidos de restaurante.

## Nome do projeto

**Restaurant API**

## Integrantes

- CARLOS PATRICK DE AGUIAR LIMA COSTA
- GUILHERME RODRIGUES FRANCA DA ROCHA
- GUSTAVO SANTOS FRANCA
- JOAO VICTOR CARVALHO DE OLIVEIRA
- JOSE VITOR OLIVEIRA PATRIOTA SANTOS

## Descrição da API

A API permite:

- cadastrar, listar, atualizar e remover pratos;
- criar e remover pedidos;
- adicionar, atualizar e remover itens de um pedido;
- consultar itens de um pedido;
- alterar status do pedido;
- listar pedidos (incluindo filtro por status e pedidos ainda não entregues);
- calcular o valor total de um pedido;
- gerenciar clientes (entidade já existente no projeto).

Relacionamentos implementados:

- **Pedido** pertence a **Cliente**;
- **ItemPedido** pertence a **Pedido** e a **Prato**.

Status aceitos no pedido:

- `Aberto`
- `Em_preparacao`
- `Pronto`
- `Entregue`
- `Cancelado`

## Tecnologias utilizadas

- Node.js
- Express
- Prisma ORM
- MySQL 8
- Docker / Docker Compose
- Swagger (OpenAPI)

## Instruções para executar o projeto

1. Clone o repositório e acesse a pasta:
   ```bash
   git clone <url-do-repositorio>
   cd dev-api
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o `.env` com base em `.env.example`.
4. Suba o banco com Docker:
   ```bash
   docker compose up -d
   ```
5. Gere o client do Prisma e sincronize o schema:
   ```bash
   npm run prisma:generate
   npm run db:push
   ```
6. Inicie a API:
   ```bash
   npm start
   ```

API: `http://localhost:3000`  
Swagger UI: `http://localhost:3000/api-docs`

### Executar a API com Docker

```bash
# Build da imagem
docker build -t dev-api .

# Executar o container (MySQL pode rodar via docker compose)
docker run -p 3000:3000 -e "DATABASE_URL=mysql://appuser:app123@host.docker.internal:3306/dev_api" dev-api
```

## Configuração do banco de dados

- Banco: **MySQL 8**
- Inicialização: `docker-compose.yml`
- Seed inicial: `db/init.sql`

Exemplo de `.env`:

```env
PORT=3000
DATABASE_URL=mysql://appuser:app123@localhost:3306/dev_api
```

## Principais endpoints disponíveis

| Método | Endpoint | Descrição |
| ------ | -------- | --------- |
| GET | /clientes | Listar clientes |
| GET | /clientes/:id | Consultar cliente por id |
| POST | /clientes | Cadastrar cliente |
| PUT | /clientes/:id | Atualizar cliente |
| DELETE | /clientes/:id | Remover cliente |
| GET | /pratos | Listar pratos |
| GET | /pratos/:id | Consultar prato por id |
| GET | /pratos/categoria/:categoria | Listar pratos por categoria |
| POST | /pratos | Cadastrar prato |
| PUT | /pratos/:id | Atualizar prato |
| DELETE | /pratos/:id | Remover prato |
| GET | /pedidos | Listar pedidos (aceita `?status=`) |
| GET | /pedidos/nao-entregues | Listar pedidos ainda não entregues |
| GET | /pedidos/:id | Consultar pedido por id |
| POST | /pedidos | Criar pedido |
| PATCH | /pedidos/:id/status | Alterar status do pedido |
| DELETE | /pedidos/:id | Remover pedido (itens são removidos em cascata) |
| GET | /pedidos/:id/itens | Consultar itens do pedido |
| POST | /pedidos/:id/itens | Adicionar item ao pedido |
| PUT | /pedidos/:id/itens/:itemId | Atualizar quantidade de um item |
| DELETE | /pedidos/:id/itens/:itemId | Remover um item do pedido |
| GET | /pedidos/:id/total | Calcular total do pedido |

## Validações de dados

- campos obrigatórios (ex.: `nome`, `email`, `senha`, `clienteId`, `pratoId`, `quantidade`);
- senha obrigatória com no mínimo 6 caracteres (armazenada com hash bcrypt, nunca retornada pela API);
- endereço e telefone opcionais;
- preço do prato deve ser número e não pode ser negativo;
- quantidade do item deve ser maior que zero;
- e-mail deve possuir formato válido;
- status do pedido deve estar dentro dos valores permitidos.

## Tratamento de erros (HTTP)

- `200` sucesso;
- `201` criado;
- `400` dados inválidos;
- `404` recurso não encontrado;
- `409` conflito (email duplicado, pedido não aberto, registro vinculado);
- `500` erro interno.
