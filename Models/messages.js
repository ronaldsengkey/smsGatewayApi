'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  messages.init({
    phone_id: DataTypes.INTEGER,
    from: DataTypes.STRING,
    message: DataTypes.STRING,
    sent_timestamp: DataTypes.INTEGER,
    sent_to: DataTypes.STRING,
    message_id: DataTypes.STRING,
    type: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,
    read: DataTypes.BOOLEAN
  }, {
    timestamps: false,
    sequelize,
    modelName: 'messages',
  });
  return messages;
};