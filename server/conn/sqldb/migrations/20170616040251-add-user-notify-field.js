module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface
      .addColumn('users', 'slackUrl', { type: Sequelize.STRING, allowNull: true })
      .then(() => queryInterface
        .addColumn('users', 'slackActive', { type: Sequelize.BOOLEAN, defaultValue: 0 }))
      .then(() => queryInterface
        .addColumn('users', 'smsActive', { type: Sequelize.STRING, defaultValue: 1 }));
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'slackUrl')
      .then(() => queryInterface.removeColumn('users', 'slackActive'))
      .then(() => queryInterface.removeColumn('users', 'smsActive'));
  },
};
