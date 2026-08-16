const itemPedidoService = require('../services/itemPedidoService');
const { tratarErro } = require('../utils/errorHandler');

function validarId(id) {
  const numero = parseInt(id, 10);
  if (isNaN(numero) || numero <= 0) {
    throw new Error('ID deve ser um número válido');
  }
  return numero;
}

const itemPedidoController = {
  async listar(req, res, next) {
    try {
      const pedidoId = validarId(req.params.id);
      const dados = await itemPedidoService.listarPorPedido(pedidoId);
      res.status(200).json({
        success: true,
        message: 'Itens do pedido listados com sucesso',
        data: dados,
        total: dados.length
      });
    } catch (error) {
      tratarErro(error, next);
    }
  },

  async consultar(req, res, next) {
    try {
      const pedidoId = validarId(req.params.id);
      const itemId = validarId(req.params.itemId);
      const dados = await itemPedidoService.buscarPorId(pedidoId, itemId);
      res.status(200).json({
        success: true,
        message: 'Item do pedido encontrado',
        data: dados
      });
    } catch (error) {
      tratarErro(error, next);
    }
  },

  async adicionar(req, res, next) {
    try {
      const pedidoId = validarId(req.params.id);
      const dados = await itemPedidoService.adicionarItem(pedidoId, req.body);
      res.status(201).json({
        success: true,
        message: 'Item adicionado ao pedido com sucesso',
        data: dados
      });
    } catch (error) {
      tratarErro(error, next);
    }
  },

  async atualizar(req, res, next) {
    try {
      const pedidoId = validarId(req.params.id);
      const itemId = validarId(req.params.itemId);
      const dados = await itemPedidoService.atualizarQuantidade(pedidoId, itemId, req.body);
      res.status(200).json({
        success: true,
        message: 'Item do pedido atualizado com sucesso',
        data: dados
      });
    } catch (error) {
      tratarErro(error, next);
    }
  },

  async remover(req, res, next) {
    try {
      const pedidoId = validarId(req.params.id);
      const itemId = validarId(req.params.itemId);
      const dados = await itemPedidoService.removerItem(pedidoId, itemId);
      res.status(200).json({
        success: true,
        message: 'Item removido do pedido com sucesso',
        data: dados
      });
    } catch (error) {
      tratarErro(error, next);
    }
  }
};

module.exports = itemPedidoController;
