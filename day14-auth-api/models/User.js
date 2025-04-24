const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 3 },
    password: {type: String, required: true, minLength: 5 }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;