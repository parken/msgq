module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('transaction_status', [
      { id: 1, name: 'CREATED' },
      { id: 2, name: 'PROCESSED' }],
    {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('transaction_status', { id: [1, 2] });
  },
};
