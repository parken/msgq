const { engine, timestamps, keys } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('user_packages', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      allocated: DataTypes.INTEGER,
      salesPrice: DataTypes.STRING,
      comment: DataTypes.STRING,
      userId: keys('users'),
      packageTypeId: keys('user_package_type'),
    }, timestamps(3)), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('user_packages');
  },
};
