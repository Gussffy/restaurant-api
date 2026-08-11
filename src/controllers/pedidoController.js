function naoImplementado(res) {
  res.status(501).json({ message: 'Endpoint ainda não implementado' });
}

const pedidoController = {
  listar(req, res) {
    naoImplementado(res);
  },
  consultar(req, res) {
    naoImplementado(res);
  },
  consultarItens(req, res) {
    naoImplementado(res);
  },
  calcularTotal(req, res) {
    naoImplementado(res);
  },
  criar(req, res) {
    naoImplementado(res);
  },
  adicionarItem(req, res) {
    naoImplementado(res);
  },
  alterarStatus(req, res) {
    naoImplementado(res);
  }
};

module.exports = pedidoController;
