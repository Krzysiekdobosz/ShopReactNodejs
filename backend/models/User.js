const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true, minlength: 6, select: false },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        savedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    },
    { timestamps: true }
);

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.toPublic = function () {
    return { id: this.id, name: this.name, email: this.email, role: this.role };
};

module.exports = mongoose.model('User', UserSchema);
