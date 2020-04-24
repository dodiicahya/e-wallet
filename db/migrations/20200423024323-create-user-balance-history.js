'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_balance_histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_balance_id: {
        type: Sequelize.INTEGER
      },
      balance_before: {
        type: Sequelize.INTEGER
      },
      balance_after: {
        type: Sequelize.INTEGER
      },
      activity: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.ENUM('credit','debit'),
      },
      ip: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      user_agent: {
        type: Sequelize.STRING
      },
      author: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_balance_histories');
  }
};