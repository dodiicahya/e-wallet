'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      username: 'admin',
      email: 'admin@example.com',
      password:'$2a$10$mlSSYO547NgkCRY2PJEAg.tsVxT5PUq4yVVYncjMHNftGIdoK3qnS',
      user_type:'system',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
