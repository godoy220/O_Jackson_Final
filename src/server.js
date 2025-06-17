// Importa a configuraçao do aplicativo Express do arquivo app.js
const app = require('./app');

// Define a porta em que o servidor irá escutar.
// Ele tentará usar a porta definida na variável de ambiente PORT,
// ou usará a porta 3000 como padrão.
const PORT = process.env.PORT || 3000;

// Inicia o servidor e o faz escutar na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
