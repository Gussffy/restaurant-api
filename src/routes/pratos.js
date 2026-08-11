const express = require('express');

const router = express.Router();
const pratoController = require('../controllers/pratoController');

router.get('/', pratoController.listar);
router.get('/categoria/:categoria', pratoController.listarPorCategoria);
router.get('/:id', pratoController.consultar);
router.post('/', pratoController.cadastrar);
router.put('/:id', pratoController.atualizar);
router.delete('/:id', pratoController.remover);

module.exports = router;
