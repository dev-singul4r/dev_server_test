import mongoose, { Schema } from 'mongoose';

const subscription_plan_schema = new Schema({
    title: { type: String, required: true },
    pricing: { type: String, required: true },
    price: { type: Number, default: null },
    currency: { type: String, default: 'usd' },
    index: { type: Number, required: true },
    is_active: { type: Boolean, default: true },
    created_at: { type: Number, default: Date.now() },
    updated_at: { type: Number, default: null },
});

const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscription_plan_schema);

export default SubscriptionPlan;
