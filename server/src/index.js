import 'dotenv/config';
import { createApp } from './app.js';
import { sequelize } from '../db/index.js';
import { applyAssociations } from '../models/associations.js';

const app = createApp();
const PORT = process.env.PORT || 3001;

async function start() {
    try {
        await sequelize.authenticate();
        applyAssociations();
        console.log('✅ DB connected');
        
        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ DB connection failed:', error);
        process.exit(1);
    }
};

start();
