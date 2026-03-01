import { DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

export const Payment = sequelize.define('Payment',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
        status: { type: DataTypes.ENUM('pending', 'accepted', 'rejected'), allowNull: false, defaultValue: 'pending' },
        owner_id: { type: DataTypes.INTEGER, allowNull: false },
        created_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
        tableName: 'payments',
        timestamps: false,
    }
);