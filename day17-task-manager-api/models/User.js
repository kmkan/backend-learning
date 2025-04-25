const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.pre('save', async function(next) { 
    if (!this.isModified('password')) {
        return next(); 
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error); 
    }
});

userSchema.methods.matchPassword = function(input) {
    return bcrypt.compare(input, this.password);
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;