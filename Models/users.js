'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    username: DataTypes.STRING,
    password: DataTypes.TEXT,
    email: DataTypes.STRING,
    complete_name: DataTypes.STRING,
    type: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
    token: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};