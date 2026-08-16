const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Restaurant API',
      version: '1.0.0',
      description: 'API REST para gerenciamento de clientes, pratos e pedidos de restaurante.'
    },
    servers: [
      { url: 'http://localhost:' + (process.env.PORT || 3000), description: 'Servidor local' }
    ],
    tags: [
      { name: 'Clientes', description: 'Gerenciamento de clientes' },
      { name: 'Pratos', description: 'Gerenciamento de pratos do cardápio' },
      { name: 'Pedidos', description: 'Gerenciamento de pedidos' },
      { name: 'Itens do Pedido', description: 'Gerenciamento dos itens de um pedido' }
    ],
    components: {
      schemas: {
        Cliente: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'João Silva' },
            email: { type: 'string', format: 'email', example: 'joao.silva@email.com' },
            telefone: { type: 'string', nullable: true, example: '(11) 99999-0001' },
            endereco: { type: 'string', nullable: true, example: 'Rua das Flores, 100 - São Paulo/SP' }
          }
        },
        ClienteInput: {
          type: 'object',
          required: ['nome', 'email', 'senha'],
          properties: {
            nome: { type: 'string', minLength: 3, example: 'João Silva' },
            email: { type: 'string', format: 'email', example: 'joao.silva@email.com' },
            senha: { type: 'string', format: 'password', minLength: 6, example: 'senha123' },
            telefone: { type: 'string', nullable: true, example: '(11) 99999-0001' },
            endereco: { type: 'string', nullable: true, example: 'Rua das Flores, 100 - São Paulo/SP' }
          }
        },
        ClienteUpdate: {
          type: 'object',
          properties: {
            nome: { type: 'string', minLength: 3 },
            email: { type: 'string', format: 'email' },
            senha: { type: 'string', format: 'password', minLength: 6 },
            telefone: { type: 'string', nullable: true },
            endereco: { type: 'string', nullable: true }
          }
        },
        Prato: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'Pizza Margherita' },
            descricao: { type: 'string', nullable: true, example: 'Molho de tomate, mussarela e manjericão' },
            categoria: { type: 'string', example: 'Pizza' },
            preco: { type: 'number', format: 'double', example: 39.9 }
          }
        },
        PratoInput: {
          type: 'object',
          required: ['nome', 'categoria', 'preco'],
          properties: {
            nome: { type: 'string', minLength: 3, example: 'Pizza Margherita' },
            descricao: { type: 'string', nullable: true, example: 'Molho de tomate, mussarela e manjericão' },
            categoria: { type: 'string', example: 'Pizza' },
            preco: { type: 'number', format: 'double', minimum: 0, example: 39.9 }
          }
        },
        PratoUpdate: {
          type: 'object',
          properties: {
            nome: { type: 'string', minLength: 3 },
            descricao: { type: 'string', nullable: true },
            categoria: { type: 'string' },
            preco: { type: 'number', format: 'double', minimum: 0 }
          }
        },
        StatusPedido: {
          type: 'string',
          enum: ['Aberto', 'Em_preparacao', 'Pronto', 'Entregue', 'Cancelado']
        },
        ItemPedido: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            pedidoId: { type: 'integer', example: 1 },
            pratoId: { type: 'integer', example: 1 },
            quantidade: { type: 'integer', example: 2 },
            prato: { $ref: '#/components/schemas/Prato' }
          }
        },
        ItemPedidoInput: {
          type: 'object',
          required: ['pratoId', 'quantidade'],
          properties: {
            pratoId: { type: 'integer', example: 1 },
            quantidade: { type: 'integer', minimum: 1, example: 2 }
          }
        },
        ItemPedidoUpdate: {
          type: 'object',
          required: ['quantidade'],
          properties: {
            quantidade: { type: 'integer', minimum: 1, example: 3 }
          }
        },
        Pedido: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            clienteId: { type: 'integer', example: 1 },
            data: { type: 'string', format: 'date-time' },
            status: { $ref: '#/components/schemas/StatusPedido' },
            itens: {
              type: 'array',
              items: { $ref: '#/components/schemas/ItemPedido' }
            }
          }
        },
        PedidoInput: {
          type: 'object',
          required: ['clienteId'],
          properties: {
            clienteId: { type: 'integer', example: 1 }
          }
        },
        StatusInput: {
          type: 'object',
          required: ['status'],
          properties: {
            status: { $ref: '#/components/schemas/StatusPedido' }
          }
        },
        PedidoTotal: {
          type: 'object',
          properties: {
            pedidoId: { type: 'integer', example: 1 },
            total: { type: 'number', format: 'double', example: 79.8 }
          }
        },
        ErroResposta: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Registro não encontrado' },
            error: { type: 'object' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
