'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'users',
      'admin',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
    );
  },
  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('users', 'admin');
  },
};

