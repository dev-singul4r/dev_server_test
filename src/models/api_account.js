import mongoose, { Schema } from 'mongoose';

const api_account_schema = new Schema({
    auth_user: { type: String, required: true },
    auth_pass: { type: String, required: true },
    has_path_limit: { type: Boolean, default: false },
    paths: { type: String, default: null },
    is_active: { type: Boolean, default: true },
    created_at: { type: Number, default: Date.now() },
    updated_at: { type: Number, default: null },
});

const ApiAccount = mongoose.model('ApiAccount', api_account_schema);

export default ApiAccount;
