const { keys } = require('../helper.js');

module.exports = {
  up(queryInterface) {
    return queryInterface
      .addColumn('groups', 'userId', keys('users'));
  },
  down(queryInterface) {
    return queryInterface.removeColumn('groups', 'userId');
  },
};
