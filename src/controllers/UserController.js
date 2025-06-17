const User = require('../models/User');

class UserController {
  // Mostra os dado do usuario logado
  async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
      user.password = undefined; // Nunca retorna a senha
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Atualiza os dados do usuário logado
  async update(req, res) {
    const { name, email, password } = req.body;
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
      // se o email for alterado, verifica se já não está em uso
      if (email && email !== user.email) {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
          return res.status(400).json({ error: 'E-mail já está em uso.' });
        }
      }
      await user.update({ name, email, password }); // a nova senha já vai ser criptografada
      user.password = undefined;
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Deleta o usuário logado
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }
      await user.destroy();
      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new UserController();