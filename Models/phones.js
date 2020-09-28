'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class phones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  phones.init({
    user_id: DataTypes.INTEGER,
    number: DataTypes.STRING,
    secret: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'phones',
  });
  return phones;
};