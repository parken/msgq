module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('apps', [{
      id: 1,
      name: 'X Client',
      clientId: 'xclientid',
      clientSecret: 'xclientsecret',
      redirectUri: 'http://msgq.test',
      userId: 1,
    }], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('apps', { id: [1] });
  },
};
