const express = require('express');
require('dotenv').config();
require('./database'); // Conecta no banco de dados

// Importa a configuração do Swagger
const { swaggerUi, specs } = require('./config/swagger');

// Importa todas as rotas com os caminhos corrigidos
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/UserRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(express.json());

// Rota para a documentação da API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Adiciona os prefixos para cada conjunto de rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);


app.get('/', (req, res) => {
  res.status(200).json({ message: 'API está funcionando! Acesse /api-docs para ver a documentação.' });
});

module.exports = app;