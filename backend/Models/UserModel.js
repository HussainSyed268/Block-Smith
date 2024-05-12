const mongoose = require('mongoose');
const CryptoJS = require("crypto-js");

const userSchema = new mongoose.Schema({
    email: { type: String, required: [true, 'Please provide an email'], unique: true },
    password: { type: String, required: [true, 'Please provide a password'] },
    name: { type: String, required: [true, 'Please provide a name'] },
    phone: { type: String, required: [true, 'Please provide a phone number'] },
});

// Middleware to hash the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    // Hash the password using SHA256 algorithm
    this.password = CryptoJS.SHA256(this.password).toString();
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const hashedPassword = CryptoJS.SHA256(password).toString();
        if (user.password === hashedPassword) {
            return user;
        } else {
            throw new Error('Incorrect password');
        }
    } else {
        throw new Error('User not found');
    }
};

module.exports = mongoose.model('User', userSchema);

