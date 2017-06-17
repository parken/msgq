const { engine, timestamps } = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('loginIdentifier', Object.assign({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    }, timestamps(3)), engine);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('loginIdentifier');
  },
};
