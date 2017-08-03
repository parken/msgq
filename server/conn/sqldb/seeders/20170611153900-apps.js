module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('apps', [{
      id: 1,
      name: 'X Client',
      clientId: 'xclientid',
      clientSecret: 'xclientsecret',
      redirectUri: 'http://localhost:3000',
      userId: 1,
    }], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('apps', { id: [1] });
  },
};
