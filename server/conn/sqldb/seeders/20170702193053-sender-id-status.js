module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('senderIdStatus', [
        { id: 1, name: 'CREATED' },
        { id: 2, name: 'APPROVED' },
        { id: 3, name: 'BLOCKED' }],
      {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('senderIdStatus', { id: [1, 2, 3] });
  },
};
