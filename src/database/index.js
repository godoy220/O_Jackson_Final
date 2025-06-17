const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

// Importando todos os modelos
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Faz a conexão com o banco
const connection = new Sequelize(dbConfig);

// Inicializa cada modelo
User.init(connection);
Category.init(connection);
Product.init(connection);
Order.init(connection);

// Liga os modelos entre si (relacionamentos)
User.associate(connection.models);
Category.associate(connection.models);
Product.associate(connection.models);
Order.associate(connection.models);

connection.sync({ force: false })
  .then(() => {
    console.log('Tabelas sincronizadas com o banco de dados!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar tabelas:', err);
  });

module.exports = connection;