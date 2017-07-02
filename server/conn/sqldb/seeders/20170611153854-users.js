module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('users', [{
      id: 1,
      name: 'Pankaj Sharma',
      email: 'parken.pankaj@gmail.com',
      mobile: '917891378913',
      password: 'b66d23a547540570278a532f4718f7ae', // admin1234
      roleId: 1,
    }, {
      id: 3,
      name: 'Yogendra Singh',
      email: 'yog27ray@gmail.com',
      mobile: '917066435888',
      password: 'b66d23a547540570278a532f4718f7ae',
      roleId: 3,
    },{
      id: 2,
      name: 'Manjesh V',
      email: 'manjeshpv@gmail.com',
      mobile: '919844717202',
      password: 'b66d23a547540570278a532f4718f7ae',
      roleId: 2,
      loginUrl: 'msgque.com',
    }], {});
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('users', { id: [1, 2, 3] });
  },
};
