const User = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthController {
  // Método para registrar um novo usuário
  async register(req, res) {
    const { name, email, password } = req.body;

    try {
      // Verifica se o usuário já existe
      if (await User.findOne({ where: { email } })) {
        return res.status(400).json({ error: 'Este e-mail já está em uso.' });
      }

      // Cria o usuario (senha ja vai criptografada)
      const user = await User.create({ name, email, password });

      // Não retorna a senha no response
      user.password = undefined;

      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ error: 'O registro falhou.', details: err.message });
    }
  }

  // Faz login do usuario
  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Procura o usuario pelo email
      const user = await User.findOne({ where: { email } });

      // Se o usuario não for encontrado
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      // Confere a senha
      if (!(await user.checkPassword(password))) {
        return res.status(401).json({ error: 'Senha inválida.' });
      }

      // Gera o token JWT
      const token = jwt.sign({ id: user.id }, process.env.APP_SECRET, {
        expiresIn: '1d', //  token dura 1 dia
      });

      // Nao retornar a senha no response
      user.password = undefined;

      return res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      });

    } catch (err) {
      return res.status(400).json({ error: 'A autenticação falhou.', details: err.message });
    }
  }
}

module.exports = new AuthController();