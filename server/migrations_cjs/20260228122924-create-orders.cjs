'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },

      pipe_pair_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "pipe_pairs", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      owner_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      manufacturer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      length: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      price_per_meter: { type: Sequelize.DECIMAL(10, 2), allowNull: false },

      status: {
        type: Sequelize.ENUM("waiting", "in_progress", "completed"),
        allowNull: false,
        defaultValue: "waiting",
      },

      comment: { type: Sequelize.TEXT, allowNull: true },

      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn("NOW") },
      completed_at: { type: Sequelize.DATE, allowNull: true },
    });

    await queryInterface.addIndex("orders", ["status"]);
    await queryInterface.addIndex("orders", ["owner_id"]);
    await queryInterface.addIndex("orders", ["manufacturer_id"]);
    await queryInterface.addIndex("orders", ["pipe_pair_id"]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_orders_status";');
  }
};
