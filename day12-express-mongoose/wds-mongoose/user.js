const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    createdAt: Date,
    bestFriend: mongoose.Schema.Types.ObjectId,
    hobbies: [String],
    address: {
        street: String,
        city: String
    }
})

module.exports = mongoose.model('User', userSchema);

