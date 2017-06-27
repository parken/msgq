const { keys } = require('../helper.js');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface
      .addColumn('upstreams', 'support', { type: Sequelize.STRING })
      .then(() => queryInterface.addColumn('messages', 'senderId', keys('senderId')))
      .then(() => queryInterface.addColumn('messages', 'campaignId', keys('campaigns')))
      .then(() => queryInterface.addColumn('messages', 'packageTypeId', keys('package_type')));
  },

  down(queryInterface) {
    return queryInterface.removeColumn('upstreams', 'support')
      .then(() => queryInterface.removeColumn('messages', 'senderId'))
      .then(() => queryInterface.removeColumn('messages', 'campaignId'))
      .then(() => queryInterface.removeColumn('messages', 'packageTypeId'));
  },
};
