import { DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

export const Order = sequelize.define('Order',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        pipe_pair_id: { type: DataTypes.INTEGER, allowNull: false},
        owner_id: { type: DataTypes.INTEGER, allowNull: false },
        display_name: { type: DataTypes.STRING(20), allowNull: false },
        manufacturer_id: { type: DataTypes.INTEGER, allowNull: true },
        length: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        price_per_metr: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        status: { type: DataTypes.ENUM('waiting', 'in_progress', 'completed'), allowNull: false, defaultValue: 'waiting' },
        comment: { type: DataTypes.TEXT, allowNull: true },
        created_at: { type: DataTypes.DATE, allowNull: false },
        updated_at: { type: DataTypes.DATE, allowNull: false },
        completed_at: { type: DataTypes.DATE, allowNull: false }
    },
    {
        tableName: 'orders',
        timestamps: false,
    }
);