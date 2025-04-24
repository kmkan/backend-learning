require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log('MongoDB is connected.');
};

module.exports = connectDB;
