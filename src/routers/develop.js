import { Router } from 'express';
import dotenv from 'dotenv';
import ApiAccount from '../models/api_account';
import UserRole from '../models/user_role';
import SubscriptionPlan from '../models/subscription_plan';

dotenv.config();
const DevelopRouter = Router();

DevelopRouter.get('/db/seed', (req, res) => {
    try {
        const accounts = [
            new ApiAccount({ auth_user: 'dev202503', auth_pass: '$2y$12$nyb0ClM5MrBN.mHZ.YaHQOTl3zW9vHtTKTmQCktC/wgORjeHYWbYG' }),
        ];

        accounts.forEach(async account => {
            await account.save();
        });

        const roles = [
            new UserRole({ label: 'Dad', value: 1 }),
            new UserRole({ label: 'Mom', value: 2 }),
            new UserRole({ label: 'Son', value: 3 }),
            new UserRole({ label: 'Daughter', value: 4 }),
        ];

        roles.forEach(async role => {
            await role.save();
        });

        const plans = [
            new SubscriptionPlan({ title: 'simple', pricing: 'FREE PLAN', price: null, currency: null, index: 1 }),
            new SubscriptionPlan({ title: 'amazing', pricing: '2.99 € / mo.', price: 299, currency: 'eur', index: 2 }),
            new SubscriptionPlan({ title: 'the super', pricing: '4.99 € / mo.', price: 499, currency: 'eur', index: 3 }),
        ];

        plans.forEach(async plan => {
            await plan.save();
        });

        res.sendStatus(201);
    } catch (error) {
        let status = 500;
        let message = 'An unknown error occured!';

        if (error && error.message)
            message = error.message;

        if (error && error.status)
            status = error.status;

        res.status(status).send({ error: true, message: message });
    }
});

export default DevelopRouter;
