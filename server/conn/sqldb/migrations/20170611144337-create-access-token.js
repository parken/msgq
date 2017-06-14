const { engine, timestamps, keys } = require('../helper.js');

module.exports = {
  up: function(queryInterface, DataTypes) {
    return queryInterface.createTable('access_tokens', Object.assign({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: keys('users'),
      sessionId: keys('sessions'),
      appId: keys('apps'),
      accessToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expires: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    }, timestamps(3)), engine);
  },
  down: function(queryInterface) {
    return queryInterface.dropTable('access_tokens');
  }
};
