'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('pipe_pairs', {
      fields: ['display_name'],
      type: 'unique',
      name: 'uniq_pipe_pairs_display'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('pipe_pairs', 'uniq_pipe_pairs_sizes');
    await queryInterface.removeConstraint('pipe_pairs', 'uniq_pipe_pairs_display');
  }
};
