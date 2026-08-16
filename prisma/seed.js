require('dotenv').config();

const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.itemPedido.deleteMany();
  await prisma.pedido.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.prato.deleteMany();

  const senhaHash = await bcrypt.hash('senha123', 10);

  const [pizzaMargherita, pizzaPepperoni, hamburguer, salada, refrigerante] = await Promise.all([
    prisma.prato.create({
      data: { nome: 'Pizza Margherita', descricao: 'Molho de tomate, mussarela e manjericão', categoria: 'Pizza', preco: 39.9 }
    }),
    prisma.prato.create({
      data: { nome: 'Pizza Pepperoni', descricao: 'Molho de tomate, mussarela e pepperoni', categoria: 'Pizza', preco: 45.9 }
    }),
    prisma.prato.create({
      data: { nome: 'Hambúrguer Artesanal', descricao: 'Pão brioche, blend 180g e cheddar', categoria: 'Lanche', preco: 28.5 }
    }),
    prisma.prato.create({
      data: { nome: 'Salada Caesar', descricao: 'Alface, frango grelhado, parmesão e molho caesar', categoria: 'Salada', preco: 32.0 }
    }),
    prisma.prato.create({
      data: { nome: 'Refrigerante Lata', descricao: 'Refrigerante 350ml', categoria: 'Bebida', preco: 6.5 }
    })
  ]);

  const [joao, maria, carlos] = await Promise.all([
    prisma.cliente.create({
      data: {
        nome: 'João Silva',
        email: 'joao.silva@email.com',
        senha: senhaHash,
        telefone: '(11) 99999-0001',
        endereco: 'Rua das Flores, 100 - São Paulo/SP'
      }
    }),
    prisma.cliente.create({
      data: {
        nome: 'Maria Souza',
        email: 'maria.souza@email.com',
        senha: senhaHash,
        telefone: '(11) 99999-0002',
        endereco: 'Av. Paulista, 200 - São Paulo/SP'
      }
    }),
    prisma.cliente.create({
      data: {
        nome: 'Carlos Pereira',
        email: 'carlos.pereira@email.com',
        senha: senhaHash,
        telefone: '(11) 99999-0003',
        endereco: null
      }
    })
  ]);

  await prisma.pedido.create({
    data: {
      clienteId: joao.id,
      status: 'Entregue',
      itens: {
        create: [
          { pratoId: pizzaMargherita.id, quantidade: 2 },
          { pratoId: refrigerante.id, quantidade: 2 }
        ]
      }
    }
  });

  await prisma.pedido.create({
    data: {
      clienteId: maria.id,
      status: 'Em_preparacao',
      itens: {
        create: [
          { pratoId: hamburguer.id, quantidade: 1 },
          { pratoId: refrigerante.id, quantidade: 1 }
        ]
      }
    }
  });

  await prisma.pedido.create({
    data: {
      clienteId: carlos.id,
      status: 'Aberto',
      itens: {
        create: [{ pratoId: salada.id, quantidade: 1 }]
      }
    }
  });

  console.log('Seed concluído: 5 pratos, 3 clientes, 3 pedidos.');
  console.log(`Senha dos clientes de teste: "senha123" (armazenada com hash bcrypt).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
