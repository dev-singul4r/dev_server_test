import mongoose, { Schema } from 'mongoose';

const user_role_schema = new Schema({
    label: { type: String, required: true },
    value: { type: Number, required: true },
    is_active: { type: Boolean, default: true },
    created_at: { type: Number, default: Date.now() },
    updated_at: { type: Number, default: null },
});

const UserRole = mongoose.model('UserRole', user_role_schema);

export default UserRole;
