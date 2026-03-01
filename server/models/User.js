import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

export const User = sequelize.define('User',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        telegram_id: { type: DataTypes.BIGINT, allowNull: false, unique: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        role: { type: DataTypes.ENUM('owner', 'manufacturer'), allowNull: false },
        created_at: { type: DataTypes.DATE, allowNull: false },
    },
    {
        tableName: 'users',
        timestamps: false,
    }
);