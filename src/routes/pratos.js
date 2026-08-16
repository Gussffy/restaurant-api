const express = require('express');

const router = express.Router();
const pratoController = require('../controllers/pratoController');

/**
 * @swagger
 * /pratos:
 *   get:
 *     summary: Lista todos os pratos
 *     tags: [Pratos]
 *     parameters:
 *       - in: query
 *         name: categoria
 *         schema: { type: string }
 *         description: Filtra os pratos por categoria
 *     responses:
 *       200:
 *         description: Lista de pratos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Pratos listados com sucesso }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Prato' }
 *                 total: { type: integer, example: 5 }
 */
router.get('/', pratoController.listar);

/**
 * @swagger
 * /pratos/categoria/{categoria}:
 *   get:
 *     summary: Lista pratos de uma categoria
 *     tags: [Pratos]
 *     parameters:
 *       - in: path
 *         name: categoria
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Lista de pratos da categoria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Pratos listados com sucesso }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Prato' }
 *                 total: { type: integer, example: 2 }
 */
router.get('/categoria/:categoria', pratoController.listarPorCategoria);

/**
 * @swagger
 * /pratos/{id}:
 *   get:
 *     summary: Consulta um prato pelo id
 *     tags: [Pratos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Prato encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Prato encontrado }
 *                 data: { $ref: '#/components/schemas/Prato' }
 *       404:
 *         description: Prato não encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 */
router.get('/:id', pratoController.consultar);

/**
 * @swagger
 * /pratos:
 *   post:
 *     summary: Cadastra um novo prato
 *     tags: [Pratos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/PratoInput' }
 *     responses:
 *       201:
 *         description: Prato criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Prato criado com sucesso }
 *                 data: { $ref: '#/components/schemas/Prato' }
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 */
router.post('/', pratoController.cadastrar);

/**
 * @swagger
 * /pratos/{id}:
 *   put:
 *     summary: Atualiza um prato existente
 *     tags: [Pratos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/PratoUpdate' }
 *     responses:
 *       200:
 *         description: Prato atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Prato atualizado com sucesso }
 *                 data: { $ref: '#/components/schemas/Prato' }
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 *       404:
 *         description: Prato não encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 */
router.put('/:id', pratoController.atualizar);

/**
 * @swagger
 * /pratos/{id}:
 *   delete:
 *     summary: Remove um prato
 *     tags: [Pratos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Prato removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Prato removido com sucesso }
 *                 data: { $ref: '#/components/schemas/Prato' }
 *       404:
 *         description: Prato não encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 *       409:
 *         description: Prato vinculado a itens de pedidos
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 */
router.delete('/:id', pratoController.remover);

module.exports = router;
