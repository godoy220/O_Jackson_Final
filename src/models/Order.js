const { Model, DataTypes } = require('sequelize');

// Modelo do pedido, cada pedido tem um usuario e varios produtos
class Order extends Model {
  static init(sequelize) {
    super.init({
      // O status pode ser 'pending', 'completed', 'canceled', etc.
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
      },
    }, {
      sequelize,
      tableName: 'orders'
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.belongsToMany(models.Product, { through: 'order_products', foreignKey: 'orderId', as: 'products' });
  }
}

module.exports = Order;