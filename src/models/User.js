const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING, // Este é o campo para o hash da senha
    }, {
      sequelize,
      tableName: 'users' // Nome da tabela no banco
    });

    // Antes de salvar, criptografa a senha
    this.addHook('beforeSave', async (user) => {
      if (user.password && user.changed('password')) {
        user.password = await bcrypt.hash(user.password, 8);
      }
    });
  }

  // Compara a senha digitada com a do banco (que ta criptografada)
  checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }


  // Liga o usuario com os seus pedidos
  static associate(models) {
    this.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' });
  }
}

module.exports = User;