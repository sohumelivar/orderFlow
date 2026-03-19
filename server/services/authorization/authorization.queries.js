import { User } from '../../models/index.js';

export async function authorization (user) {
    return User.findOne({where: {telegram_id: user.id}});
};
