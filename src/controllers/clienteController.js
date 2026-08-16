const clienteService = require('../services/clienteService');
const { tratarErro } = require('../utils/errorHandler');

function validarId(id) {
  const numero = parseInt(id, 10);
  if (isNaN(numero) || numero <= 0) {
    throw new Error('ID deve ser um número válido');
  }
  return numero;
}

const clienteController = {
  async listar(req, res, next) {
    try {
      const dados = await clienteService.listarTodos();
      res.status(200).json({
        success: true,
        message: 'Clientes listados com sucesso',
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
      const dados = await clienteService.buscarPorId(id);
      res.status(200).json({
        success: true,
        message: 'Cliente encontrado',
        data: dados
      });
    } catch (error) {
      tratarErro(error, next);
    }
  },

  async cadastrar(req, res, next) {
    try {
      const dados = await clienteService.criarCliente(req.body);
      res.status(201).json({
        success: true,
        message: 'Cliente criado com sucesso',
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
      const dados = await clienteService.atualizarCliente(id, req.body);
      res.status(200).json({
        success: true,
        message: 'Cliente atualizado com sucesso',
        data: dados
      });
    } catch (error) {
      tratarErro(error, next);
    }
  },

  async remover(req, res, next) {
    try {
      const id = validarId(req.params.id);
      const dados = await clienteService.deletarCliente(id);
      res.status(200).json({
        success: true,
        message: 'Cliente removido com sucesso',
        data: dados
      });
    } catch (error) {
      tratarErro(error, next);
    }
  }
};

module.exports = clienteController;