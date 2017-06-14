module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
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
    return queryInterface.removeColumn('users', 'admin');
  },
};

