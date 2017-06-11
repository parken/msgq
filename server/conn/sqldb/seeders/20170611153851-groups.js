'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('groups', [{
      name: 'Admin',
    },{
      name: 'Reseller',
    },{
      name: 'User',
    }], {});

  },

  down: function (queryInterface, Sequelize) {

  }
};
