// Importa o dotenv para carregar as variáveis de ambiente
require('dotenv').config();

// Exporta um objeto com as configurações de conexão do banco de dados
module.exports = {
  dialect: 'mysql',
  host: `localhost`,
  username: `root`,
  password: ``,
  database: `o_jackson_final`,
  port: 3306,
  define: {
    timestamps: true, // Cria colunas createdAt e updatedAt automaticamente
    underscored: true, // Converte camelCase para snake_case (ex: userId -> user_id)
    underscoredAll: true,
  },
};