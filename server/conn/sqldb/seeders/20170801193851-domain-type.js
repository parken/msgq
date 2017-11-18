module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('domain_types', [
      { id: 1, name: 'Default' }],
    {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('domain_types', { id: [1] });
  },
};
