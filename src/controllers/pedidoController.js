const pedidoService = require('../services/pedidoService');
const { tratarErro } = require('../utils/errorHandler');

function validarId(id) {
  const numero = parseInt(id, 10);
  if (isNaN(numero) || numero <= 0) {
    throw new Error('ID deve ser um número válido');
  }
  return numero;
}

const pedidoController = {
  async listar(req, res, next) {
    try {
      const dados = await pedidoService.listarTodos(req.query);
      res.status(200).json({
        success: true,
        message: 'Pedidos listados com sucesso',
        data: dados,
        total: dados.length
      });
    } catch (error) {
      tratarErro(error, next);
    }
  },

  async listarNaoEntregues(req, res, next) {
    try {
      const dados = await pedidoService.listarNaoEntregues();
      res.status(200).json({
        success: true,
        message: 'Pedidos não entregues listados com sucesso',
        data: dados,
        total: dados.length
      });
    } catch (error) {
      tratarErro(error, next);
    }
  },

  async consultar(req, res, next) {
    try {
      const id = validarId(req.params.id);
      const dados = await pedidoService.buscarPorId(id);
      res.status(200).json({
        success: true,
        message: 'Pedido encontrado',
        data: dados
      });
    } catch (error) {
      tratarErro(error, next);
    }
  },

  async calcularTotal(req, res, next) {
    try {
      const id = validarId(req.params.id);
      const dados = await pedidoService.calcularTotal(id);
      res.status(200).json({
        success: true,
        message: 'Total do pedido calculado com sucesso',
        data: dados
      });
    } catch (error) {
      tratarErro(error, next);
    }
  },

  async criar(req, res, next) {
    try {
      const dados = await pedidoService.criarPedido(req.body);
      res.status(201).json({
        success: true,
        message: 'Pedido criado com sucesso',
        data: dados
      });
    } catch (error) {
      tratarErro(error, next);
    }
  },

  async alterarStatus(req, res, next) {
    try {
      const id = validarId(req.params.id);
      const status = req.body ? req.body.status : undefined;
      const dados = await pedidoService.alterarStatus(id, status);
      res.status(200).json({
        success: true,
        message: 'Status do pedido atualizado com sucesso',
        data: dados
      });
    } catch (error) {
      tratarErro(error, next);
    }
  },

  async remover(req, res, next) {
    try {
      const id = validarId(req.params.id);
      const dados = await pedidoService.deletarPedido(id);
      res.status(200).json({
        success: true,
        message: 'Pedido removido com sucesso',
        data: dados
      });
    } catch (error) {
      tratarErro(error, next);
    }
  }
};

module.exports = pedidoController;
