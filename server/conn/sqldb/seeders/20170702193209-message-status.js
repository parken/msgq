module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('messageStatus', [
        { id: 1, name: 'CREATED' },
        { id: 2, name: 'PROCESSED' }],
      {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('senderIdStatus', { id: [1, 2] });
  },
};
