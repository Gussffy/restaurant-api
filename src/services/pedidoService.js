const prisma = require('../models/prisma');

const STATUS_VALIDOS = ['Aberto', 'Em_preparacao', 'Pronto', 'Entregue', 'Cancelado'];

function validarClienteId(clienteId) {
  const numero = Number(clienteId);
  if (!Number.isInteger(numero) || numero <= 0) {
    throw new Error('clienteId é obrigatório e deve ser um número válido');
  }
}

function validarStatus(status) {
  if (!status || typeof status !== 'string' || !STATUS_VALIDOS.includes(status)) {
    throw new Error(`Status deve ser um dos valores: ${STATUS_VALIDOS.join(', ')}`);
  }
}

function calcularTotalItens(itens) {
  return itens.reduce((total, item) => total + Number(item.prato.preco) * item.quantidade, 0);
}

const pedidoService = {
  async listarTodos(filtros) {
    const where = {};
    if (filtros && filtros.status) {
      validarStatus(filtros.status);
      where.status = filtros.status;
    }
    return prisma.pedido.findMany({
      where,
      orderBy: { id: 'asc' },
      include: { itens: { include: { prato: true } } }
    });
  },

  async listarNaoEntregues() {
    return prisma.pedido.findMany({
      where: { status: { notIn: ['Entregue', 'Cancelado'] } },
      orderBy: { id: 'asc' },
      include: { itens: { include: { prato: true } } }
    });
  },

  async buscarPorId(id) {
    const pedido = await prisma.pedido.findUnique({
      where: { id },
      include: { itens: { include: { prato: true } } }
    });
    if (!pedido) throw new Error('Pedido não encontrado');
    return pedido;
  },

  async criarPedido(dados) {
    if (!dados || typeof dados !== 'object') {
      throw new Error('Dados do pedido são obrigatórios');
    }
    validarClienteId(dados.clienteId);
    const clienteId = Number(dados.clienteId);
    const cliente = await prisma.cliente.findUnique({ where: { id: clienteId } });
    if (!cliente) throw new Error('Cliente não encontrado');

    return prisma.pedido.create({
      data: { clienteId },
      include: { itens: { include: { prato: true } } }
    });
  },

  async alterarStatus(id, status) {
    await this.buscarPorId(id);
    validarStatus(status);
    return prisma.pedido.update({
      where: { id },
      data: { status },
      include: { itens: { include: { prato: true } } }
    });
  },

  async deletarPedido(id) {
    await this.buscarPorId(id);
    return prisma.pedido.delete({ where: { id } });
  },

  async calcularTotal(id) {
    const pedido = await this.buscarPorId(id);
    const total = calcularTotalItens(pedido.itens);
    return { pedidoId: id, total: Number(total.toFixed(2)) };
  }
};

module.exports = pedidoService;
