const prisma = require('../models/prisma');

const clienteService = {
  async listar() {
    return prisma.cliente.findMany();
  },

  async cadastrar({ nome, email, telefone, senha, endereco }) {
    return prisma.cliente.create({
      data: { nome, email, telefone, senha, endereco }
    });
  }
};

module.exports = clienteService;
