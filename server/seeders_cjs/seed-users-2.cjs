'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {telegram_id: 3626387, name: 'mikhail', role: 'owner', created_at: new Date()},
      {telegram_id: 6029040982, name: 'grisha', role: 'owner', created_at: new Date()},
      {telegram_id: 390782718, name: 'kamil', role: 'manufacturer', created_at: new Date()},
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      telegram_id: [3626387, 6029040982, 390782718]
    })
  }
};