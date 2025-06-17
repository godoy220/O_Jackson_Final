const jwt = require('jsonwebtoken');
const { promisify } = require('util');

// Esse middleware serve pra proteger as rotas, só deixa entrar quem tem token válido
module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  // O token vem como "Bearer token", então separamos o token
  const [, token] = authHeader.split(' ');

  try {
    // Decodifica o token usando a chave secreta
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);

    // Adiciona o id do usuário na requisição para ser usado nos controllers
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};