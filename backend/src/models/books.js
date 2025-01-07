'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        through: models.Transaction,
        foreignKey: 'book_id',
        otherKey: 'user_id',
        as: 'borrowers'
      })
    }
  }
  Books.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publication_year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    availability_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Books;
};