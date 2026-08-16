const prisma = require('../models/prisma');

function validarNome(nome) {
  if (nome === undefined || nome === null || typeof nome !== 'string' || !nome.trim()) {
    throw new Error('Nome é obrigatório');
  }
  if (nome.trim().length < 3) {
    throw new Error('Nome deve ter pelo menos 3 caracteres');
  }
}

function validarCategoria(categoria) {
  if (categoria === undefined || categoria === null || typeof categoria !== 'string' || !categoria.trim()) {
    throw new Error('Categoria é obrigatória');
  }
}

function validarPreco(preco) {
  if (preco === undefined || preco === null) {
    throw new Error('Preço é obrigatório');
  }
  const valor = Number(preco);
  if (!Number.isFinite(valor)) {
    throw new Error('Preço deve ser um número válido');
  }
  if (valor < 0) {
    throw new Error('Preço não pode ser negativo');
  }
}

function validarDescricao(descricao) {
  if (descricao !== undefined && descricao !== null && typeof descricao !== 'string') {
    throw new Error('Descrição deve ser um texto válido');
  }
}

function validarPratoDados(dados, parcial) {
  if (!dados || typeof dados !== 'object') {
    throw new Error('Dados do prato são obrigatórios');
  }
  if (!parcial || dados.nome !== undefined) validarNome(dados.nome);
  if (!parcial || dados.categoria !== undefined) validarCategoria(dados.categoria);
  if (!parcial || dados.preco !== undefined) validarPreco(dados.preco);
  if (dados.descricao !== undefined) validarDescricao(dados.descricao);
}

const pratoService = {
  async listarTodos(filtros) {
    const where = {};
    if (filtros && filtros.categoria) {
      where.categoria = filtros.categoria;
    }
    return prisma.prato.findMany({ where, orderBy: { id: 'asc' } });
  },

  async buscarPorCategoria(categoria) {
    return prisma.prato.findMany({ where: { categoria }, orderBy: { id: 'asc' } });
  },

  async buscarPorId(id) {
    const prato = await prisma.prato.findUnique({ where: { id } });
    if (!prato) throw new Error('Prato não encontrado');
    return prato;
  },

  async criarPrato(dados) {
    validarPratoDados(dados);
    return prisma.prato.create({
      data: {
        nome: dados.nome.trim(),
        descricao: dados.descricao ? dados.descricao.trim() : null,
        categoria: dados.categoria.trim(),
        preco: Number(dados.preco.toFixed(2))
      }
    });
  },

  async atualizarPrato(id, dados) {
    await this.buscarPorId(id);
    validarPratoDados(dados, true);
    const data = {};
    if (dados.nome !== undefined) data.nome = dados.nome.trim();
    if (dados.categoria !== undefined) data.categoria = dados.categoria.trim();
    if (dados.preco !== undefined) data.preco = Number(dados.preco.toFixed(2));
    if (dados.descricao !== undefined) data.descricao = dados.descricao ? dados.descricao.trim() : null;
    return prisma.prato.update({ where: { id }, data });
  },

  async deletarPrato(id) {
    await this.buscarPorId(id);
    try {
      return await prisma.prato.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new Error('Não é possível remover: prato está vinculado a itens de pedidos');
      }
      throw error;
    }
  }
};

module.exports = pratoService;