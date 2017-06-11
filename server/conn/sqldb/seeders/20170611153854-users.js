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
    }], {});
  },

  down: function (queryInterface, Sequelize) {

  }
};
