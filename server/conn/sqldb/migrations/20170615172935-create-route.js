const { engine, timestamps } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('routes', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    }, timestamps(3)), engine);
  },

  down(queryInterface) {
    return queryInterface.dropTable('routes');
  },
};
