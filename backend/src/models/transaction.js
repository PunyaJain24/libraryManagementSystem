'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Books, { foreignKey: 'book_id' });
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Transaction.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE'
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'books', key: 'id' },
      onDelete: 'CASCADE'
    },
    borrow_date: {
      type: DataTypes.DATE
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};