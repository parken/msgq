const { engine, timestamps, keys } = require('../helper.js');

module.exports = {
  up: function(queryInterface, DataTypes) {
    return queryInterface.createTable('users', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      groupId: keys('groups'),
      name: DataTypes.STRING,
      mobile: {
        type: DataTypes.STRING(15),
        unique: true,
      },
      email:  {
        type: DataTypes.STRING(50),
        unique: true,
      },
      otp: DataTypes.STRING,
      otpStatus: DataTypes.INTEGER,
      password: DataTypes.STRING,
      active: { type: DataTypes.BOOLEAN, defaultValue: 1 },
    }, timestamps(3)), engine);
  },
  down: function(queryInterface) {
    return queryInterface.dropTable('users');
  }
};
