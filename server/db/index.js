import { Sequelize } from 'sequelize';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined in .env');
};

export const sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    logging: false
});