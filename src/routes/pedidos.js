const express = require('express');

const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const itemPedidoController = require('../controllers/itemPedidoController');

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Pedidos]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { $ref: '#/components/schemas/StatusPedido' }
 *         description: Filtra os pedidos por status
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Pedidos listados com sucesso }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Pedido' }
 *                 total: { type: integer, example: 3 }
 *       400:
 *         description: Status inválido
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 */
router.get('/', pedidoController.listar);

/**
 * @swagger
 * /pedidos/nao-entregues:
 *   get:
 *     summary: Lista pedidos ainda não entregues (nem cancelados)
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos não entregues
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Pedidos não entregues listados com sucesso }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Pedido' }
 *                 total: { type: integer, example: 2 }
 */
router.get('/nao-entregues', pedidoController.listarNaoEntregues);

/**
 * @swagger
 * /pedidos/{id}:
 *   get:
 *     summary: Consulta um pedido pelo id
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Pedido encontrado }
 *                 data: { $ref: '#/components/schemas/Pedido' }
 *       404:
 *         description: Pedido não encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 */
router.get('/:id', pedidoController.consultar);

/**
 * @swagger
 * /pedidos/{id}/itens:
 *   get:
 *     summary: Lista os itens de um pedido
 *     tags: [Itens do Pedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: Id do pedido
 *     responses:
 *       200:
 *         description: Lista de itens do pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Itens do pedido listados com sucesso }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/ItemPedido' }
 *                 total: { type: integer, example: 2 }
 *       404:
 *         description: Pedido não encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 */
router.get('/:id/itens', itemPedidoController.listar);

/**
 * @swagger
 * /pedidos/{id}/itens/{itemId}:
 *   get:
 *     summary: Consulta um item específico de um pedido
 *     tags: [Itens do Pedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: Id do pedido
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema: { type: integer }
 *         description: Id do item
 *     responses:
 *       200:
 *         description: Item encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Item do pedido encontrado }
 *                 data: { $ref: '#/components/schemas/ItemPedido' }
 *       404:
 *         description: Pedido ou item não encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 */
router.get('/:id/itens/:itemId', itemPedidoController.consultar);

/**
 * @swagger
 * /pedidos/{id}/total:
 *   get:
 *     summary: Calcula o valor total de um pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Total calculado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Total do pedido calculado com sucesso }
 *                 data: { $ref: '#/components/schemas/PedidoTotal' }
 *       404:
 *         description: Pedido não encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 */
router.get('/:id/total', pedidoController.calcularTotal);

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/PedidoInput' }
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Pedido criado com sucesso }
 *                 data: { $ref: '#/components/schemas/Pedido' }
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
 */
router.post('/', pedidoController.criar);

/**
 * @swagger
 * /pedidos/{id}/itens:
 *   post:
 *     summary: Adiciona um item a um pedido
 *     tags: [Itens do Pedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: Id do pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ItemPedidoInput' }
 *     responses:
 *       201:
 *         description: Item adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Item adicionado ao pedido com sucesso }
 *                 data: { $ref: '#/components/schemas/ItemPedido' }
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 *       404:
 *         description: Pedido ou prato não encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 *       409:
 *         description: Pedido não está aberto
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 */
router.post('/:id/itens', itemPedidoController.adicionar);

/**
 * @swagger
 * /pedidos/{id}/itens/{itemId}:
 *   put:
 *     summary: Atualiza a quantidade de um item do pedido
 *     tags: [Itens do Pedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: Id do pedido
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema: { type: integer }
 *         description: Id do item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ItemPedidoUpdate' }
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Item do pedido atualizado com sucesso }
 *                 data: { $ref: '#/components/schemas/ItemPedido' }
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 *       404:
 *         description: Pedido ou item não encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 *       409:
 *         description: Pedido não está aberto
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 */
router.put('/:id/itens/:itemId', itemPedidoController.atualizar);

/**
 * @swagger
 * /pedidos/{id}/status:
 *   patch:
 *     summary: Altera o status de um pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/StatusInput' }
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Status do pedido atualizado com sucesso }
 *                 data: { $ref: '#/components/schemas/Pedido' }
 *       400:
 *         description: Status inválido
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 *       404:
 *         description: Pedido não encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 */
router.patch('/:id/status', pedidoController.alterarStatus);

/**
 * @swagger
 * /pedidos/{id}/itens/{itemId}:
 *   delete:
 *     summary: Remove um item de um pedido
 *     tags: [Itens do Pedido]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: Id do pedido
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema: { type: integer }
 *         description: Id do item
 *     responses:
 *       200:
 *         description: Item removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Item removido do pedido com sucesso }
 *                 data: { $ref: '#/components/schemas/ItemPedido' }
 *       404:
 *         description: Pedido ou item não encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 *       409:
 *         description: Pedido não está aberto
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 */
router.delete('/:id/itens/:itemId', itemPedidoController.remover);

/**
 * @swagger
 * /pedidos/{id}:
 *   delete:
 *     summary: Remove um pedido (itens são removidos em cascata)
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Pedido removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Pedido removido com sucesso }
 *                 data: { $ref: '#/components/schemas/Pedido' }
 *       404:
 *         description: Pedido não encontrado
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErroResposta' }
 */
router.delete('/:id', pedidoController.remover);

module.exports = router;
