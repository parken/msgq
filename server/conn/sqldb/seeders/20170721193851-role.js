module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('roles', [
      { id: 5, name: 'Customer' }],
    {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('roles', { id: [5] });
  },
};
