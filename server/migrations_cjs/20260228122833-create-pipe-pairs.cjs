'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("pipe_pairs", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      suction_size: { type: Sequelize.STRING(10), allowNull: false },
      liquid_size: { type: Sequelize.STRING(10), allowNull: false },
      display_name: { type: Sequelize.STRING(20), allowNull: false },
    });

    await queryInterface.addConstraint("pipe_pairs", {
      fields: ["suction_size", "liquid_size"],
      type: "unique",
      name: "uniq_pipe_pairs_sizes",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("pipe_pairs");
  }
};