'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pipe_pairs', [
      { suction_size: '7/8', liquid_size: '3/8', display_name: '7/8 - 3/8' },
      { suction_size: '3/4', liquid_size: '3/8', display_name: '3/4 - 3/8' },
      { suction_size: '5/8', liquid_size: '3/8', display_name: '5/8 - 3/8' },
      { suction_size: '3/8', liquid_size: '1/4', display_name: '3/8 - 1/4' },
      { suction_size: '1/2', liquid_size: '1/4', display_name: '1/2 - 1/4' },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pipe_pairs', null, {});
  }
};
