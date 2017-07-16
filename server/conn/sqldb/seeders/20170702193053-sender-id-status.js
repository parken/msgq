module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('sender_id_status', [
      { id: 1, name: 'CREATED' },
      { id: 2, name: 'APPROVED' },
      { id: 3, name: 'BLOCKED' }],
    {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('sender_id_status', { id: [1, 2, 3] });
  },
};
