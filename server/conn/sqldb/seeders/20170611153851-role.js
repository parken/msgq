module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('roles', [
      { id: 1, name: 'Admin' },
      { id: 2, name: 'Reseller' },
      { id: 3, name: 'Leaf Reseller' },
      { id: 4, name: 'User' }],
      {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('roles', { id: [1, 2, 3, 4] });
  },
};
