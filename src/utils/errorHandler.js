const createError = require('http-errors');

function tratarErro(error, next) {
  console.error(error);

  const mensagem = error && error.message ? error.message : 'Erro interno da aplicação';

  if (error && error.code === 'P2025') {
    return next(createError(404, 'Registro não encontrado'));
  }
  if (error && error.code === 'P2002') {
    return next(createError(409, 'Registro duplicado'));
  }
  if (error && error.code === 'P2003') {
    return next(createError(409, 'Não é possível remover: registro está sendo usado'));
  }

  if (mensagem.includes('não encontrado')) {
    return next(createError(404, mensagem));
  }
  if (
    mensagem.includes('já cadastrado') ||
    mensagem.includes('já em uso') ||
    mensagem.includes('deve estar') ||
    mensagem.includes('Não é possível')
  ) {
    return next(createError(409, mensagem));
  }
  if (
    mensagem.includes('obrigatóri') ||
    mensagem.includes('inválido') ||
    mensagem.includes('deve ser') ||
    mensagem.includes('deve ter') ||
    mensagem.includes('maior que zero') ||
    mensagem.includes('válido') ||
    mensagem.includes('negativo')
  ) {
    return next(createError(400, mensagem));
  }

  return next(createError(500, 'Erro interno da aplicação'));
}

module.exports = { tratarErro };