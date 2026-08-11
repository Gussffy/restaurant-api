const express = require('express');

const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.get('/', pedidoController.listar);
router.get('/:id', pedidoController.consultar);
router.get('/:id/itens', pedidoController.consultarItens);
router.get('/:id/total', pedidoController.calcularTotal);
router.post('/', pedidoController.criar);
router.post('/:id/itens', pedidoController.adicionarItem);
router.patch('/:id/status', pedidoController.alterarStatus);

module.exports = router;
