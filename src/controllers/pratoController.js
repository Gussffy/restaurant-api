const pratoService = require('../services/pratoService');
const { tratarErro } = require('../utils/errorHandler');

function validarId(id) {
  const numero = parseInt(id, 10);
  if (isNaN(numero) || numero <= 0) {
    throw new Error('ID deve ser um número válido');
  }
  return numero;
}


const pratoController = {
  async listar(req, res, next) {
    try {
      const dados = await pratoService.listarTodos(req.query);
      res.status(200).json({
        success: true,
        message: 'Pratos listados com sucesso',
        data: dados,
        total: dados.length
      });
    } catch (error) {
      tratarErro(error, next);
    }
  },

  async listarPorCategoria(req, res, next) {
    try {
      const dados = await pratoService.buscarPorCategoria(req.params.categoria);
      res.status(200).json({
        success: true,
        message: 'Pratos listados com sucesso',
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
      const dados = await pratoService.buscarPorId(id);
      res.status(200).json({
        success: true,
        message: 'Prato encontrado',
        data: dados
      });
    } catch (error) {
      tratarErro(error, next);
    }
  },

  async cadastrar(req, res, next) {
    try {
      const dados = await pratoService.criarPrato(req.body);
      res.status(201).json({
        success: true,
        message: 'Prato criado com sucesso',
        data: dados
      });
    } catch (error) {
      tratarErro(error, next);
    }
  },

  async atualizar(req, res, next) {
    try {
      const id = validarId(req.params.id);
      if (!req.body || Object.keys(req.body).length === 0) {
        throw new Error('Nenhum campo foi informado para atualização');
      }
      const dados = await pratoService.atualizarPrato(id, req.body);
      res.status(200).json({
        success: true,
        message: 'Prato atualizado com sucesso',
        data: dados
      });
    } catch (error) {
      tratarErro(error, next);
    }
  },

  async remover(req, res, next) {
    try {
      const id = validarId(req.params.id);
      const dados = await pratoService.deletarPrato(id);
      res.status(200).json({
        success: true,
        message: 'Prato removido com sucesso',
        data: dados
      });
    } catch (error) {
      tratarErro(error, next);
    }
  }
};

module.exports = pratoController;