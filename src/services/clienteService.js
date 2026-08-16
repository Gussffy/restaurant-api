const bcrypt = require('bcrypt');
const prisma = require('../models/prisma');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatar(cliente) {
  if (!cliente) return cliente;
  const { senha, ...dados } = cliente;
  return dados;
}

function validarNome(nome) {
  if (nome === undefined || nome === null || typeof nome !== 'string' || !nome.trim()) {
    throw new Error('Nome é obrigatório');
  }
  if (nome.trim().length < 3) {
    throw new Error('Nome deve ter pelo menos 3 caracteres');
  }
}

function validarEmail(email) {
  if (email === undefined || email === null || typeof email !== 'string' || !email.trim()) {
    throw new Error('Email é obrigatório');
  }
  if (!EMAIL_REGEX.test(email.trim())) {
    throw new Error('Email deve possuir formato válido');
  }
}

function validarSenha(senha) {
  if (senha === undefined || senha === null || typeof senha !== 'string' || !senha.trim()) {
    throw new Error('Senha é obrigatória');
  }
  if (senha.length < 6) {
    throw new Error('Senha deve ter pelo menos 6 caracteres');
  }
}

function validarTelefone(telefone) {
  if (telefone !== undefined && telefone !== null && (typeof telefone !== 'string' || !telefone.trim())) {
    throw new Error('Telefone deve ser um texto válido');
  }
}

function validarEndereco(endereco) {
  if (endereco !== undefined && endereco !== null && (typeof endereco !== 'string' || !endereco.trim())) {
    throw new Error('Endereço deve ser um texto válido');
  }
}

function validarClienteDados(dados, parcial) {
  if (!dados || typeof dados !== 'object') {
    throw new Error('Dados do cliente são obrigatórios');
  }
  if (!parcial || dados.nome !== undefined) validarNome(dados.nome);
  if (!parcial || dados.email !== undefined) validarEmail(dados.email);
  if (!parcial || dados.senha !== undefined) validarSenha(dados.senha);
  if (dados.telefone !== undefined) validarTelefone(dados.telefone);
  if (dados.endereco !== undefined) validarEndereco(dados.endereco);
}

const clienteService = {
  async listarTodos() {
    const clientes = await prisma.cliente.findMany({ orderBy: { id: 'asc' } });
    return clientes.map(formatar);
  },

  async buscarPorId(id) {
    const cliente = await prisma.cliente.findUnique({ where: { id } });
    if (!cliente) throw new Error('Cliente não encontrado');
    return formatar(cliente);
  },

  async criarCliente(dados) {
    validarClienteDados(dados);
    const email = dados.email.trim().toLowerCase();
    const existente = await prisma.cliente.findUnique({ where: { email } });
    if (existente) throw new Error('Email já cadastrado no sistema');
    const senhaHash = await bcrypt.hash(dados.senha, 10);
    const cliente = await prisma.cliente.create({
      data: {
        nome: dados.nome.trim(),
        email,
        senha: senhaHash,
        telefone: dados.telefone ? dados.telefone.trim() : null,
        endereco: dados.endereco ? dados.endereco.trim() : null
      }
    });
    return formatar(cliente);
  },

  async atualizarCliente(id, dados) {
    await this.buscarPorId(id);
    validarClienteDados(dados, true);
    const data = {};
    if (dados.nome !== undefined) data.nome = dados.nome.trim();
    if (dados.email !== undefined) {
      const email = dados.email.trim().toLowerCase();
      const duplicado = await prisma.cliente.findFirst({ where: { email, NOT: { id } } });
      if (duplicado) throw new Error('Email já cadastrado no sistema');
      data.email = email;
    }
    if (dados.senha !== undefined) data.senha = await bcrypt.hash(dados.senha, 10);
    if (dados.telefone !== undefined) data.telefone = dados.telefone ? dados.telefone.trim() : null;
    if (dados.endereco !== undefined) data.endereco = dados.endereco ? dados.endereco.trim() : null;
    const cliente = await prisma.cliente.update({ where: { id }, data });
    return formatar(cliente);
  },

  async deletarCliente(id) {
    await this.buscarPorId(id);
    const pedidos = await prisma.pedido.count({ where: { clienteId: id } });
    if (pedidos > 0) throw new Error('Não é possível remover: cliente possui pedidos vinculados');
    const cliente = await prisma.cliente.delete({ where: { id } });
    return formatar(cliente);
  }
};

module.exports = clienteService;