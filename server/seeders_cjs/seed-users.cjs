'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {telegram_id: 323229202, name: 'nino', role: 'owner', created_at: new Date()},
      {telegram_id: 797017508, name: 'sohumelivar', role: 'manufacturer', created_at: new Date()},
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      telegram_id: [323229202, 797017508]
    })
  }
};
