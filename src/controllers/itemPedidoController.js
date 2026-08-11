function naoImplementado(res) {
  res.status(501).json({ message: 'Endpoint ainda não implementado' });
}

const itemPedidoController = {
  listar(req, res) {
    naoImplementado(res);
  },
  consultar(req, res) {
    naoImplementado(res);
  },
  adicionar(req, res) {
    naoImplementado(res);
  },
  atualizar(req, res) {
    naoImplementado(res);
  },
  remover(req, res) {
    naoImplementado(res);
  }
};

module.exports = itemPedidoController;
