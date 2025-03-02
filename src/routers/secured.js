import { Router } from 'express';
import dotenv from 'dotenv';
import { processError } from '../lib/error_handler.js';
import { compare } from '../lib/api_key.js';
import UserRole from '../models/user_role.js';
import SubscriptionPlan from '../models/subscription_plan.js';

dotenv.config();
const SecuredRouter = Router();

SecuredRouter.get('/:api_key/data/user/roles', async (req, res) => {
    try {
        // extracting api key from params
        const api_key = req.params.api_key;

        // stop if no api key
        if (!api_key)
            throw { status: 400, message: 'Missing parameters!' };
        
        // validating api key
        const is_api_key_valid = await compare(api_key);

        // stop if api key is invalid
        if (!is_api_key_valid)
            throw { status: 403, message: 'Unauthorized access!' };

        // getting user roles from db
        const roles = await UserRole.find({ is_active: true });

        // stop if no roles retrieved
        if (!roles)
            throw { status: 404, message: 'Could not retrieve any user roles!' };

        // responding
        res.status(200).send({ roles: roles });
    } catch (error) {
        processError(res, error);
    }
});

SecuredRouter.get('/:api_key/data/subscription/plans', async (req, res) => {
    try {
        const api_key = req.params.api_key;

        if (!api_key)
            throw { status: 400, message: 'Missing parameters!' };

        const is_api_key_valid = await compare(api_key);

        if (!is_api_key_valid)
            throw { status: 403, message: 'Unauthorized access!' };

        const plans = await SubscriptionPlan.find({ is_active: true });

        if (!plans)
            throw { status: 404, message: 'Could not retrieve any subscription plans!' };

        res.status(200).send({ plans: plans });
    } catch (error) {
        processError(res, error);
    }
});

SecuredRouter.get('/:api_key/data/subscription/plan/:index', async (req, res) => {
    try {
        const api_key = req.params.api_key;
        const index = req.params.index;

        if (!api_key || !index)
            throw { status: 400, message: 'Missing parameters!' };

        if (index < 1)
            throw { status: 400, message: 'Bad request data!' };

        const is_api_key_valid = await compare(api_key);

        if (!is_api_key_valid)
            throw { status: 403, message: 'Unauthorized access!' };

        const plan = await SubscriptionPlan.findOne({ is_active: true, index: index }).exec();

        if (!plan)
            throw { status: 404, message: 'Subscription plan not found!' };

        res.status(200).send({ plan: plan });
    } catch (error) {
        processError(res, error);
    }
});

export default SecuredRouter;
