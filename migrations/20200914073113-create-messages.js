'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      phone_number: {
        type: Sequelize.STRING
      },
      secret: {
        type: Sequelize.STRING
      },
      from: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      },
      sent_timestamp: {
        type: Sequelize.INTEGER
      },
      sent_to: {
        type: Sequelize.STRING
      },
      message_id: {
        type: Sequelize.STRING
      },
      device_id: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('messages');
  }
};