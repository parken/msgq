module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('transactionStatus', [
        { id: 1, name: 'CREATED' },
        { id: 2, name: 'PROCESSED' }],
      {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('transactionStatus', { id: [1, 2] });
  },
};
