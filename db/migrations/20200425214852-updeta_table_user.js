'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users','balance',
			{
				allowNull: false,
				type: Sequelize.DECIMAL(15,2),
				after: 'user_type'
			})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users','balance')
  }
};
