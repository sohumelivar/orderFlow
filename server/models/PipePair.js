import { DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js';

export const PipePair = sequelize.define('PipePair',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        suction_size: { type: DataTypes.STRING(10), allowNull: false},
        liquid_size: { type: DataTypes.STRING(10), allowNull: false },
        display_name: { type: DataTypes.STRING(20), allowNull: false },
    },
    {
        tableName: 'pipe_pairs',
        timestamps: false,
    }
);