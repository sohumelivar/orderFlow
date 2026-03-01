import { PipePair, User, Order, Payment } from './index.js';

export function applyAssociations() {
    PipePair.hasMany(Order, { foreignKey: 'pipe_pair_id' });
    Order.belongsTo(PipePair, { foreignKey: 'pipe_pair_id' });

    User.hasMany(Order, { foreignKey: 'owner_id', as: 'ownerOrders' });
    Order.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

    User.hasMany(Order, { foreignKey: 'manufacturer_id', as: 'manufacturingOrders' });
    Order.belongsTo(User, { foreignKey: 'manufacturer_id', as: 'manufacturer' });

    User.hasMany(Payment, { foreignKey: 'owner_id', as: 'payments' });
    Payment.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });
}