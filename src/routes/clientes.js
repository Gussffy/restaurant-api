const express = require('express');

const router = express.Router();
const clienteController = require('../controllers/clienteController');

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Clientes listados com sucesso }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Cliente' }
 *                 total: { type: integer, example: 3 }
 */
router.get('/', clienteController.listar);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Consulta um cliente pelo id
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Cliente encontrado }
 *                 data: { $ref: '#/components/schemas/Cliente' }
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 */
router.get('/:id', clienteController.consultar);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cadastra um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ClienteInput' }
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Cliente criado com sucesso }
 *                 data: { $ref: '#/components/schemas/Cliente' }
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 *       409:
 *         description: Email já cadastrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 */
router.post('/', clienteController.cadastrar);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza um cliente existente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ClienteUpdate' }
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Cliente atualizado com sucesso }
 *                 data: { $ref: '#/components/schemas/Cliente' }
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 *       409:
 *         description: Email já cadastrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 */
router.put('/:id', clienteController.atualizar);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Remove um cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Cliente removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Cliente removido com sucesso }
 *                 data: { $ref: '#/components/schemas/Cliente' }
 *       404:
 *         description: Cliente não encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 *       409:
 *         description: Cliente possui pedidos vinculados
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 */
router.delete('/:id', clienteController.remover);

module.exports = router;
