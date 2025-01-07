'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const {SALT} = require("../config/serverConfig");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {
        through: 'User_Roles',
      });
      this.belongsToMany(models.Books, {
        through: models.Transaction,
        foreignKey: 'user_id',
        otherKey: 'book_id',
        as: 'borrowedBooks'
      });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notContains: ' ',
        is: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6,20]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    const encryptedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = encryptedPassword;
  })
  return User;
};