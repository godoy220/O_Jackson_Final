const { Router } = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/auth');

const routes = new Router();

routes.use(authMiddleware);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Retorna o perfil do usuário autenticado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso. Retorna os dados do usuário.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: > 
 *           Não autorizado. Token inválido ou não fornecido.
 */
routes.get('/me', UserController.getProfile);

/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Atualiza o perfil do usuário autenticado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 description: "Opcional. Envie apenas se desejar alterar a senha."
 *     responses:
 *       200:
 *         description: Perfil atualizado com sucesso.
 *       400:
 *         description: E-mail já em uso.
 */
routes.put('/me', UserController.update);

/**
 * @swagger
 * /users/me:
 *   delete:
 *     summary: Deleta a conta do usuário autenticado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Conta deletada com sucesso.
 *       401:
 *         description: Não autorizado.
 */
routes.delete('/me', UserController.delete);

module.exports = routes;