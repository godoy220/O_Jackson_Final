const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API RESTful de E-commerce',
      version: '1.0.0',
      description: 'Uma API completa para um sistema de e-commerce com usuários, produtos, categorias e pedidos.',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', // Altere para a URL de produção se necessário
      },
    ],
    // Adiciona a definição de segurança para JWT
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ],
  },
  // Caminho para os arquivos que contêm as anotações da API
  apis: ['./src/routes/*.js'],
};



const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};