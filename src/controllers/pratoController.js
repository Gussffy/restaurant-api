function naoImplementado(res) {
  res.status(501).json({ message: 'Endpoint ainda não implementado' });
}

const pratoController = {
  listar(req, res) {
    naoImplementado(res);
  },
  listarPorCategoria(req, res) {
    naoImplementado(res);
  },
  consultar(req, res) {
    naoImplementado(res);
  },
  cadastrar(req, res) {
    naoImplementado(res);
  },
  atualizar(req, res) {
    naoImplementado(res);
  },
  remover(req, res) {
    naoImplementado(res);
  }
};

module.exports = pratoController;
