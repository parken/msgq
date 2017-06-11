'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('apps', [{
      name: 'X Client',
      clientId: 'xclientid',
      clientSecret: 'xclientsecret',
      redirectUri: 'http://localhost:3000',
      userId: 1,
    }], {});
  },

  down: function (queryInterface, Sequelize) {

  }
};
