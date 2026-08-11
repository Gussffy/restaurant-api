const express = require('express');

const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.listar);
router.get('/:id', clienteController.consultar);
router.post('/', clienteController.cadastrar);
router.put('/:id', clienteController.atualizar);
router.delete('/:id', clienteController.remover);

module.exports = router;
