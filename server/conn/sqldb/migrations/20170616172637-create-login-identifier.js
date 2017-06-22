const { engine, timestamps } = require('../helper.js');
const { db } = require('../../../config/environment');

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
          model: `${db.pref}_tblUser`,
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
