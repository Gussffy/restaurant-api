const clienteService = require('../services/clienteService');

function naoImplementado(res) {
  res.status(501).json({ message: 'Endpoint ainda não implementado' });
}

const clienteController = {
  async listar(req, res, next) {
    try {
      const clientes = await clienteService.listar();
      res.json(clientes);
    } catch (error) {
      next(error);
    }
  },
  consultar(req, res) {
    naoImplementado(res);
  },
  async cadastrar(req, res, next) {
    const { nome, email, telefone, senha, endereco } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: 'nome, email e senha são obrigatórios' });
    }

    try {
      const cliente = await clienteService.cadastrar({ nome, email, telefone, senha, endereco });
      res.status(201).json(cliente);
    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(409).json({ message: 'Já existe um cliente com esse email' });
      }
      next(error);
    }
  },
  atualizar(req, res) {
    naoImplementado(res);
  },
  remover(req, res) {
    naoImplementado(res);
  }
};

module.exports = clienteController;
