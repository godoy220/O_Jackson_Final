const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      stock_quantity: DataTypes.INTEGER,
    }, {
      sequelize,
      tableName: 'products'
    });
  }

  static associate(models) {
    this.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    this.belongsToMany(models.Order, { through: 'order_products', foreignKey: 'productId', as: 'orders' });
  }
}

module.exports = Product;