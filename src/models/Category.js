const { Model, DataTypes } = require('sequelize');

class Category extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
    }, {
      sequelize,
      tableName: 'categories'
    });
  }

  static associate(models) {
    this.hasMany(models.Product, { foreignKey: 'categoryId', as: 'products' });
  }
}

module.exports = Category;