const prisma = require('../models/prisma');

async function buscarPedidoOuFalhar(pedidoId) {
  const pedido = await prisma.pedido.findUnique({ where: { id: pedidoId } });
  if (!pedido) throw new Error('Pedido não encontrado');
  return pedido;
}

function validarPedidoAberto(pedido) {
  if (pedido.status !== 'Aberto') {
    throw new Error('Pedido deve estar aberto para alterar itens');
  }
}

function validarPratoId(pratoId) {
  const numero = Number(pratoId);
  if (!Number.isInteger(numero) || numero <= 0) {
    throw new Error('pratoId é obrigatório e deve ser um número válido');
  }
}

function validarQuantidade(quantidade) {
  if (quantidade === undefined || quantidade === null) {
    throw new Error('Quantidade é obrigatória');
  }
  const valor = Number(quantidade);
  if (!Number.isInteger(valor) || valor <= 0) {
    throw new Error('Quantidade deve ser um número inteiro maior que zero');
  }
}

const itemPedidoService = {
  async listarPorPedido(pedidoId) {
    await buscarPedidoOuFalhar(pedidoId);
    return prisma.itemPedido.findMany({
      where: { pedidoId },
      orderBy: { id: 'asc' },
      include: { prato: true }
    });
  },

  async buscarPorId(pedidoId, itemId) {
    const item = await prisma.itemPedido.findFirst({
      where: { id: itemId, pedidoId },
      include: { prato: true }
    });
    if (!item) throw new Error('Item do pedido não encontrado');
    return item;
  },

  async adicionarItem(pedidoId, dados) {
    const pedido = await buscarPedidoOuFalhar(pedidoId);
    validarPedidoAberto(pedido);
    if (!dados || typeof dados !== 'object') {
      throw new Error('Dados do item são obrigatórios');
    }
    validarPratoId(dados.pratoId);
    validarQuantidade(dados.quantidade);
    const pratoId = Number(dados.pratoId);
    const prato = await prisma.prato.findUnique({ where: { id: pratoId } });
    if (!prato) throw new Error('Prato não encontrado');

    return prisma.itemPedido.create({
      data: {
        pedidoId,
        pratoId,
        quantidade: Number(dados.quantidade)
      },
      include: { prato: true }
    });
  },

  async atualizarQuantidade(pedidoId, itemId, dados) {
    const pedido = await buscarPedidoOuFalhar(pedidoId);
    validarPedidoAberto(pedido);
    await this.buscarPorId(pedidoId, itemId);
    if (!dados || dados.quantidade === undefined) {
      throw new Error('Quantidade é obrigatória para atualização');
    }
    validarQuantidade(dados.quantidade);
    return prisma.itemPedido.update({
      where: { id: itemId },
      data: { quantidade: Number(dados.quantidade) },
      include: { prato: true }
    });
  },

  async removerItem(pedidoId, itemId) {
    const pedido = await buscarPedidoOuFalhar(pedidoId);
    validarPedidoAberto(pedido);
    await this.buscarPorId(pedidoId, itemId);
    return prisma.itemPedido.delete({ where: { id: itemId } });
  }
};

module.exports = itemPedidoService;
