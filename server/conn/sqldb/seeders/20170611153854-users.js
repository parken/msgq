'use strict';

module.exports = {
  up: function (queryInterface) {
    return queryInterface.bulkInsert('users', [{
      name: 'Pankaj Sharma',
      email: 'parken.pankaj@gmail.com',
      mobile: '917891378913',
      password: 'b66d23a547540570278a532f4718f7ae', // admin1234
      groupId: 1,
    }, {
      name: 'Yogendra Singh',
      email: 'yog27ray@gmail.com',
      mobile: '917066435888',
      password: 'b66d23a547540570278a532f4718f7ae',
      groupId: 2,
    },{
      name: 'Manjesh V',
      email: 'manjeshpv@gmail.com',
      mobile: '919844717202',
      password: 'b66d23a547540570278a532f4718f7ae',
      groupId: 3,
      loginUrl: 'msgque.com',
      companyLogo: 'data:image/png;base64,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',
    }], {});
  },

  down: function (queryInterface, Sequelize) {

  }
};
